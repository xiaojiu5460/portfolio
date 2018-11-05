<template>
  <div class="currentNew">
    <ul>
      <li v-for="(news,index) in newsData" :key="'news'+index">
        <router-link :to="{ path: '/NewsDetail', query: { code: news.symbol,id:news.id,title:news.title,src:news.src,time:news.time}}">{{news.title}}</router-link>
        <div class="date">
          <span>{{news.src}}</span>
          <span>{{updated(news)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { formatTime } from '../../utils/tools.js'
export default {
  props: ["news-data"],
  data() {
    return {

    };
  },
  created() {
    // console.log(this.newsData)
    // window.localStorage.setItem("code",this.news.symbol)
  },
  methods: {
    updated: function (n) {
      return formatTime(n.time);
    }
  }
}
</script>
<style scoped lang="scss">
.currentNew {
  border-bottom: 2px #fff solid;
  margin-left: 12px;
  ul {
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      line-height: 20px;
      a {
        margin: 0;
        font-size: 13px;
      }
      a:hover,
      a:visited,
      a:link,
      a:active {
        color: #000;
        text-decoration: none;
      }
    }
  }
  li {
    div {
      font-size: 8px;
      color: #888888;
      display: flex;
      span:first-child {
        flex: 1;
      }
      span:last-child {
        width: 50px;
        padding-right: 16px;
      }
    }
  }
}
</style>


