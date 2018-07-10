<template>
  <div :class="{group:true,black:blackColor}">
    <ul>
      <li :class="{show:isActive,hide:hasError}">全部</li>
      <li>沪深</li>
      <li>港股</li>
      <li>美股</li>
      <li>场外基金</li>
      <li>自定义</li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from "../utils/EventBus.js";
export default {
  name: "navigation",
  data() {
    return {
      isActive: true,
      hasError: false,
      blackColor: false
    };
  },
  props: {},
  created: function() {
    let that = this;
    EventBus.$on("changeSkin", function(data) {
      switch (data) {
        case "black":
          that.blackColor = true;
          break;
        case "white":
          that.blackColor = false;
          break;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 只应用于局部非全局--> 
<style scoped lang="scss">
.group {
  border-bottom: 1px solid #f1f2f5;
  height: 30px;
  background-color: #fff;
  .show {
    color: #0078ff;
    border-bottom: 2px #0078ff solid;
  }
  .hide {
    border-bottom: 2px #fff solid;
  }
  ul {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 12px;
    margin: 0;
    li {
      display: flex;
      justify-content: center;
      list-style: none;
      line-height: 26px;
      text-align: center;
      flex-shrink: 0;
      margin-right: 16px;
      padding: 0 3px;
      font-size: 15px;
    }
  }
  &.black {
    background-color: #1d2127;
    color: #676d79;
    border-bottom: 2px #1d2127 solid;
    &.show {
      color: #0078ff;
      border-bottom: 2px #0078ff solid;
    }
    &.hide {
      border-bottom: 2px #1d2127 solid;
    }
  }
}
</style>
