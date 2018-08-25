<template>
  <div class="detailTitle">
    <div class="pre" @click="previous">
      <span>
        <i class="iconfont icon-back"></i>
      </span>
    </div>
    <div class="stockCode">
      <p class="code">{{stockInfo.name}}({{stockInfo.code}}.{{(stockInfo.code2.slice(0,2)).toUpperCase()}})</p>
      <div :class="[active]">
        <p class="time">
          <span v-show="exchange">交易中</span>
          <span v-show="!exchange">已休市</span>{{date}}
          <span></span>{{hms}}</p>
        <p class="price" v-bind:class="[stockInfo.colorState]">
          <span>{{stockInfo.newPrice}}</span>
          <span>{{differ}}</span>
          <span>{{per}}</span>
        </p>
      </div>
    </div>
    <div class="icon" @click="reloading">
      <span v-show="!loading">
        <i class="iconfont icon-shuaxin"></i>
      </span>
      <span v-show="loading"><img src="../assets/img/load.gif"></span>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../utils/EventBus.js";
export default {
  name: "DetailTitle",
  props: ["stock-info", "loading"],
  components: {},
  data() {
    return {
      active: 'moveup',
    }
  },
  created() {
    let that = this;
    EventBus.$on("showPri", function (data) {
      that.active=data;
    })
  },
  computed: {
    date: function () {
      // console.log(this.stockInfo.time);
      return this.stockInfo.time.slice(4, 6) + '-' + this.stockInfo.time.slice(6, 8);
    },
    hms: function () {
      return this.stockInfo.time.slice(8, 10) + ':' + this.stockInfo.time.slice(-4, -2) + ':' + this.stockInfo.time.slice(-2)
    },
    exchange: function () {
      let nowDate = new Date();
      let now = nowDate.getTime();
      let startAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 9, 15, 0, 0).getTime();
      let endAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 11, 30, 0, 0).getTime();
      let startPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 13, 0, 0, 0).getTime();
      let endPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 15, 0, 0, 0).getTime();
      if (
        (startAm < now && now < endAm) ||
        (startPm < now && now < endPm)
      ) {
        return true;
      } else {
        return false;
      }
    },
    differ: function () {
      if (this.stockInfo.colorState === "red") {
        return (
          "+" + (this.stockInfo.newPrice - this.stockInfo.yesterday).toFixed(2)
        );
      } else {
        return (this.stockInfo.newPrice - this.stockInfo.yesterday).toFixed(2);
      }
    },
    per: function () {
      if (this.stockInfo.colorState === "red") {
        return (
          "+" + (this.differ / this.stockInfo.newPrice * 100).toFixed(2) + "%"
        );
      } else {
        return (this.differ / this.stockInfo.newPrice * 100).toFixed(2) + "%";
      }
    }
  },
  methods: {
    reloading: function () {
      this.$emit("load");
    },
    previous: function () {
      this.$router.push({
        path: history.back()
      })
    }
  }
};
</script>

<style scoped lang="scss">
.detailTitle {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  overflow: hidden;
  z-index: 1;
  img {
    width: 18px;
    margin: 12px 12px 0 0;
  }
  .pre {
    margin-left: 10px;
    span {
      width: 25px;
      line-height: 45px;
    }
  }
  .stockCode {
    flex: 1;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      margin: 3px 0;
      line-height: 18px;
      span {
        padding-right: 5px;
      }
    }
    .moveup {
      //
      overflow: hidden;
      p {
        transition: 500ms;
      }
    }
    .movedown {
      //
      overflow: hidden;
      p {
        transition: 500ms;
      }
      p:first-child {
        margin-top: -22px;
      }
    }
    .code {
      font-size: 16px;
    }
    .time {
      font-size: 13px;
      color: #a8ccf5;
      margin: 0;
    }
    .price {
      font-size: 13px;
    }
  }
  .iconfont {
    width: 25px;
    margin-right: 12px;
    line-height: 45px;
    font-size: 18px;
  }
  .pre,
  .code,
  .icon {
    color: #fff;
  }
  .red {
    color: #dc0000;
  }
  .green {
    color: #21bd0b;
  }
  .grey {
    color: #abafba;
  }
  li {
    list-style: none;
  }
}
</style>
