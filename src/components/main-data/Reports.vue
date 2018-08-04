<template>
  <div class="reports">
    <p>研报摘要</p>
    <ul>
      <li v-for="(reports,index) in reportsVolume" :key="'reports'+index">
        <a href="" target="_self">{{reports.title.split('】')[1].slice(0)}}</a>
        <div class="date">
          <span>{{reports.title.split('】')[0].slice(1)}}</span>
          <span :class="{stateRed:(reports.tzpj==='买入'),stateOrg:(reports.tzpj==='增持')}" v-show="(reports.tzpj)!==''">{{reports.tzpj}}</span>
          <span class="review" v-show="(reports.typeStr)!==''">{{reports.typeStr}}</span>
          <span class="nothing"></span>
          <span>{{updated(reports)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  props: ["reports-volume"],
  methods: {
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
  },
}
</script>
<style scoped lang="scss">
.reports {
  margin-left: 12px;
  ul {
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      list-style: none;
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
.reports {
  p {
    margin: 8px 0;
    color: #2e6bb1;
    font-size: 12px;
  }
  li {
    margin: 8px 0;
    a {
      line-height: 18px;
    }
    div {
      font-size: 8px;
      color: #888888;
      display: flex;
      span:first-child {
        line-height: 18px;
      }
      .stateRed {
        color: #d11d1d;
        border: solid 1px #d11d1d;
        margin: 0 5px;
        text-align: center;
        border-radius: 3px;
        padding: 1px 3px;
      }
      .stateOrg {
        color: orange;
        border: solid 1px orange;
        margin: 0 5px;
        text-align: center;
        border-radius: 3px;
        padding: 1px 3px;
      }
      .review {
        border: solid 1px #2e6bb1;
        color: #2e6bb1;
        margin: 0 5px;
        border-radius: 3px;
        padding: 1px 3px;
        line-height: 14px;
      }
      .nothing {
        flex: 1;
      }
      span:last-child {
        width: 35px;
        padding-right: 16px;
      }
    }
  }
}
</style>

