<template>
  <div>
    <div :class="{change:true,blackBg:blackColor}" v-show="isShow">
      <div>
        <a :class="{disable:true,delete:deleteStock}"  :disabled="!deleteStock" @click="canDelete"><span>删除</span><span>{{total?'('+total+')':''}}</span></a>
      </div>
      <div>
        <a class="selectAll"  @click="allSelect">全选</a>
      </div>
      <div>
        <a class="opposite"  @click="contrast">反选</a>
      </div>
      <div>
        <a class="cancel" @click="cancel">取消</a>
      </div>
    </div>
    <div class="iosDialog" v-show="showSure">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog_bd">确认从所有分组中删除已选股票？</div>
        <div class="weui-dialog_ft">
          <div>
            <a @click="uncertain">取消</a>
          </div>
          <div>
            <a @click="determine">确定</a>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import { EventBus } from "../utils/EventBus.js";
export default {
  name: "StockEdit",
  data() {
    return {
      showSure: false, //模态框默认不显示
      blackColor: false
    };
  },
  props: ["isShow", "total"],
  created: function() {
    let that = this;
    EventBus.$on("changeSkin", function(data) {
      switch (data) {
        case "black":
          that.blackColor = true;
          break;
        case "white":
          that.blackColor = false;
          break;
      }
    });
  },
  computed: {
    deleteStock: function() {
      if (this.total > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    uncertain: function() {
      this.showSure = false;
    },
    determine: function() {
      // this.$emit("confirm");
      this.$emit("editHandle", "confirm");
      this.showSure = false;
    },
    canDelete: function() {
      if (this.deleteStock) {
        this.showSure = true;
      }
    },
    allSelect: function() {
      //全选
      // this.$emit("select");
      this.$emit("editHandle", "select");
    },
    contrast: function() {
      //反选
      // this.$emit("opposite");
      this.$emit("editHandle", "opposite");
    },
    cancel: function() {
      //取消--取消input和底部div
      // this.$emit("cancelEdit");
      this.$emit("editHandle", "cancelEdit");
    }
  }
};
</script>

<style scoped lang="scss">
$bgcolor: #2d6bb1;
.change {
  position: fixed;
  bottom: 0;
  display: flex;
  text-align: center;
  width: 100%;
  height: 40px;
  background-color: $bgcolor;
  > div {
    flex: 1;
    a {
      width: 50px;
      border: none;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      border-radius: 5px;
      padding: 0;
      margin-left: 12px;
      line-height: 40px;
    }
  }
  &.blackBg {
    background-color: #1d2127;
    .selectAll,
    .opposite,
    .cancel,
    .delete {
      background-color: #1d2127;
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
    font-size: 18px;
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
.selectAll,
.opposite,
.cancel {
  justify-content: center;
  align-items: center;
  background-color: $bgcolor;
  color: #f1f2f5;
}
.disable {
  justify-content: center;
  align-items: center;
  color: #c0c0bf;
}
.delete {
  justify-content: center;
  align-items: center;
  background-color: $bgcolor;
  color: #f1f2f5;
}
</style>
