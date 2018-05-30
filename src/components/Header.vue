<template>
<div id="deepBlue">
  <div>
    <div class="search">
      <input/>
    </div>
    <div class="">
      <span></span>
      <ul>

      </ul>
    </div>
  </div>
            <label><input type="text" name="sock" placeholder="点击搜索股票/板块"></label>
            <span class="more">···</span>
            
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
  line-height: 110px;
}

label input {
  background-color: #427ab8;
  line-height: 52px;
  width: 426px;
  border: 0;
  padding: 0;
  border-radius: 5px;
  margin-left: 25px;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #b8cce3;
  text-align: center;
  font-size: 22px;
  font-family: "Microsoft Yahei";
  letter-spacing: 2px;
}

.more {
  /* width: 22px; */
  float: right;
  margin-right: 35px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
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
