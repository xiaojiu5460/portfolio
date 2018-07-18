<template>
  <div class="minute">
    <div class="weui" v-show="isShow" @click="hideGroup"></div>
    <div class="skins" v-show="isShow"><span class="up"></span>
      <ul>
        <li>1分</li>
        <li>5分</li>
        <li>15分</li>
        <li>30分</li>
        <li>60分</li>
     </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isShow"],
  methods: {
    hideGroup: function() {
      this.$emit("cancel");
    }
  }
};
</script>
<style scoped lang="scss">
.minute {
  .weui {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .skins {
    position: absolute;
    right: 3px;
    .up {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 7px solid #fff;
      height: 0;
      width: 0;
      display: block;
      position: absolute;
      right: 65px;
      top: -7px;
    }
    ul {
      padding: 0px;
      margin: 0px;
      li {
        list-style: none;
        width: 140px;
        height: 44px;
        line-height: 44px;
        color: #353535;
        background-color: #fff;
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>

