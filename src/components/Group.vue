<template>
  <div>
    <div :class="{skins:true,black:notActive}" v-show="isShow"><span :class="{up:true,blackUp:notActive}"></span>
      <ul>
        <li><i class="iconfont icon-fenzu"></i><span>分组管理</span></li>
        <li @click="blackColor"><i class="iconfont icon-iconset0454"></i><span>黑色皮肤</span></li>
      </ul>
     </div>
  </div>
</template>

<script>
export default {
  name: "Group",
  data() {
    return {
      notActive: false
    };
  },
  props: ["isShow"],
  methods: {
    blackColor: function() {
      this.notActive = true;
      this.$emit("black");
    }
  }
};
</script>

<style scoped lang="scss">
.blackUp {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 9px solid #1e232d;
  height: 0;
  width: 0;
  display: block;
  position: absolute;
  right: 11px;
  top: -9px;
}
.black {
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
    color: #fafafa;
    background-color: #1e232d;
    border-bottom: 1px solid #101419;
    text-align: center;
    font-size: 14px;
    font-weight: normal;
    span {
      padding-left: 5px;
    }
  }
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
}
</style>
