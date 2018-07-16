<template>
 <div :class="{codeList:true,blackBg:blackColor}">
  <div>
    <ul class="menu">
      <li class="edit" @click="onClick"><i class="iconfont icon-iconfontzhizuobiaozhunbduan10"></i>编辑</li>
      <li class="new" @click="sort('newPrice')">最新价<div><span :class="{up:true,upHighLight:upLight('newPrice')}"></span><span :class="{down:true,downHighLight:downLight('newPrice')}" ></span></div></li>
      <li class="limit" @click="sort('percent')">涨跌幅<div><span :class="{up:true,upHighLight:upLight('percent')}"></span><span :class="{down:true,downHighLight:downLight('percent')}"></span></div></li>
    </ul>
  </div>
  <div>
    <ul class="allLists">
        <li  v-for="(stock,index) in list" :key="index"  class="lists" @click="getStockCode(stock)">
          <div  v-show="isShow" class="check">
            <input type="checkbox" v-model="stock.checkboxValue">
          </div>
          <div class="stocksName">{{stock.name}}<p>{{stock.code}}</p></div>
          <div class="stocksPrice">{{stock.newPrice}}</div>
          <div class="stocksPercent"><span v-bind:class="[stock.colorState]">{{stock.percent}}</span></div>
        </li>
    </ul>
  </div>
  <StockEdit :isShow="isShow" :total="total" v-on:editHandle="editHandle"></StockEdit>
 </div>
