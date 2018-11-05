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
import { formatTime } from '../../utils/tools.js'
export default {
  props: ["announcement"],
  data() {
    return {

    }
  },
  methods: {
    updated: function (n) {
      return formatTime(n.time);
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