<template>
  <div id="deepBlue">
    <div class="serch" style="margin-top:15px"><input type="text" name="sock" placeholder="点击搜索股票/板块"></div>
    <div class="more" style="margin-top:16.5px"><span>···</span></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {}
};
</script>

<style scoped>
#deepBlue {
  background-color: #2d6bb1;
  height: 55px;
}

.serch {
  display: inline-block;
}

.serch input {
  background-color: #427ab8;
  height: 26px;
  width: 213px;
  border: 0;
  padding: 0;
  border-radius: 5px;
  margin-left: 12px;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #b8cce3;
  text-align: center;
  font-family: "Microsoft Yahei";
  letter-spacing: 1px;
  font-size: 11px;
  line-height: 1em;
}

.more {
  float: right;
  margin-right: 17px;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  letter-spacing: 1px;
}

ul {
  padding: 0;
  float: right;
}

ul li {
  list-style: none;
  width: 254px;
  line-height: 69px;
  font-size: 22px;
  text-align: center;
  border-top: solid #eaecee 1px;
}
</style>
