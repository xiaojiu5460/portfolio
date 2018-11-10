<template>
  <div class="trend">
    <div>
      <ul class="timeView">
        <li :class="{show:isActive,hide:!isActive}">分时</li>
        <li>五日</li>
        <li>日K</li>
        <li>周K</li>
        <li>月K</li>
        <li @click="showMinute">分钟
          <span class="down"></span>
        </li>
        <li>
          <i class="iconfont icon-shezhi"></i>
        </li>
      </ul>
    </div>
    <Minute :isShow="isShow" v-on:cancel="cancel"></Minute>
    <div class="information">
      <div id="timeIndexChart">
      </div>
      <div class="level1">
        <div class="showFive" v-show="show=='五档'" @click="turnDetail">
          <div class="sale">
            <p v-for="(sell,index) in sellList" :key="'sell'+index">
              <span>{{sell[0]}}</span>
              <span v-bind:class="[sell[3].color]">{{sell[1]}}</span>
              <span>{{sell[2]}}</span>
            </p>
          </div>
          <div>
            <p v-for="(buy,index) in buyList" :key="'buy'+index">
              <span>{{buy[0]}}</span>
              <span v-bind:class="[buy[3].color]">{{buy[1]}}</span>
              <span>{{buy[2]}}</span>
            </p>
          </div>
        </div>
        <div class="detail" v-show="show=='详情'" @click="turnLargeVolume">
          <p>
            <span>查看分价明细</span>
          </p>
          <ul>
            <li v-for="(detail,index) in details" :key="'detail'+index">
              <span>{{detail[1].slice(0,5)}}</span>
              <span class="price">{{detail[2]}}</span>
              <span class="volume">{{detail[4]}}</span>
              <span :class="{red:(detail[6]==='B'),green:(detail[6]==='S')}">{{detail[6]}}</span>
            </li>
          </ul>
        </div>
        <div v-show="show=='大单'" @click="turnLevelone">
          <div class="largeVolume" v-if="!noEchart">
            <div>
              <div class="charts">
                <div id="main" style="width: 120px;height:100px;"></div>
              </div>
              <div class="chartDetail">
                <div class="buy">
                  <div class="first" style="background-color:#eb4e27"></div>
                  <span class="middle">买盘:</span>
                  <span>{{largeVolume.summary.data.cje100.split(',')[4]}}手</span>
                </div>
                <div class="sell">
                  <div class="first" style="background-color:#54b835"> </div>
                  <span class="middle">卖盘:</span>
                  <span>{{largeVolume.summary.data.cje100.split(',')[5]}}手</span>
                </div>
                <div class="mid">
                  <div class="first" style="background-color:#bfbfc0"> </div>
                  <span class="middle">中性盘:</span>
                  <span>{{largeVolume.summary.data.cje100.split(',')[6]}}手</span>
                </div>
                <div class="remarks">
                  <span>注:单笔成交额>100万</span>
                </div>
              </div>
            </div>
            <div class="large">
              <ul>
                <li v-for="(largeV,index) in largeVolume.detail" :key="'largeV'+index">
                  <span>{{getLargeV(largeV)}}</span>
                  <span class="price">{{largeV[1]}}</span>
                  <span class="volume">{{largeV[2]}}</span>
                  <span :class="{red:(largeV[3]==='B'),green:(largeV[3]==='S')}">{{largeV[3]}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="noVolume" v-if="noEchart">暂无大单概要数据</div>
        </div>

        <div class="group">
          <span :class="{lv1:show=='五档',noHL:show==!'五档'}" @click="showLv1">五档</span>
          <span :class="{details:true,detailHL:show=='详情'}" @click="showDetail">详情</span>
          <span :class="{large:true,largeHL:show=='大单'}" @click="showLarge">大单</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Minute from "./Minute.vue";
import echarts from 'echarts'
export default {
  props: ["stock-info", "details", "large-volume", "detail-code"],
  name: "Trend",
  components: { Minute },
  data() {
    return {
      isShow: false,
      isActive: true,
      sellList: [],
      buyList: [],
      show: '五档',
      timeSharpingData: null,
    };
  },
  computed: {
    noEchart: function () {
      let buyVolume = this.largeVolume.summary.data.cje100.split(',')[4];
      let sellVolume = this.largeVolume.summary.data.cje100.split(',')[5];
      let middle = this.largeVolume.summary.data.cje100.split(',')[6];
      if (buyVolume == 0 && sellVolume == 0 && middle == 0) {
        return true;
      }
    },
  },
  // stockInfo{"PBrate :"0.85";PErate:"15.32";amplitude:"4.31%";boughtFive:"600";boughtFour:"38";boughtOne:"241"",}
  created() {
    // console.log(this.stockInfo.yesterday);
    //卖档
    let l = [];
    l.push(
      ["卖五", this.stockInfo.sellFive, this.stockInfo.saleFive, { color: "" }],
      ["卖四", this.stockInfo.sellFour, this.stockInfo.saleFour, { color: "" }],
      ["卖三", this.stockInfo.sellThree, this.stockInfo.saleThree, { color: "" }],
      ["卖二", this.stockInfo.sellTwo, this.stockInfo.saleTwo, { color: "" }],
      ["卖一", this.stockInfo.sellOne, this.stockInfo.saleOne, { color: "" }]
    );
    this.sellList = l;
    // console.log(l[0][3].color);
    // console.log(l);
    for (let index = 0; index < this.sellList.length; index++) {
      let s = parseFloat(this.sellList[index][1]);
      let p = this.sellList[index][3];
      if (s > parseFloat(this.stockInfo.yesterday)) {
        p.color = "red";
      } else if ((s < parseFloat(this.stockInfo.yesterday)) && s > 0) {
        p.color = "green";
      } else {
        p.color = "grey";
      }
    }
    //买档
    let o = [];
    o.push(
      ["买一", this.stockInfo.buyOne, this.stockInfo.boughtOne, { color: "" }],
      ["买二", this.stockInfo.buyTwo, this.stockInfo.boughtTwo, { color: "" }],
      ["买三", this.stockInfo.buyThree, this.stockInfo.boughtThree, { color: "" }],
      ["买四", this.stockInfo.buyFour, this.stockInfo.boughtFour, { color: "" }],
      ["买五", this.stockInfo.buyFive, this.stockInfo.boughtFive, { color: "" }]
    );
    this.buyList = o;
    for (let index = 0; index < this.buyList.length; index++) {
      let s = parseFloat(this.buyList[index][1]);
      let p = this.buyList[index][3];
      if (s > parseFloat(this.stockInfo.yesterday)) {
        p.color = "red";
      } else if ((s < parseFloat(this.stockInfo.yesterday)) && s > 0) {
        p.color = "green";
      } else {
        p.color = "grey";
      }
    }
  },
  mounted() {
    // 请求分时图data
    this.getTimeSharpData();
  },
  methods: {
    getTimeSharpData() {
      // 请求分时图data
      let url = `http://web.ifzq.gtimg.cn/appstock/app/minute/query?code=${this.detailCode}`;
      let that = this;
      this.$http.get(url).then(function (res) {
        let code = that.detailCode;
        this.timeSharpingData = JSON.parse(res.bodyText).data[code].data.data;
        this.echart();
      })
    },
    echart() {
      let timeSharpChart = echarts.init(document.getElementById('timeIndexChart'));
      let timeData = [];
      let priceData = [];
      // let yesterday = this.stockInfo.yesterday;
      // let a=Math.abs(Math.max(...priceData)-yesterday).toFixed(2);
      // let min = (yesterday- parseFloat(a)).toFixed(2);
      // let max = (yesterday + parseFloat(a)).toFixed(2)
      for (let i = 0; i < this.timeSharpingData.length; i++) {
        const element = this.timeSharpingData[i];
        // let t = element.split(' ')[0].slice(0, 2);
        // timeData.push(element.split(' ')[0].replace(t, t + ':'));
        // priceData.push(parseFloat(element.split(' ')[1]));
        let [time, price] = element.split(' ');
        // console.log(time,price,volume)
        timeData.push(time.substr(0, 2) + ':' + time.substr(-2));
        priceData.push(price);
      }
      let option = {
        grid: {
          left: '0',
          right: '0',
          top: '5px',
          bottom: '25px'
        },
        xAxis: {
          type: 'category',
          axisTick: { show: false },
          data: timeData,
          axisLine: {
            lineStyle: {
              width: 1,
              color: '#ddd'
            }
          },
          axisLabel: {
            show: true,
            interval: 0,
            align: 'center',
            color: '#333',
            formatter: function (value, index) {
              if (index === 15) return '09:30';
              if (index === 120) return '11:30/13:00';
              if (index === 225) return '15:00';
              return '';
            }
          },

        },
        yAxis: {
          type: 'value',
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { inside: true },
          splitLine: {
            show: false
          },
          // max: Math.max(...priceData) + 0.5,
          min: Math.min(...priceData),
          minInterval: Math.max(...priceData),
        },
        series: [{
          data: priceData,
          type: 'line',
          smooth: false,
          symbolSize: 1,
          itemStyle: {
            normal: {
              color: '#034b9c'
            }
          },
          lineStyle: {
            color: '#0464d2',
            width: 1,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#a2c8f3' // 0% 处的颜色
              }, {
                offset: 1, color: '#0c78f3' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }]
      };
      timeSharpChart.setOption(option);
    },
    turnDetail: function () {
      this.show = '详情';
    },
    turnLargeVolume: function () {
      this.show = "大单";
    },
    turnLevelone: function () {
      this.show = '五档';
    },
    getLargeV: function (l) {
      let H = l[0].split(':')[0];
      let M = l[0].split(':')[1];
      return ("0" + H).substr(-2) + ':' + ("0" + M).substr(-2);
    },
    showLv1: function () {
      this.$emit("level-one")
      this.show = '五档';
    },
    showDetail: function () {
      this.$emit("reload-detail");
      this.show = '详情';
    },
    showLarge: function () {
      this.$emit("reload-large");
      this.show = '大单';
      let [buyVolume, sellVolume, middle] = this.largeVolume.summary.data.cje100.split(',').slice(4, 7);
      // let buyVolume = this.largeVolume.summary.data.cje100.split(',')[4];
      // let sellVolume = this.largeVolume.summary.data.cje100.split(',')[5];
      // let middle = this.largeVolume.summary.data.cje100.split(',')[6];
      // console.log(this.largeVolume);
      if (buyVolume == 0 && sellVolume == 0 && middle == 0) {
        return
      }
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        // xAxis: {},
        // yAxis: {offset :50},
        color: ['#eb4e27', '#54b835', '#bfbfc0'],
        series: [{
          name: '大单分布',
          type: 'pie',
          data: [buyVolume, sellVolume, middle],
          label: {
            position: 'inside',
            formatter: function (params) {
              if (params.percent !== 0) {
                return Math.round(params.percent) + '%';
              }
            }
          },
          startAngle: 5,
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // sellState:function(){
    //   console.log(this.stockInfo.newPrice);
    // },
    showMinute: function () {
      this.isShow = true;
    },
    cancel: function () {
      this.isShow = false;
    }
  }
};
</script>
<style scoped lang="scss">
.information {
  display: flex;
  #timeIndexChart {
    border: solid 1px #d7e0ea;
    flex: 1;
  }
  .level1 {
    width: 130px;
    margin-left: 5px;
    height: 260px;
    .showFive {
      height: 239px;
      .sale {
        border-bottom: solid 1px #d7e0ea;
      }
      p {
        display: flex;
        align-items: center;
        margin: 0 5px 0 0;
        height: 24px;
        font-size: 12px;
        font-weight: bold;
        span {
          flex: 1;
          display: flex;
          justify-content: center;
          // color: #dc0000;
        }
        span:last-child {
          justify-content: flex-end;
          color: #000;
        }
        span:first-child {
          color: #000;
          justify-content: flex-start;
        }
      }
    }
    .detail {
      height: 239px;
      position: relative;
      overflow: hidden;
      p {
        display: flex;
        justify-content: center;
        margin: 0 5px 0 0;
        position: absolute;
        top: 0;
        background-color: #fff;
        width: 130px;
        span {
          background-color: #dce5f0;
          line-height: 18px;
          font-size: 10px;
          padding: 0 8px;
          border-radius: 3px;
          color: #a0b7d5;
        }
      }
    }
    ul {
      font-weight: bold;
      padding: 20px 0 0 0;
      margin: 0;
      font-size: 10px;
      height: 100%;
      overflow-y: scroll;
      li {
        display: flex;
        line-height: 24px;
        span:first-child {
          width: 30px;
        }
        .price {
          width: 38px;
          display: flex;
          justify-content: flex-end;
        }
        .volume {
          display: flex;
          justify-content: flex-end;
          width: 30px;
        }
        span {
          margin-right: 3px;
        }
      }
    }
    .largeVolume {
      display: flex;
      flex-direction: column;
      height: 239px;
      width: 130px;
      overflow-y: scroll;
      .charts {
        flex: 1;
      }
      .chartDetail {
        font-size: 10px;
        .buy,
        .sell,
        .mid {
          display: flex;
          margin-right: 5px;
          .first {
            width: 10px;
            height: 10px;
            display: inline-block;
            margin: 3px;
          }
          .middle {
            width: 39px;
            display: flex;
            align-items: center;
          }
          span:last-child {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
        .remarks {
          line-height: 30px;
        }
      }
      .large {
        height: 50px;
        justify-content: flex-end;
        border-top: solid #a0a1a0 1px;
        ul {
          padding: 0;
        }
      }
    }
    .noVolume {
      height: 239px;
      line-height: 260px;
      text-align: center;
      font-size: 13px;
    }
    .group {
      height: 20px;
      display: flex;
      font-size: 13px;
      color: #888888;
      span {
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
      }
      .lv1,
      .detailHL,
      .largeHL {
        color: #000;
        background-color: #eee;
      }
    }
  }
}
.trend div {
  // border-bottom: 1px solid #f1f2f5;
  .timeView {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 15px;
    margin: 0;
    color: #888888;
    li {
      display: flex;
      flex: 1;
      justify-content: center;
      line-height: 26px;
      text-align: center;
      flex-shrink: 0;
      font-size: 12px;
      letter-spacing: 1px;
      .down {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 5px solid #888888;
        height: 0;
        width: 0;
        display: block;
        margin-top: 10px;
        margin-left: 5px;
      }
      .iconfont {
        font-size: 14px;
      }
    }
    .show {
      color: #007aff;
      border-bottom: 2px #007aff solid;
    }
    .hide {
      border-bottom: 2px #fff solid;
    }
  }
  .red {
    color: #dc0000;
  }
  .green {
    color: #508d46;
  }
  .grey {
    color: #abafba;
  }
}
li {
  list-style: none;
}
</style>


