<template>
  <div id="app">
    <Header></Header>
    <navigation></navigation>
    <percent></percent>
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";
import navigation from "./components/Navigation.vue";
import percent from "./components/percent.vue";

export default {
  name: "app",
  components: {
    Header,
    navigation,
    percent
  }
};
</script>

<style>

</style>
