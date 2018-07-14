<template>
  <div>
    <div  class="weui" v-show="isShow" @click="hideGroup"></div>
    <div :class="{skins:true,black:blackSkin}" v-show="isShow"><span :class="{up:true,blackUp:blackSkin}"></span>
      <ul>
        <li><i class="iconfont icon-fenzu"></i><span>分组管理</span></li>
        <li v-show="!showSkin" @click="blackColor"><i class="iconfont icon-iconset0454"></i><span>黑色皮肤</span></li>
        <li v-show="showSkin" @click="whiteColor"><i class="iconfont icon-taiyang-copy"></i><span>蓝白皮肤</span></li>
      </ul>
     </div>
  </div>
</template>

<script>
import { EventBus } from "../utils/EventBus.js";
// import GroupManage from "./GroupManage.vue";

export default {
  name: "Group",
  // components: { GroupManage },
  data() {
    return {
      // showManage:true,
      blackSkin: false
    };
  },
  props: ["isShow"],
  computed: {
    showSkin: function() {
      return this.blackSkin;
    }
  },
  methods: {
    blackColor: function() {
      this.blackSkin = true;
      EventBus.$emit("changeSkin", "black");
    },
    whiteColor: function() {
      this.blackSkin = false;
      EventBus.$emit("changeSkin", "white");
    },
    hideGroup: function() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped lang="scss">
.weui {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.up {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 9px solid #fff;
  height: 0;
  width: 0;
  display: block;
  position: absolute;
  right: 11px;
  top: -9px;
  &.blackUp {
    border-bottom: 9px solid #1e232d;
  }
}
.skins {
  position: absolute;
  top: 45px;
  right: 3px;
  ul {
    padding: 0px;
    margin: 0px;
    box-shadow: 2px 3px 5px #888888;
  }
  li {
    list-style: none;
    width: 128px;
    height: 44px;
    line-height: 44px;
    color: #353535;
    border-bottom: 1px solid #f1f2f5;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    span {
      padding-left: 5px;
    }
  }
  &.black {
    ul {
      padding: 0px;
      margin: 0px;
      box-shadow: 2px 3px 5px #101419;
    }
    li {
      color: #fafafa;
      background-color: #1e232d;
      border-bottom: 1px solid #101419;
    }
  }
}
</style>
