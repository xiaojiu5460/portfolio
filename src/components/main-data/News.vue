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
      let format = new Date(n.time).getTime();
      let H = (new Date(n.time).getHours());
      let M = (new Date(n.time).getMinutes());
      let today = ("0" + H).substr(-2) + ':' + ("0" + M).substr(-2);
      let Month = (new Date(n.time).getMonth()) + 1;
      let D = (new Date(n.time).getDate());
      let history = ("0" + Month).substr(-2) + '-' + ("0" + D).substr(-2);
      // console.log(format);
      // console.log(n.time);
      let nowDate = new Date();
      let getTD = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0).getTime();
      let getYD = getTD - 24 * 60 * 60 * 1000;
      if (format > getTD) {
        return today;
      } else if ((format < getTD) && (format > getYD)) {
        return '昨天';
      } else {
        return history;
      }
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


