<template>
  <div id="app">
    <Header></Header>
    <Navigation></Navigation>
    <StockList :stocks-list="stocksList" v-on:child-mes="updateList"></StockList>
    <!-- <CreatGroup></CreatGroup> -->
  </div>
</template>

<script>
import "normalize.css";
import Header from "./components/Header.vue";
import Navigation from "./components/Navigation.vue";
import StockList from "./components/StockList.vue";
// import CreatGroup from "./components/CreatGroup.vue";

export default {
  name: "app",
  components: {
    Header,
    Navigation,
    StockList,
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
  created: function() {},
  methods:{
    updateList: function(data) {
      // console.log(data)
      //把勾选的股票删除
      var newList=[];
      var newData=data.map(function(item){
          return item.code2;
      })
      //遍历list里和mes不同的加到新数组
      for (var index = 0; index < this.stocksList.length; index++) {
        var code = this.stocksList[index];
        //判断code在不在data里
        if(newData.indexOf(code)===-1){
          newList.push(code)
        }
      }
      this.stocksList=newList;
      // console.log(this.stocksList);
    },
  }
};
</script>

<style>

</style>
