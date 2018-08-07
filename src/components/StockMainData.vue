<template>
  <div :class="[showfix]">
    <div class="title">
      <ul>
        <li :class="{showNew:show=='新闻',hideNew:show==!'新闻'}" @click="newsHL">新闻</li>
        <li :class="{announcement:show==!'公告',notice:show=='公告'}" @click="noticeHL">公告</li>
        <li>资金</li>
        <li :class="{brief:show==!'简况',briefing:show=='简况'}" @click="briefHL">简况</li>
        <li>财务</li>
        <li :class="{report:show==!'研报',research:show=='研报'}" @click="reportsHL">研报</li>
      </ul>
    </div>
    <News v-show="show=='新闻'" :news-data="newsData"></News>
    <Announcement v-show="show=='公告'" :announcement="announcement"></Announcement>
    <Brief v-show="show=='简况'" :brief="briefingVolume" v-if="briefingVolume" :zdf="briefZdf"></Brief>
    <reports v-if="show=='研报'" :reports-volume="reportsVolume"></reports>
  </div>
</template>
<script>
import News from "./main-data/News.vue";
import Announcement from "./main-data/Announcement.vue";
import Brief from "./main-data/Brief.vue";
import Reports from "./main-data/Reports.vue";
import { EventBus } from "../utils/EventBus.js";
export default {
  props: ["stockcode"],
  data() {
    return {
      show: '新闻',
      showfix: 'news',
      newsData: null,
      announcement: null,
      reportsVolume: null,
      briefingVolume: null,
      briefZdf: null,
    };
  },
  components: {
    News,
    Announcement,
    Reports,
    Brief
  },
  created() {
    this.getNews();
    this.getAnnounceVolume();
    this.getReports();
    // this.getBriefVolume();
    // this.getZdf();
    // console.log(this.stockcode)
    let that = this;
    EventBus.$on("titleFixed", function (data) {
      that.showfix = data;
    })
  },
  computed: {
  },
  methods: {
    getNews: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/news/info/search?symbol=${this
        .stockcode}&page=1&n=5&type=3`;
      this.$http.get(url).then(function (res) {
        this.newsData = res.body.data.data;
        // console.log(res.body.data.data);
      });
    },
    getAnnounceVolume: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/news/noticeList/searchByType?symbol=${this.stockcode}&page=1&n=20&noticeType=0`;
      this.$http.get(url).then(function (res) {
        this.announcement = res.body.data.data;
      })
    },
    getBriefVolume: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/app/stockinfo/jiankuang?code=${this
        .$route.query.code}`;
      let briefVolumePromise = this.$http.get(url);
      // console.log(briefVolumePromise, typeof briefVolumePromise);
      return briefVolumePromise.then(function (res) {
        let l = {};
        l.detail = res.body.data.zyzb.detail;
        l.gsjj = res.body.data.gsjj;
        l.concept = res.body.data.gsjj.concept;
        l.zysr = res.body.data.zysr;
        l.zysrdetail = res.body.data.zysr.detail;
        l.gdgb = res.body.data.gdgb;
        l.ggzjc = res.body.data.ggzjc;
        l.ggjj = res.body.data.ggjj;
        l.fhsp = res.body.data.fhsp;
        l.pxmzb = res.body.data.pxmzb;
        l.hydb = res.body.data.hydb;
        l.hydbStock = res.body.data.hydb.stock;
        l.hydbHy = res.body.data.hydb.hy;
        l.hydbHymax = res.body.data.hydb.hymax;
        l.hydbHyMin = res.body.data.hydb.hymin;
        l.hydbHyMin = res.body.data.hydb.hymin;
        l.hytrend = res.body.data.hytrend;
        // this.briefingVolume = l;
        // this.briefingVolume = Object.assign({}, res.body.data);
        // console.log(res.body.data);
        return l;
      })
    },
    getReports: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/app/investRate/getReport?symbol=${this
        .stockcode}&page=0&n=20`;
      this.$http.get(url).then(function (res) {
        this.reportsVolume = res.body.data.data;
        // console.log(this.reportsVolume)
      })
    },
    getZdf: function () {
      let url = `http://220.249.243.51/ifzqgtimg/appstock/app/stockinfo/plate?code=${this
        .stockcode}&zdf=1`;
      return this.$http.get(url).then(function (res) {
        // this.briefZdf = res.body.data[0];
        // console.log(this.briefZdf.name)
        return res.body.data[0];
      })
    },
    newsHL: function () {
      this.show = '新闻';
    },
    reportsHL: function () {
      this.show = '研报';
    },
    noticeHL: function () {
      this.show = '公告';
    },
    briefHL: function () {
      this.show = '简况';
      let that = this;
      Promise.all([this.getBriefVolume(), this.getZdf()]).then(function (res) {
        // console.log(res[0]);
        that.briefingVolume = res[0];
        that.briefZdf = res[1];
        if(that.briefZdf.zdf>0){
          that.briefZdf.color='red';
        }else{
          that.briefZdf.color='green';
        }
        // console.log(that.briefZdf);
      },
        // function (res) {
        //   console.log(res)
        // }
      );
    },
  }
};
</script>
<style scoped lang="scss">
li {
  list-style: none;
}
.news {
  .title {
    border-bottom: 1px solid #f1f2f5;
    margin: 0 16px 0 12px;
    width: 95%;
    background-color: #fff;
    ul {
      display: flex;
      align-items: center;
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
    .research,
    .notice,
    .briefing {
      color: #007aff;
      border-bottom: 2px #007aff solid;
    }
    .hideNew,
    .report {
      border-bottom: 2px #fff solid;
    }
  }
}
.titlefix {
  margin-top: 30px;
  .title {
    position: fixed;
    top: 45px;
    border-bottom: 1px solid #f1f2f5;
    margin: 0 16px 0 12px;
    width: 95%;
    background-color: #fff;
    ul {
      display: flex;
      align-items: center;
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
    .research,
    .notice,
    .briefing {
      color: #007aff;
      border-bottom: 2px #007aff solid;
    }
    .hideNew,
    .report {
      border-bottom: 2px #fff solid;
    }
  }
}
</style>


