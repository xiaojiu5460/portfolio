<template>
  <div >
    <DetailTitle v-if="stockInfo" :stock-info="stockInfo"></DetailTitle>
    <StockData v-if="stockInfo" :stock-info="stockInfo"></StockData>
    <Trend v-if="stockInfo" :stock-info="stockInfo"></Trend>
    <New></New>
  </div>
</template>
<script>
import DetailTitle from "../components/DetailTitle.vue";
import StockData from "../components/StockData.vue";
import Trend from "../components/Trend.vue";
import New from "../components/New.vue";
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
      list:[],
      stockInfo: null,
    };
  },
  created() {
    // let code = this.$route.query.code.split(" ");
    // console.log(code);
    var url = `http://web.sqt.gtimg.cn/q=${this.$route.query.code}`;
    var parse = function(str) {
      return ("" + str)
        .replace(/[;\s]+$/, "")
        .split(";")
        .map(item => {
          let temp = {};
          let values = ("" + item.split('="')[1]).split("~");
          let code = item.split('="')[0].split("_")[1];
          [
            "X1",
            "名字",
            "代码",
            "当前价格",
            "昨收",
            "今开",
            "成交量",
            "外盘",
            "内盘",
            "买一",
            "买一量",
            "买二",
            "买二量",
            "买三",
            "买三量",
            "买四",
            "买四量",
            "买五",
            "买五量",
            "卖一",
            "卖一量",
            "卖二",
            "卖二量",
            "卖三",
            "卖三量",
            "卖四",
            "卖四量",
            "卖五",
            "卖五量",
            "最近逐笔成交",
            "时间",
            "涨跌",
            "涨跌%",
            "最高",
            "最低",
            "价格/成交量/成交额",
            "成交量",
            "成交额",
            "换手率",
            "市盈率",
            "X2",
            "最高",
            "最低",
            "振幅",
            "流通市值",
            "总市值",
            "市净率",
            "涨停价",
            "跌停价"
          ].forEach(name => {
            temp[name] = values.shift() || "";
          });
          temp["最近逐笔成交"] = ("" + temp["最近逐笔成交"]).split("|");
          temp["市场代码"] = code;
          return temp;
        });
    };
    this.$http.get(url).then(function(res) {
      // console.log(parse(res.body)[0]);
      this.data = parse(res.body);
      // console.log(this.unProcess);
      let list = this.data.map(function(item) {
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
          l.color=l.colorState;
        } else if (newPri < yes) {
          l.colorState = "green";
          l.color=l.colorState;
        } else {
          l.colorState = "grey";
          l.color=l.colorState;
        }
        //当前价格变了，买卖五档颜色也跟着变

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
  methods: {
    parseData: function() {}
  }
};
</script>

