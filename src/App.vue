<template>
  <div id="app">
    <Header></Header>
    <navigation></navigation>
    <SockList></SockList>
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";
import navigation from "./components/Navigation.vue";
import SockList from "./components/SockList.vue";

export default {
  name: "app",
  components: {
    Header,
    navigation,
    SockList
  }
};
</script>

<style>

</style>
