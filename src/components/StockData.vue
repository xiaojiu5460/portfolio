<template>
  <div class="container">
    <div class="price">
      <div>
        <span :class="{priceRed:true,priceGreen:false}">12.13</span>
      </div>
      <div class="flag" @click="flagClick">
        <span><i class="iconfont icon-china"></i></span><span class="lvOne">L1</span><span><i class="iconfont icon-dotsvertical"></i></span>
      </div>
      <div>
        <div class="weui" v-show="exchange" @click="cancel"></div>
        <div class="exchange" v-show="exchange">
          <ul>
            <li><div class="icon"><i class="iconfont icon-china"></i></div><div><span>上海交易所</span><p>股票</p></div></li>
            <li>
              <div>
                <span class="lvOne">L1</span><span>LV1基础行情</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="percent">
      <span class="posNag">+0.20</span><span class="per">+1.68%</span><span>高低压设备 -1.62%<i class="iconfont icon-ln_qianjin_b"></i></span>
    </div>
    <div class="inform">
      <div class="upInform">
        <div class="left">
          <p><span style="letter-spacing: 12px">今开</span><span>12.17</span></p>
          <p><span style="letter-spacing: 12px">昨收</span><span>11.93</span></p>
          <p><span>换手率</span><span>0.97%</span></p>
        </div>
        <div class="middle">
          <p><span style="letter-spacing: 12px">最高</span><span>12.45</span></p>
          <p><span style="letter-spacing: 12px">最低</span><span>11.94</span></p>
          <p><span>市盈TTM</span><span>43.17</span></p>
        </div>
        <div class="right">
          <p><span>成交量</span><span>8.39万手</span></p>
          <p><span>成交额</span><span>1.02亿</span></p>
          <p><span style="letter-spacing: 12px">市值</span><span>121亿</span></p>
        </div>
      </div>
      <div class="downInform" v-show="active">
        <div>
          <p><span style="letter-spacing: 12px">量比</span><span>2.40</span></p>
          <p><span style="letter-spacing: 12px">委比</span><span>17.21%</span></p>
          <p><span>涨停价</span><span>13.12</span></p>
          <p><span>跌停价</span><span>10.74</span></p>
        </div>
        <div>
          <p><span>市盈动</span><span>53.06</span></p>
          <p><span>市盈静</span><span>43.37</span></p>
          <p><span style="letter-spacing: 12px">均价</span><span>12.19</span></p>
          <p><span style="letter-spacing: 12px">振幅</span><span>4.27%</span></p>
        </div>
        <div>
          <p><span>流通市值</span><span>105亿</span></p>
          <p><span>市净率</span><span>3.98</span></p>
          <p><span style="letter-spacing: 12px">内盘</span><span>3.88万</span></p>
          <p><span style="letter-spacing: 12px">外盘</span><span>4.51万</span></p>
        </div>
      </div>
      <div class="icon">
        <i class="iconfont" :class="{'icon-xiangxia':!active,'icon-xiangshang':active}"  @click="show"></i>
        <!-- <i class="iconfont icon-xiangshang" v-show="up" @click="Up"></i> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      exchange: false,
      active: false
    };
  },
  methods: {
    flagClick: function() {
      this.exchange = true;
    },
    cancel: function() {
      this.exchange = false;
    },
    show: function() {
      // if(!this.active){
      //   this.active = true;
      // }else{
      //   this.active=false;
      // }
      this.active = !this.active;
      // this.down = false;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  background-color: #fff;
  .weui {
    position: fixed;
    top: 115px;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .exchange {
    position: absolute;
    background: #fff;
    top: 110px;
    right: 0;
    left: 0;
    border-top: solid 1px #f1f2f5;
    border-bottom: 1px solid #f1f2f5;
    ul {
      padding: 0;
      margin: 0;
      padding-left: 12px;
      li:last-child {
        line-height: 35px;
      }
      li {
        list-style: none;
        height: 35px;
        border-bottom: 1px solid #f1f2f5;
        font-size: 14px;
        display: flex;
        p {
          margin: 0;
          font-size: 12px;
          color: #888888;
        }
        .lvOne {
          width: 16px;
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          justify-content: center;
          align-items: center;
          background: #4489ff;
          color: #fff;
          margin-right: 5px;
        }
        .icon {
          line-height: 35px;
          .iconfont {
            color: #cf3237;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .price {
    margin: 10px auto 0 12px;
    display: flex;
    .flag {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      align-items: center;
      margin-right: 16px;
      .lvOne {
        width: 16px;
        height: 16px;
        font-size: 12px;
        margin-left: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #4489ff;
        color: #fff;
      }
      .icon-china {
        color: #cf3237;
        line-height: 16px;
      }
      .icon-dotsvertical {
        color: #dcdcdc;
      }
    }
    .priceRed {
      color: #dc0000;
      font-size: 30px;
    }
  }
  .percent {
    font-size: 14px;
    margin-left: 12px;
    height: 25px;
    display: flex;
    .posNag,
    .per {
      display: flex;
      align-items: center;
      color: #dc0000;
      width: 45px;
      line-height: 20px;
    }
    .per {
      padding-right: 25px;
    }
    span:last-child {
      display: flex;
      flex: 1;
      align-items: center;
      color: #9198a6;
      font-size: 12px;
      .iconfont {
        font-size: 10px;
      }
    }
  }
  .inform {
    margin: 0 12px;
    font-size: 14px;
    .icon {
      text-align: center;
      height: 12px;
      .iconfont {
        font-size: 10px;
      }
    }
    .upInform,
    .downInform {
      display: flex;
      justify-content: space-between;
      div {
        width: 32%;
        p {
          display: flex;
          margin: 0;
          font-size: 12px;
          line-height: 18px;
          span:first-child {
            color: #9198a6;
          }
          span:last-child {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

