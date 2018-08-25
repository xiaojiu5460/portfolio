<template>
  <div>
    <div class="group">
      <div class="finish" @click="previous">
        <span>完成</span>
      </div>
      <span class="manage">分组管理</span>
    </div>
    <div class="groupList">
      <div class="already">
        <span class="title">已有分组</span>
        <span class="func">点击分组重命名 | 长按拖动排序</span>
      </div>
      <div class="groups">
        <div class="all">
          <div>
            <span>全部</span>
            <span>系统分组</span>
          </div>
        </div>
        <div class="customize" v-for="(group,index) in groups" :key="'group'+index" v-if="groups">
          <div>
            <span>{{group}}</span>
            <span>个人分组</span>
          </div>
          <div class="delete" @click="showDialog(group)">
            <span style="color: #d00b0b">
              <i class="iconfont icon-shanchu1"></i>
            </span>
          </div>
        </div>
        <div class="addGroup" @click="addNewGroup">
          <p>
            <i class="iconfont icon-tianjia1"></i>添加分组
          </p>
        </div>
      </div>
      <div class="iosDialog" v-show="deleteClick">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
          <div class="weui-dialog_bd">确认删除该分组及分组内所有股票？</div>
          <div class="weui-dialog_certain" @click="changeState">
            <span>
              <i class="iconfont" :class="{'icon-weigouxuan':groupState,'icon-gouxuan':!groupState}"></i>
            </span>
            <span>
              其他分组内也同时删除
            </span>
          </div>
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
      <div class="iosDialog" v-show="addGroup">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
          <div class="weui-dialog_bd">请输入分组名称</div>
          <div class="weui-dialog_certain"><input type="text" placeholder="最多六个字" v-model="inputName"></div>
          <div class="weui-dialog_ft">
            <div @click="uncertain">
              <a>取消</a>
            </div>
            <div @click="finalAddGroup">
              <a>确定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addGroup, getLsGroup, getStocksByGroup, getAllGroupInfo, deleteGroupByName, deleteStocksFromGroup } from "../utils/ls.js";
export default {
  name: "GroupManage",
  props: ["showManage"],
  data() {
    return {
      groupList: null,
      deleteClick: false,
      addGroup: false,
      inputName: null,
      groups: null,
      clickName: null,
      groupState: true,
    }
  },
  created() {
    //从ls读group做渲染
    this.groups = getLsGroup().slice(1);
  },
  methods: {
    changeState() {
      if (this.groupState) {
        this.groupState = false;
      } else {
        this.groupState = true;
      }
    },
    previous: function () {
      this.$router.push({
        path: history.back()
      })
    },
    addNewGroup() {
      this.inputName = '';
      this.addGroup = true;
    },
    finalAddGroup() {
      addGroup(this.inputName);
      this.addGroup = false;
      this.groups = getLsGroup().slice(1);
    },
    showDialog(g) {
      this.deleteClick = true;
      this.clickName = g;
    },
    uncertain() {
      this.deleteClick = false;
      this.addGroup = false;
    },
    determine() {
      //根据inputName的不同来清理ls
      let groupList = getStocksByGroup(this.clickName);
      this.deleteClick = false;
      let g = getAllGroupInfo();
      if (!this.groupState) {
        for (let i = 0; i < g.length; i++) {
          const e = g[i];
          deleteStocksFromGroup(e, groupList.code);
          // localStorage.setItem('group', JSON.stringify(g))
          // const a = g[i].group;
          // const b = g[i].code;
          // deleteStocksFromGroup(g[i], codeList.code);
          // for (let j = 0; j < codeList.code.length; j++) {
          //   const e = codeList.code[j];
          //   let index = b.indexOf(e);
          //   if (index != -1) {
          //     b.splice(index, 1)
          //   }
          // }
          // if (a == this.clickName) {
          //   g.splice(i, 1)
          // }
        }
      }
      localStorage.setItem('group', JSON.stringify(g))
      deleteGroupByName(this.clickName)
      this.groups = getLsGroup().slice(1);
    },
  },
};
</script>

<style scoped lang="scss">
.group {
  background-color: #2d6bb1;
  height: 45px;
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0 12px;
  .finish {
    margin: 0;
    width: 30px;
    align-items: center;
    font-size: 14px;
    height: 100%;
    display: flex;
  }
  .manage {
    flex: 1;
    display: flex;
    justify-content: center;
  }
}
.groupList {
  margin: 5px 12px;
  .already {
    margin: 5px 0;
    display: flex;
    .title {
      width: 70px;
      font-weight: bold;
    }
    .func {
      font-size: 13px;
      color: #c5c6ca;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
.groups {
  display: flex;
  flex-wrap: wrap;
  .all,
  .customize,
  .addGroup {
    margin: 5px;
    width: 29%;
    border: #f3f1f1 solid 1px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        font-size: 14px;
      }
      span:last-child {
        color: #c5c6ca;
        font-size: 10px;
      }
    }
  }
  .customize {
    position: relative;
    .delete {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
  .addGroup {
    font-size: 14px;
    color: #2d6bb1;
    background-color: #ecebeb;
    .iconfont {
      font-size: 10px;
      padding-right: 5px;
    }
  }
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
  width: 80%;
  max-width: 300px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  .weui-dialog_bd,
  .weui-dialog_certain {
    min-height: 40px;
    font-size: 14px;
    word-wrap: break-word;
    word-break: break-all;
    height: 40px;
    line-height: 40px;
    .icon-gouxuan {
      color: #11a1f5;
    }
  }
  .weui-dialog_certain {
    border-bottom: 1px solid #d9d9d9;
    color: #808080;
    input {
      width: 88%;
      margin-left: 11px;
      margin-right: 11px;
      background-color: #ece8e8;
      border: 0;
      height: 2em;
      font-size: 10px;
    }
  }
  .weui-dialog_bd {
    line-height: 60px;
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
      &:last-child {
        border-left: 1px solid #d9d9d9;
        color: #6db5fd;
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