</template>
<script>
import StockEdit from "./StockEdit.vue";
import { EventBus } from "../utils/EventBus.js";
export default {
  name: "StockList",
  components: {
    StockEdit
  },
  data() {
    return {
      list: [],
      defaultList: [],
      sortValue: "", //保存上个被点击的字段
      sortDir: 0, //保存降序默认值为1，点击排降序为1后，调整升序为-1
      isShow: false, //input默认不显示
      blackColor: false
    };
  },
  props: ["stocks-list"],
  watch: {
    //对prop传值过来的数据修改监听
    stocksList: function() {
      // console.log(this.stocksList)
      this.updateData(); //这里也要对请求来的数据继续处理
    }
  },
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
    this.updateData();
  },
  computed: {
    total: function() {
      var sum = 0;
      for (var index = 0; index < this.list.length; index++) {
        var stock = this.list[index];
        if (stock.checkboxValue) {
          sum = sum + 1;
        }
      }
      return sum;
      // console.log(sum);
    }
  },
  methods: {
    //获取当前被点击的股票代码
    getStockCode: function(stock) {
      this.$router.push({
        path: "detail",
        query: {code:stock.code2},
      });
      // console.log(stock.code2);
    },
    editHandle: function(data) {
      // console.log(data)
      switch (data) {
        case "confirm":
          //确定要删除股票的click事件
          this.$emit("child-mes", this.mes()); //自定义事件，通知到父组件
          this.showSure = false; //模态框不显示
          this.isShow = false; //input不显示
          break;
        case "select":
          for (let index = 0; index < this.list.length; index++) {
            let stock = this.list[index];
            stock.checkboxValue = true;
          }
          break;
        case "opposite":
          for (let index = 0; index < this.list.length; index++) {
            let stock = this.list[index];
            if (stock.checkboxValue) {
              stock.checkboxValue = false;
            } else {
              stock.checkboxValue = true;
            }
          }
          break;
        case "cancelEdit":
          for (let index = 0; index < this.list.length; index++) {
            let stock = this.list[index];
            stock.checkboxValue = false;
          }
          this.isShow = false; //input不显示
          break;
      }
    },
    mes: function() {
      //获取被选中checkboxValue为true的列表
      let seletedStocks = this.list.filter(function(item) {
        return item.checkboxValue === true;
      });
      return seletedStocks;
    },
    //updateData函数封装：对请求来的数据做转换处理
    updateData: function() {
      // --当不传股票代码时列表不做处理。
      if (!this.stocksList || !this.stocksList.length) {
        this.list = []; //因为并没有修改列表已经渲染出来的界面，要恢复空值（什么都不渲染）
        return;
      }
      var url = `http://web.sqt.gtimg.cn/q=${this.stocksList.join(",")}`;
      var parse = str => {
        return ("" + str)
          .replace(/[;\s]+$/, "")
          .split(";")
          .map(item => {
            let temp = {};
            let values = ("" + item.split('="')[1]).split("~");
            let code = item.split('="')[0].split("_")[1];
            [
              "X1",
              "名字",
              "代码",
              "当前价格",
              "昨收",
              "今开",
              "成交量",
              "外盘",
              "内盘",
              "买一",
              "买一量",
              "买二",
              "买二量",
              "买三",
              "买三量",
              "买四",
              "买四量",
              "买五",
              "买五量",
              "卖一",
              "卖一量",
              "卖二",
              "卖二量",
              "卖三",
              "卖三量",
              "卖四",
              "卖四量",
              "卖五",
              "卖五量",
              "最近逐笔成交",
              "时间",
              "涨跌",
              "涨跌%",
              "最高",
              "最低",
              "价格/成交量/成交额",
              "成交量",
              "成交额",
              "换手率",
              "市盈率",
              "X2",
              "最高",
              "最低",
              "振幅",
              "流通市值",
              "总市值",
              "市净率",
              "涨停价",
              "跌停价"
            ].forEach(name => {
              temp[name] = values.shift() || "";
            });
            temp["最近逐笔成交"] = ("" + temp["最近逐笔成交"]).split("|");
            temp["市场代码"] = code;
            return temp;
          });
      };
      this.$http.get(url).then(function(res) {
        // console.log(res);
        let data = parse(res.body);
        // console.log(data);
        this.list = data.map(function(item) {
          //map 从处理过的对象里取出需要的值，列入一个数组赋值给list
          let l = {
            name: item["名字"],
            code: item["代码"],
            newPrice: item["当前价格"],
            percent: item["涨跌%"] + "%",
            code2: item["市场代码"]
          };
          let per = parseFloat(item["涨跌%"]);
          if (per > 0) {
            l.colorState = "red"; //给上面l列表添加多个属性，在模板里可以直接读取
          } else if (per < 0) {
            l.colorState = "green";
          } else {
            l.colorState = "grey";
          }
          l.checkboxValue = false;
          return l;
        });
        this.defaultList = Object.assign([], this.list);
        // this.defaultList = JSON.stringify(this.list);
        // let a =1;
      });
    },

    onClick: function() {
      //编辑按钮
      this.isShow = true; //input显示
    },
    //切换上下高亮颜色
    upLight: function(field) {
      if (this.sortDir === 1 && field === this.sortValue) {
        return true;
      }
    },
    downLight: function(field) {
      if (this.sortDir === -1 && field === this.sortValue) {
        return true;
      }
    },
    sort: function(field) {
      if (field !== this.sortValue) {
        //当传进的字段和上一次被点击的字段相同时，走下面正常排序方式，当不等于上次字段，则修改默认值为降序，并保存上次点击字段。
        this.sortDir = 0;
        this.sortValue = field;
      }
      if (this.sortDir === 1) {
        this.sortDir = -1;
        this.list.sort(function(p1, p2) {
          return parseFloat(p1[field]) < parseFloat(p2[field]) ? 1 : -1;
        });
      } else if (this.sortDir === -1) {
        this.sortDir = 0;
        // 恢复 TODO
        // 把list的顺序恢复成stockList一样
        // this.list = JSON.parse(this.defaultList);
        this.list = Object.assign([], this.defaultList);
      } else {
        this.sortDir = 1;
        this.list.sort(function(p1, p2) {
          return parseFloat(p1[field]) < parseFloat(p2[field]) ? -1 : 1;
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
$bgcolor: #2d6bb1;
.codeList {
  // min-height: 100%;
  .allLists {
    padding: 0;
    margin: 0;
    margin-bottom: 40px;
    li {
      height: 40px;
      list-style: none;
      .check {
        padding: 0 5px 5px 0;
      }
      .stocksPrice {
        font-weight: bold;
      }
      .stocksName p {
        color: #686e71;
        font-size: 12px;
        margin: 0;
      }
    }
  }
  .menu {
    height: 30px;
    margin: 0;
    font-size: 14px;
    color: #a0abc3;
    border-bottom: 1px solid #f1f2f5;
  }
  .menu,
  .lists {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 0 16px 0 12px;
  }
  .edit,
  .stocksName {
    width: 48%;
  }
  .new,
  .stocksPrice {
    display: flex;
    width: 22%;
    justify-content: flex-end;
    align-items: center;
  }
  .limit,
  .stocksPercent {
    display: flex;
    width: 30%;
    justify-content: flex-end;
    align-items: center;
  }
  .new div,
  .limit div {
    width: 10px;
    padding-left: 5px;
  }
  input[type="checkbox"] {
    width: 12px;
    height: 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    position: relative;
  }
  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
  }
  input[type="checkbox"]:checked::before {
    content: "\2713";
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid $bgcolor;
    color: $bgcolor;
    font-size: 12px;
    font-weight: bold;
  }
  &.blackBg {
    background-color: #101419;
    .menu {
      color: #676d79;
      border-bottom: 1px solid #101419;
    }
    .stocksName,
    .stocksPrice {
      color: #fff;
    }
    input[type="checkbox"]::before {
      background-color: #676d79;
      border: 1px solid #676d79;
    }
    input[type="checkbox"]:checked::before {
      background-color: #676d79;
    }
  }
}
.up {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 5px solid #abbfe6;
  height: 0;
  width: 0;
  color: #abbfe2;
  display: block;
  margin-bottom: 4px;
}
.down {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #abbfe2;
  height: 0;
  width: 0;
  color: #abbfe2;
  display: block;
  margin-top: 4px;
}
.upHighLight {
  border-bottom: 5px solid #666b61;
}
.downHighLight {
  border-top: 5px solid #666b61;
}
.red {
  width: 68px;
  height: 27px;
  background-color: #bc4104;
  color: #fff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.green {
  width: 68px;
  height: 27px;
  background-color: #508d46;
  color: #fff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grey {
  width: 68px;
  height: 27px;
  background-color: #abafba;
  color: #fff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
