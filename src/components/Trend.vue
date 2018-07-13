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
        <div class="sale">
          <p><span>卖5</span><span>12.17</span><span>24</span></p>
          <p><span>卖4</span><span>12.16</span><span>62</span></p>
          <p><span>卖3</span><span>12.15</span><span>838</span></p>
          <p><span>卖2</span><span>12.14</span><span>47</span></p>
          <p><span>卖1</span><span>12.13</span><span>66</span></p>
        </div>
        <div class="buy">
          <p><span>买1</span><span>12.12</span><span>23</span></p>
          <p><span>买2</span><span>12.11</span><span>237</span></p>
          <p><span>买3</span><span>12.10</span><span>136</span></p>
          <p><span>买4</span><span>12.09</span><span>80</span></p>
          <p><span>买5</span><span>12.08</span><span>46</span></p>
          <div>
            <span class="lv1">五档</span><span class="details">详情</span><span class="
large">大单</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Minute from "./Minute.vue";
export default {
  name: "Trend",
  components: { Minute },
  data() {
    return {
      isShow: false,
      isActive: true,
      hasError: false
    };
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
        color: #dc0000;
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
}
</style>


