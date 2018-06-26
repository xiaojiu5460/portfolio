<template>
  <div class="container">
    <div class="search">
      <div><img src="../assets/img/search.png">点击搜索股票/板块</div>
    </div>
    <div class="more"><span>···</span></div>
    <div class="skins">
      <ul>
        <li>分组管理</li>
        <li>黑色皮肤</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {}
};
</script>

<style scoped>
.skins ul{
  padding:0px;
  margin: 0px;
}
.skins li{
  list-style: none;
  width:128px;
  height: 44px;
  line-height: 44px;
  color:#353535;
  border-bottom: 1px solid #f1f2f5;
  background-color:#fff;
  text-align: center;
}
.container {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
}
img{
  height: 15px;
  width:15px;
  padding-right: 5px;
}
.search {
  margin: 0;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 12px;
}

.search div {
  background-color: #427ab8;
  height: 26px;
  border:0;
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
/* input::-webkit-input-placeholder {
  /* WebKit browsers 
  color: #b8cce3;
  text-align: center;
  font-size: 12px;
  font-family: "Microsoft Yahei";
  letter-spacing: 1px;
} */

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
</style>
