<template>
  <div class="news">
    <div class="title">
      <ul>
        <li :class="{showNew:showNews,hideNew:!showNews}" @click="newsHL">新闻</li>
        <li>公告</li>
        <li>资金</li>
        <li>简况</li>
        <li>财务</li>
        <li :class="{report:!showReport,research:showReport}" @click="reportsHL">研报</li>
      </ul>
    </div>
    <div class="announcement" v-show="news">
      <ul>
        <li v-for="(news,index) in newsData" :key="'news'+index">
          <a class="Title" href="" target="_self">{{news.title}}</a>
          <div class="date">
            <span>{{news.src}}</span>
            <span>{{updated(news)}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="reports" v-show="!news">
      <p>研报摘要</p>
      <ul>
        <li v-for="(reports,index) in reportsVolume" :key="'reports'+index">
          <a href="" target="_self">{{reports.title.split('】')[1].slice(0)}}</a>
          <div class="date">
            <span>{{reports.title.split('】')[0].slice(1)}}</span>
            <span class="state">买入</span>
            <span>{{updated(reports)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  props: ["news-data", "reports-volume"],
  data() {
    return {
      showNews: true,
      showReport: false,
      news:true,
    };
  },
  methods: {
    reportsHL:function(){
        this.showReport=true;
        this.showNews=false;
        this.news=false;
    },
    newsHL:function(){
        this.showReport=false;
        this.showNews=true;
        this.news=true;
    },
    updated: function (n) {
      let format = new Date(n.time).getTime();
      let H = (new Date(n.time).getHours());
      let M = (new Date(n.time).getMinutes());
      let today = ("0" + H).substr(-2) + ':' + ("0" + M).substr(-2);
      let Month = (new Date(n.time).getMonth());
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
};
</script>
<style scoped lang="scss">
.news .title {
  border-bottom: 1px solid #f1f2f5;
  margin: 0 16px 0 12px;
  ul {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    color: #888888;
    li {
      display: flex;
      justify-content: center;
      list-style: none;
      line-height: 26px;
      flex-shrink: 0;
      padding: 0 5px;
      font-size: 13px;
      letter-spacing: 1px;
      width: 13%;
    }
  }
  .showNew,
  .research {
    color: #007aff;
    border-bottom: 2px #007aff solid;
  }
  .hideNew,
  .report {
    border-bottom: 2px #fff solid;
  }
}
.announcement,
.reports {
  margin-left: 12px;
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      display: flex;
      flex-direction: column;
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
}
.announcement {
  li {
    line-height: 20px;
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
.reports {
  p {
    margin: 8px 0;
    color: #2e6bb1;
    font-size: 12px;
  }
  li {
    line-height: 25px;
    div {
      font-size: 8px;
      color: #888888;
      display: flex;
      span:first-child {
        width: 80px;
      }
      .state {
        color: #d11d1d;
        border: solid 1px #d11d1d;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 3px;
      }
      span:last-child {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 16px;
      }
    }
  }
}
</style>


