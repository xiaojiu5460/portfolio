<template>
  <div>
    <div :class="{container:true,move:left}">
      <div class="icon">
        <i class="iconfont icon-fangdajing"></i>
      </div>
      <div class="search">
        <input type="text" placeholder="点击搜索股票/板块" @click="change" v-model="inputNumber" @keyup="getSearchData">
      </div>
      <div class="delete" v-show="haveContent" @click="deleteNumber">
        <i class="iconfont icon-shanchu1"></i>
      </div>
      <div class="more" @click="cancel">
        <span>取消</span>
      </div>
    </div>
    <div v-show="haveContent">
      <div class="enterCode" v-show="searchData.length!=0">
        <div class="history">
          <span class="title">股票</span>
        </div>
        <div :class="{result:true,resultAuto:auto}">
          <ul>
            <li v-for="(search,index) in searchData" :key="'search'+index" @click="goDetail(search)">
              <div class="searchList">
                <div class="left">
                  <p>{{search[2]}}</p>
                  <p>{{search[1]}}.{{search[0].toUpperCase()}}</p>
                </div>
                <div class="right">
                  <span>
                    <i class="iconfont icon-tianjia"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="expand" @click="showAllresult" v-show="searchData.length>5||!auto">
          <span class="down">展开更多股票
            <i class="iconfont icon-xiangxia"></i>
          </span>
        </div>
      </div>
      <div class="nothing" v-show="searchData.length==0">
        <span>暂无匹配信息</span>
      </div>
    </div>
    <div class="noCode" v-show="!haveContent">
      <div class="weui" v-show="isShow" @click="back"></div>
      <div>
        <div class="searchCode">
          <span class="title">热搜榜</span>
        </div>
        <div class="hotStock">
          <div class="stock" v-for="(hot,index) in hotStock" :key="'hot'+index" @click="getCode(hot)">
            <p>{{hot[1]}}</p>
            <p>{{hot[0].slice(2)}}.{{hot[0].slice(0,2).toUpperCase()}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="history">
          <span class="title">股票查询记录</span>
          <span class="icon" @click="deleteList">
            <i class="iconfont icon-shanchu"></i>
          </span>
        </div>
        <div class="historyList" v-for="(history,index) in historyList" :key="'history'+index" v-if="historyList">
          <div class="left">
            <p>{{history.name}}</p>
            <p>{{history.code}}.{{history.market.toUpperCase()}}</p>
          </div>
          <div class="right">
            <span>
              <i class="iconfont icon-tianjia"></i>
            </span>
          </div>
        </div>
        <!--  -->
        <div class="iosDialog" v-show="deleteClick">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
            <div class="weui-dialog_bd">删除搜索历史记录？</div>
            <div class="weui-dialog_ft">
              <div @click="uncertain">
                <a>取消</a>
              </div>
              <div @click="determine">
                <a>确定</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Search",
  data() {
    return {
      auto: false,
      inputNumber: null,
      searchData: [],
      historyList: null,
      isShow: false,
      left: false,
      hotStock: null,
      deleteClick: false,
    }
  },
  created() {
    this.getHistoryList();
    let url = `http://proxy.finance.qq.com/ifzqgtimg/appstock/app/HotStock/getHotStock`;
    this.$http.get(url).then(function (res) {
      this.hotStock = res.data.data;
    })
  },
  computed: {
    haveContent() {
      if (!this.inputNumber) {
        return false;
      }
      return true;
    },
  },
  methods: {
    goDetail(stock) {
      this.$router.push({
        path: "detail",
        query: { code: stock[0] + stock[1] },
      });
      //根据点击的li获取stock相关信息
      this.getHistoryList();
      let l = {
        name: stock[2],
        code: stock[1],
        market: stock[0],
      };
      //localData是原有value(有值或没有),在原有value基础上push新value并set,保证初始时historylist能读到
      let localData=JSON.parse(localStorage.getItem("history"))||[];
      localData.push(l)
      localStorage.setItem("history", JSON.stringify(localData))
    },
    getHistoryList() {
      //初始读localStorage存储value
      this.historyList = JSON.parse(localStorage.getItem("history"));
    },
    getCode(stock) {
      this.$router.push({
        path: "detail",
        query: { code: stock[0] },
      });
    },
    getSearchData() {
      if (this.inputNumber == null) {
        return;
      }
      let url = `http://proxy.finance.qq.com/ifzqgtimg/appstock/smartbox/search/get?q=${this.inputNumber}`;
      this.$http.get(url).then(function (res) {
        this.searchData = res.body.data.stock;
        // console.log(this.searchData);
      })
    },
    deleteNumber() { //删除输入框的数字或文字
      // let d=(JSON.parse((this.inputNumber)));
      // console.log(d)
      this.inputNumber = null;
    },
    showAllresult() {
      this.auto = true;
    },
    back: function () {
      this.isShow = false;
      this.left = false;    //点输入框外，placeholder恢复默认居中
    },
    change: function () {
      this.left = true;
      this.isShow = true;
    },
    cancel: function () {
      if (this.left) {
        this.left = false;
      }
      this.$router.push({
        path: '/'
      })
    },
    deleteList() {
      if (this.historyList) {
        this.deleteClick = true;
      }
    },
    uncertain() {
      this.deleteClick = false;
    },
    determine() {
      this.historyList = [];
      localStorage.clear();
      this.deleteClick = false;
    },
  },
}
</script>
<style scoped lang="scss">
.nothing {
  line-height: 400px;
  text-align: center;
}
.result {
  ul {
    height: 205px;
    overflow: hidden;
    padding-left: 0px;
    margin: 0;
    li {
      list-style: none;
    }
  }
  &.resultAuto {
    ul {
      height: auto;
    }
  }
}
.expand {
  color: #7a7777;
  text-align: center;
  font-size: 12px;
  border-bottom: solid 1px #f3f0f0;
  line-height: 25px;
  margin-top: -5px;
}
.historyList,
.searchList {
  display: flex;
  border-bottom: 1px solid #f3f0f0;
  padding: 5px 0;
  .left {
    flex: 1;
    margin-left: 12px;
    p {
      margin: 0;
    }
    p:first-child {
      font-size: 14px;
    }
    p:last-child {
      font-size: 12px;
      color: #7a7777;
    }
  }
  .right {
    width: 20px;
    margin-right: 12px;
    align-items: center;
    display: flex;
    color: #11a1f5;
  }
}
.container {
  background-color: #fff;
  height: 45px;
  display: flex;
  border-bottom: 1px solid #f3f0f0;
  position: relative;
  .search {
    margin: 0;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 12px;
    input {
      background-color: #f1efef;
      height: 26px;
      border: 0;
      // border-top-right-radius: 5px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      font-family: "Microsoft Yahei";
      letter-spacing: 1px;
    }
    input::-webkit-input-placeholder {
      color: #b1b4b7;
    }
  }
  .icon {
    background-color: #f1efef;
    margin: 9px 0 0 12px;
    height: 28px;
    width: 23px;
    position: absolute;
    left: 90px;
    display: flex;
    align-items: center;
    .iconfont {
      color: #b1b4b7;
    }
  }
  .delete {
    background-color: #f1efef;
    margin: 9px 0 0 12px;
    height: 28px;
    width: 23px;
    position: absolute;
    right: 45px;
    display: flex;
    align-items: center;
    .iconfont {
      color: #cacdd0;
    }
  }
  .more {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    color: #479bf9;
    width: 40px;
    font-size: 12px;
    letter-spacing: 1px;
  }
  &.move {
    .search {
      padding: 0 12px 0 34px;
    }
    .icon {
      left: 0px;
    }
  }
  &.blackSkin {
    background-color: #1d2127;
    .search {
      input {
        background-color: #141019;
        color: #6c737f;
      }
    }
    .more {
      color: #fff;
    }
  }
  &.move {
    .search {
      input {
        text-align: left;
      }
      .iconfont {
        left: 15px;
      }
    }
  }
}
.searchCode,
.history {
  display: flex;
  border-bottom: solid 1px #f3f0f0;
  height: 40px;
  .title {
    margin: 5px 12px;
    font-size: 14px;
    font-weight: bold;
    align-items: center;
    display: flex;
    flex: 1;
  }
  .icon {
    width: 20px;
    margin-right: 12px;
    align-items: center;
    display: flex;
  }
}
.hotStock {
  display: flex;
  flex-wrap: wrap;
  .stock {
    width: 33%;
    text-align: center;
    border-bottom: solid 1px #f3f0f0;
    border-right: solid 1px #f3f0f0;
    p {
      margin: 5px;
    }
    p:first-child {
      font-size: 14px;
    }
    p:last-child {
      font-size: 10px;
      color: #bfb0b0;
    }
  }
}
.weui {
  position: fixed;
  top: 45px;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
}
.weui-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.weui-dialog {
  position: fixed;
  z-index: 5000;
  width: 70%;
  max-width: 300px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  .weui-dialog_bd {
    min-height: 40px;
    font-size: 16px;
    word-wrap: break-word;
    word-break: break-all;
    color: #808080;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #d9d9d9;
  }
  .weui-dialog_ft {
    position: relative;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 40px;
    > div {
      flex: 1;
      color: #6db5fd;
      &:last-child {
        border-left: 1px solid #d9d9d9;
      }
    }
    a {
      display: block;
      line-height: 40px;
      letter-spacing: 2px;
    }
  }
}
</style>

