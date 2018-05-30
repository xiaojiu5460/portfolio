<template>
  <div id="app">
    <Header></Header>
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
* {
  margin: 0 auto;
}
</style>
