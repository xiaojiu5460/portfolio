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
import { setStockLs, getStocksByGroup } from "../utils/ls.js";
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
      stocksList: null,
      blackColor: false
    };
  },
  created: function () {
    // 先getitem 是否为空 否则给默认值set
    //1. local为空，stocklist=默认给的code列表
    //2. local不为空时，stocklist=local里的code列表
    // getAllGroupInfo();
    this.stocksList = getStocksByGroup('全部').code;
    setStockLs();
    let that = this;
    EventBus.$on("newStockList", function (group) {
        that.stocksList = getStocksByGroup(group).code;
    })
    EventBus.$on("changeSkin", function (data) {
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
    updateList: function (data) {
      // console.log(data)
      //把勾选的股票删除
      var newList = [];
      var newData = data.map(function (item) {
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
