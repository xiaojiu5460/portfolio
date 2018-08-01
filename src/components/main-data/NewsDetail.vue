<template>
  <div>
    <NewsTitle :stockInfo="newsdetail"  v-if="newsdetail"></NewsTitle>
    <NewsContent :content="newsdetail" v-if="newsdetail" :title="title" :time="time" :src="src"></NewsContent>
  </div>
</template>
<script>
import NewsTitle from "./NewsTitle.vue";
import NewsContent from "./NewsContent.vue";
export default {
  data(){
    return{
      newsdetail:null,
      title:null,
      time:null,
      src:null,
    }
  },
  components:{NewsTitle,NewsContent},
  created(){
    this.title=this.$route.query.title;
    this.time=this.$route.query.time;
    this.src=this.$route.query.src;
    // console.log(this.code)
    this.getNewsDetail();
  },
  methods:{
    getNewsDetail:function(){
      let url=`http://47.91.228.8/api/portfolio/ifzqgtimg/appstock/news/NewsProxy/get?nkey=getQQNewsSimpleHtmlContent&id=${this.$route.query.id}&symbol=${this.$route.query.code}`;
      this.$http.get(url).then(function (res) {
        this.newsdetail = res.body.data.data;
        // console.log(this.newsdetail);
      })
    }
  },
}
</script>


