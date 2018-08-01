<template>
  <div>
    <div :class="{container:true,move:left}">
      <div class="icon">
        <i class="iconfont icon-fangdajing"></i>
      </div>
      <div class="search">
        <input type="text" placeholder="点击搜索股票/板块" @click="change">
      </div>
      <div class="more" @click="cancel">
        <span>取消</span>
      </div>
    </div>
    <div>
      <div class="searchCode">
        <span class="hot">热搜榜</span>
        <span class="allcode">全部榜单</span>
        <span class="icon">
          <i class="iconfont icon-ln_qianjin_b"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isShow: false,
      left: false,
    }
  },
  methods: {
    change: function () {
      this.left = true;
    },
    cancel: function () {
      if (this.left) {
        this.left = false;
      }
      this.$router.push({
        path: '/'
      })
    },
  },
}
</script>
<style scoped lang="scss">
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
.searchCode {
  display: flex;
  border-bottom: solid 1px #f3f0f0;
  height: 40px;
  .hot {
    margin: 5px 12px;
    width: 45%;
    font-size: 14px;
    font-weight: bold;
    align-items: center;
    display: flex;
  }
  .allcode {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    color: #479bf9;
    font-size: 12px;
    align-items: center;
  }
  .icon {
    width: 20px;
    margin: 5px 5px;
    align-items: center;
    display: flex;
    .iconfont {
      line-height: 20px;
      font-size: 12px;
      color: #479bf9;
    }
  }
}
</style>

