<template>
  <div id="app">
    <Header></Header>
    <navigation></navigation>
    <StockList :stocks-list="stocksList"></StockList>
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
      stocksList: [
        "sh000001",
        "sz300001",
        "sh600180",
        "sz000729",
        "sz000001",
        "sz300540",
        "sh600150",
        "sz002053",
        "sh603099",
        "sz002076",
        "sh603136",
        "sh601015"
      ]
    };
  },
  created: function() {}
};
</script>

<style>

</style>
