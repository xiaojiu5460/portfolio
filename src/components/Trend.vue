<template>
  <div class="trend">
    <div>
      <ul>
        <li :class="{show:isActive,hide:hasError}">分时</li>
        <li>五日</li>
        <li>日K</li>
        <li>周K</li>
        <li>月K</li>
        <li @click="showMinute">分钟<span class="down"></span></li>
        <li><i class="iconfont icon-shezhi"></i></li>
      </ul>
    </div>
    <Minute :isShow="isShow" v-on:cancel="cancel"></Minute>
    <div class="information">
      <div class="chart">
      </div>
      <div class="level1">
          <div class="sale" v-for="(stock,index) in list" :key="index">
           <p ><span>{{stock[0]}}</span><span v-bind:class="[stockInfo.color]">{{stock[1]}}</span><span>{{stock[2]}}</span></p>
          </div>
        <div>
          <span class="lv1">五档</span><span class="details">详情</span><span class="large">大单</span>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Minute from "./Minute.vue";
export default {
  props: ["stock-info"],
  name: "Trend",
  components: { Minute },
  data() {
    return {
      isShow: false,
      isActive: true,
      hasError: false,
      list: []
    };
  },
  // stockInfo{"PBrate :"0.85";PErate:"15.32";amplitude:"4.31%";boughtFive:"600";boughtFour:"38";boughtOne:"241"",}
  computed: {
    // formated: function() {
    // console.log(this.unProcess);
    // // let unProcess=this.unProcess;
    // let l=["卖五", "卖四", "卖三", "卖二", "卖一","买一","买二","买三","买四","买五"].map(function(key) {
    //   return [key, unProcess[0][key], unProcess[0][key + "量"]];
    // });
    // return this.sellList=l.split(0,5);
    // console.log(this.sellList);
    // }
  },
  created() {
    let l = [];
    l.push(
      ["卖五", this.stockInfo.sellFive, this.stockInfo.saleFive],
      ["卖四", this.stockInfo.sellFour, this.stockInfo.saleFour],
      ["卖三", this.stockInfo.sellThree, this.stockInfo.saleThree],
      ["卖二", this.stockInfo.sellTwo, this.stockInfo.saleTwo],
      ["卖一", this.stockInfo.sellOne, this.stockInfo.saleOne],
      ["买一", this.stockInfo.buyOne, this.stockInfo.boughtOne],
      ["买二", this.stockInfo.buyTwo, this.stockInfo.boughtTwo],
      ["买三", this.stockInfo.buyThree, this.stockInfo.boughtThree],
      ["买四", this.stockInfo.buyFour, this.stockInfo.boughtFour],
      ["买五", this.stockInfo.buyFive, this.stockInfo.boughtFive]
    );
    // console.log(l);
    this.list = l;
  },
  methods: {
    showMinute: function() {
      this.isShow = true;
    },
    cancel: function() {
      this.isShow = false;
    }
  }
};
</script>
<style scoped lang="scss">
.information {
  display: flex;
  .chart {
    border: solid 1px #d7e0ea;
    flex: 1;
  }
  .level1 {
    width: 110px;
    margin-left: 5px;
    .sale {
      border-bottom: solid 1px #d7e0ea;
    }
    .buy {
      div {
        height: 20px;
        display: flex;
        font-size: 14px;
        color: #888888;
        span {
          display: flex;
          flex: 1;
          justify-content: center;
          align-items: center;
        }
        .lv1 {
          color: #000;
          background-color: #eee;
        }
      }
    }
    p {
      display: flex;
      align-items: center;
      margin: 0 5px 0 0;
      height: 28px;
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
}
.trend div {
  border-bottom: 1px solid #f1f2f5;
  ul {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 15px;
    margin: 0;
    color: #888888;
    li {
      display: flex;
      flex: 1;
      justify-content: center;
      list-style: none;
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
</style>


