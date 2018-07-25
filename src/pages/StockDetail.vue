<template>
  <div>
    <DetailTitle v-if="stockInfo" :stock-info="stockInfo" :loading="loading" v-on:load="reloading"></DetailTitle>
    <StockData v-if="stockInfo" :stock-info="stockInfo" :zdf="zdf"></StockData>
    <Trend v-if="stockInfo" :stock-info="stockInfo" :details="details" :large-volume="largeVolume"></Trend>
    <New :news-data="newsData"></New>
  </div>
</template>
<script>
import DetailTitle from "../components/DetailTitle.vue";
import StockData from "../components/StockData.vue";
import Trend from "../components/Trend.vue";
import New from "../components/New.vue";
import { parse, throttle } from "../utils/tools.js";
import { EventBus } from "../utils/EventBus.js";
// console.log(parse);

let intval = null;

export default {
  name: "StockDetail",
  props: [""],
  components: {
    DetailTitle,
    StockData,
    Trend,
    New
  },
  data() {
    return {
      list: [],
      stockInfo: null,
      loading: false,
      newsData: [],
      zdf: [],
      details: [],
      largeVolume:[],
    };
  },
  created() {
    // 1.parse格式化代码复用
    // 2.刷新功能
    // 3.涨跌幅的加减号
    // 4.定时刷新（每天的交易时间9点15分到11点半，1点到3点，没5秒自动刷新）
    // let code = this.$route.query.code.split(" ");
    // console.log(code);
    this.getData();
    this.getNews();
    this.getZdf();
    this.getDetail();
    this.getLargeVolume();
    let getHour = new Date().getHours();
    let getMinute = new Date().getMinutes();
    if (getMinute < 10) {
      return "0" + getMinute;
    }
    let currentTime = parseFloat(getHour + "" + getMinute);
    // let currentTime =parseFloat( ("0" + getHour).substr(-2) + ("0" + getMinute).substr(-2))
    // let nowDate = new Date();
    // let now = nowDate.getTime();
    // let startAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 9, 15, 0, 0).getTime();
    // let endAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 11, 30, 0, 0).getTime();
    // let startPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 13, 0, 0, 0).getTime();
    // let endPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 15, 0, 0, 0).getTime();

    // if(
    //   (startAm<now&& now<endAm)||
    //   (startPm< now && now<endPm)
    // ){
    //   xxx
    // }

    let that = this;
    if (
      (915 < currentTime && currentTime < 1130) ||
      (1300 < currentTime && currentTime < 1500)
    ) {
      intval = setInterval(function () {
        that.getData();
      }, 5000);
    } else {
      return;
    }
  },
  destroyed() {
    //销毁定时器
    clearInterval(intval);
    window.removeEventListener("scroll", this.handleScroll, false)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handleScroll: throttle(function () {
      let scrollTop = document.documentElement.scrollTop;
      // console.log(scrollTop);
      if (scrollTop < 50) {
        EventBus.$emit("showPri", "moveup");
      } else {
        EventBus.$emit("showPri", "movedown");
      }
    }, 300),
    reloading: function () {
      // this.loading = true; 请求前109行已在加载
      this.getData();
    },
    getData: function () {
      let url = `http://web.sqt.gtimg.cn/q=${this.$route.query.code}`;
      this.loading = true;
      this.$http.get(url).then(function (res) {
        this.loading = false;
        // console.log(parse(res.body)[0]);
        let data = parse(res.body);
        // console.log(this.unProcess);
        let list = data.map(function (item) {
          //map 从处理过的对象里取出需要的值，列入一个数组赋值给list
          let l = {
            name: item["名字"],
            code: item["代码"],
            newPrice: item["当前价格"],
            percent: item["涨跌%"] + "%",
            code2: item["市场代码"],
            today: item["今开"],
            yesterday: item["昨收"],
            turnoverRate: item["换手率"] + "%",
            risePrice: item["涨停价"],
            fallPrice: item["跌停价"],
            highest: item["最高"],
            lowest: item["最低"],
            PErate: item["市盈率"],
            amplitude: item["振幅"] + "%",
            volume: item["成交量"],
            turnover: item["成交额"],
            totalValue: item["总市值"],
            circulation: item["流通市值"],
            PBrate: item["市净率"],
            innerDisk: item["内盘"],
            outerDisk: item["外盘"],
            saleFive: item["卖五量"],
            sellFive: item["卖五"],
            saleFour: item["卖四量"],
            sellFour: item["卖四"],
            saleThree: item["卖三量"],
            sellThree: item["卖三"],
            saleTwo: item["卖二量"],
            sellTwo: item["卖二"],
            saleOne: item["卖一量"],
            sellOne: item["卖一"],
            boughtOne: item["买一量"],
            buyOne: item["买一"],
            boughtTwo: item["买二量"],
            buyTwo: item["买二"],
            boughtThree: item["买三量"],
            buyThree: item["买三"],
            boughtFour: item["买四量"],
            buyFour: item["买四"],
            boughtFive: item["买五量"],
            buyFive: item["买五"],
            time: item["时间"]
          };
          //当前价格颜色切换
          let newPri = item["当前价格"];
          let yes = item["昨收"];
          if (newPri > yes) {
            l.colorState = "red"; //给上面l列表添加多个属性，在模板里可以直接读取
            // l.color=l.colorState;
          } else if (newPri < yes) {
            l.colorState = "green";
            // l.color=l.colorState;
          } else {
            l.colorState = "grey";
            // l.color=l.colorState;
          }
          //与昨收价格差颜色切换
          let per = (item["当前价格"] - item["昨收"]).toFixed(2);
          if (per > 0) {
            l.colorState = "red"; //给上面l列表添加多个属性，在模板里可以直接读取
          } else if (per < 0) {
            l.colorState = "green";
          } else {
            l.colorState = "grey";
          }
          //与昨收涨跌差百分比颜色切换
          let p = (per / item["当前价格"] * 100).toFixed(2);
          if (p > 0) {
            l.colorState = "red"; //给上面l列表添加多个属性，在模板里可以直接读取
          } else if (p < 0) {
            l.colorState = "green";
          } else {
            l.colorState = "grey";
          }
          return l;
        });
        // console.log(list);
        if (list && list[0]) {
          this.stockInfo = list[0];
        }
        // console.log(this.stockInfo)
      });
    },
    getNews: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/news/info/search?symbol=${this
        .$route.query.code}&page=1&n=5&type=3`;
      this.$http.get(url).then(function (res) {
        // console.log(res.body.data.data);
        this.newsData = res.body.data.data;
        // console.log(res.body.data.data[0].src)
      });
    },
    getZdf: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/app/stockinfo/plate?code=${this
        .$route.query.code}&zdf=1`;
      this.$http.get(url).then(function (res) {
        this.zdf = res.body.data[0];
        // console.log(this.zdf.name);
      })
    },
    getDetail: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/app/dealinfo/getMingxi?code=${this
        .$route.query.code}&limit=70&direction=1&version=2`;
      var that = this;
      this.$http.get(url).then(function (res) {
        let data = res.body.data;
        // console.log(data);
        data.forEach(function (item) {
          let l = item.split('/');
          return that.details.push(l);
        })
        // console.log(that.details);
      })
    },
    getLargeVolume:function(){
      let url=`http://220.249.243.51/ifzqgtimg/appstock/app/HsDealinfo/getDadan?code=${this
        .$route.query.code}`;
              this.$http.get(url).then(function (res) {
        this.largeVolume = res.body.data.detail;
        // console.log(this.largeVolume);
      })
    },
  }
};
</script>

