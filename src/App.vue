<template>
  <div id="app">
    <Header></Header>
    <navigation></navigation>
    <StockList></StockList>
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";
import navigation from "./components/Navigation.vue";
import StockList from "./components/StockList.vue";

export default {
  name: "app",
  components: {
    Header,
    navigation,
    StockList
  }
};
</script>

<style>

</style>
