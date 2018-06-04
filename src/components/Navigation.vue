<template>
  <div class="group">
    <ul>
      <li :class="{show:isActive,hide:hasError}">全部</li>
      <li>沪深</li>
      <li>港股</li>
      <li>美股</li>
      <li>场外基金</li>
      <li>自定义</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      isActive: true,
      hasError: false
    };
  },
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 只应用于局部非全局--> 
<style scoped>
.show {
  color:#0078ff;
  border-bottom: 2px #0078ff solid;
}
.hide {
  border-bottom: 2px #fff solid;
}
.group {
  border-bottom: 1px solid #f1f2f5;
  height: 30px;
}
ul {
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 12px;
  margin: 0;
}
li {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 26px;
  text-align: center;
  flex-shrink: 0;
  margin-right: 16px;
  padding:0 3px;
  font-size:15px;
}
</style>
