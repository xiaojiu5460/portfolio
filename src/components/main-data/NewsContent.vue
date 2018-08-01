<template>
  <div class="content">
    <div class="title">
      <p>{{title}}</p>
      <p>
        <span>{{src}}</span>
        <span>{{time}}</span>
      </p>
    </div>
    <div class="relatedStock">
      <p>
        <span>相关股票：</span>
        <span class="stock">{{content.stockInfo[0].name}}</span>
      </p>
    </div>
    <div class="detail">
      <span v-html="content.content.text"></span>
    </div>
  </div>
</template>
<script>

export default {
  // name: 'NewsContent'
  props:["content","title","src","time"],
  created(){
    // console.log(this.title)
  }
}
</script>
<style scoped lang="scss">
.content {
  margin: 55px 12px 10px 12px;
  .title {
    border-bottom: solid 1px #d9dde0;
    p:first-child {
      font-size: 15px;
    }
    p:last-child {
      font-size: 12px;
      color: #5d5f61;
    }
  }
  .relatedStock{
    font-size:13px;
    // margin: 
    .stock{
      color:#458ee0;
      margin:0 5px;
    }
  }
  .detail{
    margin-top:15px;
    font-size:14px;
    line-height: 25px;
  }
  p {
    margin: 10px 0;
  }
}
</style>

