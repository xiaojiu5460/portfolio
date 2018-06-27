<template>
  <div id="app">
    <Header></Header>
    <navigation></navigation>
    <StockList></StockList>
    <!-- <CreatGroup></CreatGroup> -->
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";
import navigation from "./components/Navigation.vue";
import StockList from "./components/StockList.vue";
// import CreatGroup from "./components/CreatGroup.vue";

export default {
  name: "app",
  components: {
    Header,
    navigation,
    StockList
    // CreatGroup
  },
  data() {
    return {
      list: []
    };
  },
  created:function(){}
};
</script>

<style>

</style>
