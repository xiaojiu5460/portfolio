<template>
  <div :class="{group:true,black:blackColor}">
    <ul>
      <!-- <li :class="{showAll:groupInfo=='全部',hideAll:groupInfo!=='全部'}" @click="showAll">全部</li> -->
      <li :class="{switchBlack:groupInfo==group,switchBlue:groupInfo !==group}" v-for="(group,index) in groups" :key="'group'+index" @click="switchColor(group)">{{group}}</li>
    </ul>
  </div>
</template>

<script>
import { EventBus } from "../utils/EventBus.js";
import { getLsGroup } from "../utils/ls.js";
export default {
  name: "navigation",
  data() {
    return {
      groupInfo: '全部',
      blackColor: false,
      groups: null,
    };
  },
  methods: {
    switchColor(group) {
      this.groupInfo = group;
      EventBus.$emit("newStockList",group)
    }
  },
  props: {},
  created() {
    this.groups = getLsGroup();
    let that = this;
    EventBus.$on("changeSkin", function (data) {
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
  .showAll,
  .switchBlack {
    color: #0078ff;
    border-bottom: 2px #0078ff solid;
  }
  .hideAll,
  .switchBlue {
    border-bottom: 2px #fff solid;
  }
  ul {
    display: flex;
    align-items: center;
    overflow-x: auto;
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
