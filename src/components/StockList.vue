<template>
 <div class="codeList">
    <div>
        <ul class="menu">
          <li class="edit">编辑</li>
          <li class="new" @click="sort('newPrice')">最新价<div><span class="up"></span><span class="down"></span></div></li>
          <li class="limit" @click="sort('percent')">涨跌幅<div><span class="up"></span><span class="down"></span></div></li>
        </ul>
    </div>
    <div>
        <ul class="allLists">
            <li  v-for="(stocks,index) in list" :key="index"  class="lists">
                <div class="stocksName">{{stocks.name}}<p>{{stocks.code}}</p></div>
                <div class="stocksPrice">{{stocks.newPrice}}</div>
                <div class="stocksPercent"><span v-bind:class="[stocks.colorState]">{{stocks.percent}}</span></div>
            </li>
        </ul>
    </div>
 </div>
</template>
<script>
export default {
  name: "stockList",
  data() {
    return {
      list: [],
      sortValue: "",
      sortDir: 1
      // isActive: true,
      // hasError: false
    };
  },
  props: ["stocks-list"],
  created: function() {
    // if(!this.stockList ||! this.stockList.length){ --当不传股票代码时列表不做处理。
    //   return;
    // }
    var url = `http://web.sqt.gtimg.cn/q=${this.stocksList.join(",")}`;
    var parse = str => {
      return ("" + str)
        .replace(/[;\s]+$/, "")
        .split(";")
        .map(item => {
          let temp = {};
          let values = ("" + item.split('="')[1]).split("~");
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
          percent: item["涨跌%"] + "%"
        };
        let per = parseFloat(item["涨跌%"]);
        if (per > 0) {
          l.colorState = "red"; //给上面l列表添加多个属性，在模板里可以直接读取
        } else if (per < 0) {
          l.colorState = "green";
        } else {
          l.colorState = "grey";
        }
        return l;
      });
    });
  },
  methods: {
    sort: function(field) {
      if(field!==this.sortValue){
        this.sortDir = 1;
        this.sortValue=field;
      }
      if (this.sortDir === 1) {
        this.sortDir = -1;
        this.list.sort(function(p1, p2) {
          return parseFloat(p1[field]) < parseFloat(p2[field]) ? 1 : -1;
        });
      } else {
        this.sortDir = 1;
        this.list.sort(function(p1, p2) {
          return parseFloat(p1[field]) < parseFloat(p2[field]) ? -1 : 1;
        });
      }
    }
    //如果parseInt("stocks.percent",10)>0,<0,=0的三种情况
    // isShow: function() {
    //   var price=this.item["涨跌%"] ;
    //   if (parseFloat(price) > 0) {
    //     return 1;
    //   } else if (parseFloat(price) < 0) {
    //     return 2;
    //   } else {
    //     return 0;
    //   }
    // }
  }
};
</script>

<style scoped>
.new div,
.limit div {
  width: 10px;
  padding-left: 5px;
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
.up.highLight,
.down.highLight {
  color: #666b61;
}
.allLists {
  padding: 0;
  margin: 0;
}
.allLists li {
  height: 40px;
}
.menu,
.lists {
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 16px 0 12px;
}
.menu {
  height: 30px;
  margin: 0;
  font-size: 14px;
  color: #a0abc3;
  border-bottom: 1px solid #f1f2f5;
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
.stocksPrice {
  font-weight: bold;
}
.limit,
.stocksPercent {
  display: flex;
  width: 30%;
  justify-content: flex-end;
  align-items: center;
}
.stocksName p {
  color: #686e71;
  font-size: 12px;
  margin: 0;
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
li {
  list-style: none;
}
</style>
