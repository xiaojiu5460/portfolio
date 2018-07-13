<template>
  <div >
    <DetailTitle></DetailTitle>
    <StockData></StockData>
    <Trend></Trend>
    <New></New>
  </div>
</template>
<script>
import DetailTitle from "../components/DetailTitle.vue";
import StockData from "../components/StockData.vue";
import Trend from "../components/Trend.vue";
import New from "../components/New.vue";
export default {
  name: "StockDetail",
  props: [""],
  components:{
    DetailTitle,
    StockData,
    Trend,
    New,
  }
};
</script>

