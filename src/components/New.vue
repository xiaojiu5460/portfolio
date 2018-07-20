<template>
  <div class="news">
    <div class="title">
      <ul>
        <li :class="{show:isActive,hide:hasError}">新闻</li>
        <li>公告</li>
        <li>资金</li>
        <li>简况</li>
        <li>财务</li>
        <li>研报</li>
      </ul>
    </div>
    <div class="announcement">
      <ul>
        <li v-for="(news,index) in newsData" :key="'news'+index">
          <a class="Title" href="" target="_self">{{news.title}}</a>
          <div class="date"><span>{{news.src}}</span><span></span></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["news-data"],
  data() {
    return {
      isActive: true,
      hasError: false
    };
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
  .show {
    color: #007aff;
    border-bottom: 2px #007aff solid;
  }
  .hide {
    border-bottom: 2px #fff solid;
  }
}
.announcement {
  margin-left: 12px;
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
      height: 45px;
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
      div {
        font-size: 8px;
        color: #888888;
        span:last-child {
          float: right;
          padding-right: 16px;
        }
      }
    }
  }
}
</style>


