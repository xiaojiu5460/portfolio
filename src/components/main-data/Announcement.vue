<template>
  <div class="announce">
    <div class="title">
      <p>公司公告</p>
    </div>
    <ul>
      <li v-for="(announce,index) in announcement" :key="'announce'+index">
        <a href="">{{announce.title}}</a>
        <div>
          <span>{{updated(announce)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  props: ["announcement"],
  data() {
    return {

    }
  },
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
  }
}
</script>
<style scoped lang="scss">
.announce {
  margin-left: 12px;
  margin: 0;
  ul {
    padding: 0;
    margin: 0;
    li {
      display: flex;
      flex-direction: column;
      margin: 8px 12px;
      a {
        margin: 0;
        font-size: 12px;
        line-height: 18px;
      }
      a:hover,
      a:visited,
      a:link,
      a:active {
        color: #000;
        text-decoration: none;
      }
      span {
        width: 50px;
        right: 0;
        float: right;
        padding-right: 16px;
        font-size: 10px;
      }
    }
  }
  .title {
    border-bottom: solid 1px #d7e0ea;
    p {
      margin: 8px 12px;
      color: #2e6bb1;
      font-size: 12px;
    }
  }
}
</style>