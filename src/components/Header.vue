<template>
  <div :class="{container:true,blackSkin:false}">
    <div class="search">
      <div><i class="iconfont icon-fangdajing"></i>点击搜索股票/板块</div>
    </div>
    <div class="more"><span @click="showGroup">···</span>
    <Group :isShow="isShow" v-on:black="blackColor"></Group>
    </div>
  </div>
</template>

<script>
import Group from "./Group.vue";
export default {
  name: "Header",
  components: { Group },
  data() {
    return {
      isShow: false
    };
  },
  props: {},
  methods: {
    showGroup: function() {
      this.isShow = true;
    },
    blackColor:function(){
      this.container=false;
      this.blackSkin=true;
    }
  }
};
</script>

<style scoped lang="scss">
.blackSkin{
  background-color: #1d2127;
  height: 45px;
  display: flex;
  .search {
    margin: 0;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 12px;
    div {
      background-color: #141019;
      height: 26px;
      border: 0;
      border-radius: 5px;
      width: 100%;
      color: #6c737f;
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
}
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
}
</style>
