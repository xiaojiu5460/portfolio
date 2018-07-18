<template>
  <div :class="{black:blackColor, home:true}">
    
    
    <Header></Header>
    <Navigation></Navigation>
    <StockList :stocks-list="stocksList" v-on:child-mes="updateList"></StockList>  
  </div>
</template>

<script>
import "normalize.css";
import Header from "../components/Header.vue";
import Navigation from "../components/Navigation.vue";
import StockList from "../components/StockList.vue";
import { EventBus } from "../utils/EventBus.js";
    // <router-link to="/xxx">Go to xxx</router-link>
export default {
  name: "Home",
  components: {
    Header,
    Navigation,
    StockList
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
        "sh601015",
        "sz300230",
      ],
      blackColor: false
    };
  },
  created: function() {
    let that = this;
    EventBus.$on("changeSkin", function(data) {
      switch (data) {
        case "black":
          that.blackColor = true;
          break;

        case "white":
          that.blackColor = false;
          break;
      }
    });
  },
  methods: {
    updateList: function(data) {
      // console.log(data)
      //把勾选的股票删除
      var newList = [];
      var newData = data.map(function(item) {
        return item.code2;
      });
      //遍历list里和mes不同的加到新数组
      for (var index = 0; index < this.stocksList.length; index++) {
        var code = this.stocksList[index];
        //判断code在不在data里
        if (newData.indexOf(code) === -1) {
          newList.push(code);
        }
      }
      this.stocksList = newList;
      // console.log(this.stocksList);
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
  background-color: #fff;
  &.black {
    background-color: #101419;
  }
}
</style>
