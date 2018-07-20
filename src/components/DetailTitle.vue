<template>
  <div class="container">
    <div class="pre" @click="previous">
      <span><i class="iconfont icon-back"></i></span>
    </div>
    <div class="stockCode">
      <p class="code">{{stockInfo.name}}({{stockInfo.code}}.{{(stockInfo.code2.slice(0,2)).toUpperCase()}})</p>
      <p class="time"><span v-show="exchange">交易中</span><span v-show="!exchange">已休市</span>{{date}}<span></span>{{hms}}</p>
    </div>
    <div class="icon" @click="reloading">
      <span v-show="!loading"><i class="iconfont icon-shuaxin"></i></span>
      <span v-show="loading"><img src="../assets/img/load.gif"></span>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailTitle",
  props: ["stock-info","loading"],
  components: {},
  // data(){
  // },
  computed:{
    date:function(){
      console.log(this.stockInfo.time);
      return this.stockInfo.time.slice(4,6)+'-'+this.stockInfo.time.slice(6,8);
    },
    hms:function(){
      return this.stockInfo.time.slice(8,10)+':'+this.stockInfo.time.slice(-4,-2)+':'+this.stockInfo.time.slice(-2)
    },
    exchange:function(){
      let nowDate = new Date();
      let now = nowDate.getTime();
      let startAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 9, 15, 0, 0).getTime();
      let endAm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 11, 30, 0, 0).getTime();
      let startPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 13, 0, 0, 0).getTime();
      let endPm = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 15, 0, 0, 0).getTime();
      if(
        (startAm<now&& now<endAm)||
        (startPm< now && now<endPm)
      ){
        return true;
      }else{
        return false;
      }
    }
  },
  methods:{
    reloading:function(){
      this.$emit("load");
    },
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
  img{
    width:18px;
    margin: 12px 12px 0 0;
  }
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
