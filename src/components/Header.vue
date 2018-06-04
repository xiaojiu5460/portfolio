<template>
  <div class="container">
    <div class="search"><input type="text" name="sock" placeholder="点击搜索股票/板块"></div>
    <div class="more"><span>···</span></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {}
};
</script>

<style scoped>
.container {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
}

.search {
  margin: 0;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 12px;
}

.search input {
  background-color: #427ab8;
  height: 26px;
  border:0;
  border-radius: 5px;
  width: 100%;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #b8cce3;
  text-align: center;
  font-size: 12px;
  font-family: "Microsoft Yahei";
  letter-spacing: 1px;
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
</style>
