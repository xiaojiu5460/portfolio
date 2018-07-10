<template>
  <div :class="{container:true,blackSkin:blackSkin}">
    <div class="search">
      <div><i class="iconfont icon-fangdajing"></i>点击搜索股票/板块</div>
    </div>
    <div class="more"><span @click="showGroup">···</span>
    <Group :isShow="isShow" v-on:cancel="cancel"></Group>
    </div>
  </div>
</template>

<script>
import Group from "./Group.vue";
import { EventBus } from "../utils/EventBus.js";
export default {
  name: "Header",
  components: { Group, EventBus },
  data() {
    return {
      isShow: false,
      blackSkin: false,
    };
  },
  props: {},
  created: function() {
    let that = this;
    EventBus.$on("changeSkin", function(data) {
      switch (data) {
        case "black":
          that.blackSkin = true;
          break;
        case "white":
          that.blackSkin = false;
          break;
      }
    });
  },
  methods: {
    showGroup: function() {
      this.isShow = true;
    },
    cancel:function(){
      this.isShow=false;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
  .search {
    margin: 0;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 12px;
    div {
      background-color: #427ab8;
      height: 26px;
      border: 0;
      border-radius: 5px;
      width: 100%;
      color: #b8cce3;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-family: "Microsoft Yahei";
      letter-spacing: 1px;
    }
  }
  .more {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    color: #fff;
    width: 30px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  &.blackSkin {
    background-color: #1d2127;
    .search {
      div {
        background-color: #141019;
        color: #6c737f;
      }
    }
    .more {
      color: #fff;
    }
  }
}
</style>
