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
        <div class="result">
          <ul>
            <li v-for="(search,index) in searchData" :key="'search'+index">
              <div class="searchList">
                <div class="left" @click="goDetail(search)">
                  <p>{{search.name}}</p>
                  <p class="state" v-show="search.state">{{search.code.slice(2)}}.{{search.market.toUpperCase()}}</p>
                  <p v-show="!search.state">已在'{{search.groups}}'中</p>
                </div>
                <div class="right" @click="showDialog(search)">
                  <span>
                    <i class="iconfont icon-tianjia"></i>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="iosDialog" v-show="showWeui">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
            <div class="setting">设置分组</div>
            <div class="setting_all">
              <div>
                <span>
                  <i class="iconfont icon-gouxuan"></i>
                </span>全部
              </div>
            </div>
            <div class="setting_other" v-for="(group,index) in groups" :key="'group'+index" v-if="groups" @click="switchState(group)">
              <div :class="{black:!group.state,blue:group.state}">
                <span>
                  <i class="iconfont" :class="{'icon-weigouxuan':!group.state,'icon-gouxuan':group.state}"></i>
                </span>
                <span>{{group.group}}</span>
              </div>
            </div>
            <div class="setting_ft">
              <div @click="turnBack">
                <a>取消</a>
              </div>
              <div @click="addSearchCode">
                <a>确定</a>
              </div>
            </div>
          </div>
        </div>
        <div class="expand" @click="showAllresult" v-show="showMore">
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
          <div class="left" @click="goDetail(history)">
            <p>{{history.name}}</p>
            <p class="state" v-show="history.state">{{history.code.slice(2)}}.{{history.code.slice(0,2).toUpperCase()}}</p>
            <p v-show="!history.state">已在'{{history.groups}}'中</p>
          </div>
          <div class="right" @click="showdialog(history)">
            <span>
              <i class="iconfont icon-tianjia"></i>
            </span>
          </div>
        </div>
        <div class="iosDialog" v-show="showWeui">
          <div class="weui-mask"></div>
          <div class="weui-dialog">
            <div class="setting">设置分组</div>
            <div class="setting_all">
              <span>
                <i class="iconfont icon-gouxuan"></i>
              </span>全部
            </div>
            <div class="setting_other" v-for="(g,index) in groups" :key="'g'+index" v-if="groups" @click="switchState(g)">
              <div :class="{black:!g.state,blue:g.state}">
                <span>
                  <i class="iconfont" :class="{'icon-weigouxuan':!g.state,'icon-gouxuan':g.state}"></i>
                </span>
                <span>{{g.group}}</span>
              </div>
            </div>
            <div class="setting_ft">
              <div @click="turnBack">
                <a>取消</a>
              </div>
              <div @click="addHistoryCode">
                <a>确定</a>
              </div>
            </div>
          </div>
        </div>
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
import { getAllGroupInfo, searchAddtoLS, getGroupsByCode } from "../utils/ls.js";
export default {
  name: "Search",
  data() {
    return {
      showWeui: false,
      inputNumber: null,
      searchData: [],
      searchList: [],
      historyList: null,
      isShow: false,
      left: false,
      hotStock: null,
      deleteClick: false,
      search: null, //从搜索出来的拿到单个股票信息
      history: null, //从历史记录列表拿到的单个股票信息
      groups: null,
      clickGroup: [], //模态框分组列表 被勾选的group
      showMore: false,
      haveGroups: false,
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
    switchState(group) {
      this.clickGroup.push(group);
      if (!group.state) {
        group.state = true;
      } else {
        group.state = false;
      }
    },
    turnBack() {
      this.showWeui = false;
    },
    getGroups(s) {
      let l = getAllGroupInfo().slice(1);
      this.groups = l.map(function (item) {
        let g = {
          group: item.group,
          code: item.code,
        };
        g.state = false;
        return g;
      })
      for (let i = 0; i < this.groups.length; i++) {
        const element = this.groups[i].code;
        if (element.indexOf(s.code) == -1) {
          this.clickGroup = [];
        } else {
          element.state = true;
        }
      }
      return this.groups;
    },
    showdialog(h) {
      this.showWeui = true;
      this.history = h;
      this.getGroups(this.history);
    },
    addHistoryCode() {
      searchAddtoLS(this.clickGroup, this.history);
      if (this.showWeui) {
        this.showWeui = false;
      }
    },
    showDialog(s) {
      this.showWeui = true;
      this.search = s;
      this.getGroups(this.search);
    },
    addSearchCode() {        //搜索栏拿到的股票信息添加到去自选股的localStorage里
      searchAddtoLS(this.clickGroup, this.search)
      if (this.showWeui) {
        this.showWeui = false;
      }
    },
    goDetail(stock) {
      this.$router.push({
        path: "detail",
        query: { code: stock.code },
      });
      //根据点击的li获取stock相关信息
      this.getHistoryList();
      let code = stock.code;
      let l = {
        name: stock.name,
        code: stock.code,
        groups: getGroupsByCode(stock.code),
        state: true,
      };
      //localData是原有value(有值或没有),在原有value基础上push新value并set,保证初始时historylist能读到
      let localData = JSON.parse(localStorage.getItem("history")) || [];
      // let isExist = false; //标记代码在不是localData里面
      if (this.isExist(code, localData)) {
        return
      } else {
        localData.push(l)
        for (let i = 0; i < localData.length; i++) {
          const e = localData[i];
          if (e.groups.length == 0) {
            e.state = true;
          } else {
            e.state = false;
          }
        }
        localStorage.setItem("history", JSON.stringify(localData))
      }
    },
    isExist(code, ld) {
      for (let i = 0; i < ld.length; i++) {
        const e = ld[i];
        if (code == e.code) {
          return true;
        }
        return false;
      }
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
        this.searchList = (res.body.data.stock).filter(market => market[4] == "GP-A")
          .map(v => {
            return {
              code: v[0] + v[1],
              name: v[2],
              groups: getGroupsByCode(v[0] + v[1]),
              market: v[0],
              state: true,
            }
          })
        for (let i = 0; i < this.searchList.length; i++) {
          const e = this.searchList[i];
          if (e.groups.length == 0) {
            e.state = true;
          } else {
            e.state = false;
          }
        }
        this.searchData = this.searchList.slice(0, 5);
        if (this.searchList.length > 5) {
          this.showMore = true;
        } else {
          this.showMore = false;
        }
      })
    },
    deleteNumber() { //删除输入框的数字或文字
      this.inputNumber = null;
    },

    showAllresult() {
      this.searchData = this.searchList;
      this.showMore = false;
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
    padding-left: 0px;
    margin: 0;
    li {
      list-style: none;
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
    p:last-child,
    .state {
      font-size: 12px;
      color: #7a7777;
    }
  }
  .right {
    width: 20px;
    margin-right: 12px;
    align-items: center;
    display: flex;
    span:first-child {
      color: #11a1f5;
    }
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
  .setting {
    min-height: 40px;
    font-size: 16px;
    word-wrap: break-word;
    word-break: break-all;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d9d9d9;
  }
  .setting_all {
    color: #b1b4b7;
  }
  .setting_all,
  .setting_other {
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
    padding-left: 12px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    div {
      span {
        padding-right: 8px;
      }
    }
    .blue,
    .blue .icon-gouxuan {
      color: #11a1f5;
    }
  }
  .setting_ft {
    position: relative;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 40px;
    > div {
      flex: 1;
      color: #86898b;
      &:last-child {
        color: #6db5fd;
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

