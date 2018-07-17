<template>
  <div class="container">
    <div class="pre" @click="previous">
      <span><i class="iconfont icon-back"></i></span>
    </div>
    <div class="stockCode">
      <p class="code">{{stockInfo.name}}({{stockInfo.code}}.{{stockInfo.code2.slice(0,2)}})</p>
      <p class="time"><span>交易中</span>07-11 09:30:00</p>
    </div>
    <div class="icon">
      <span><i class="iconfont icon-shuaxin"></i></span>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailTitle",
  props: ["stock-info"],
  components: {},
  // data(){
  // },
  methods:{
    previous:function(){
      this.$router.push({
        path:'/'
      })
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
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
      span {
        padding-right: 5px;
      }
    }
    .code {
      font-size: 16px;
    }
    .time {
      font-size: 13px;
      color: #a8ccf5;
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
}
li {
  list-style: none;
}
</style>
