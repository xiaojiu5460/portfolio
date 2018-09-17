<template>
    <div class="newstitle">
      <div class="pre" @click="previous">
        <span>
          <i class="iconfont icon-back"></i>
        </span>
      </div>
      <div class="title">{{stockInfo.stockInfo[0].name}}-新闻
      </div>
    </div>
</template>
<script>

export default {
  props:["stockInfo"],
  created(){
    // console.log(this.stockInfo.stockInfo[0].name)
  },
  methods: {
    previous: function () {
      history.back()
    }
  },
}
</script>
<style scoped lang="scss">
.newstitle {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
  position: fixed;
  width: 100%;
  top: 0;
  overflow: hidden;
  color: #fff;
  .pre {
    width: 25px;
    margin-left: 10px;
    span {
      width: 25px;
      line-height: 45px;
    }
  }
  .title {
    flex: 1;
    justify-content: center;
    align-content: center;
    display: flex;
    line-height: 45px;
    margin-left: -25px;
  }
}
</style>

