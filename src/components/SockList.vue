<template>
 <div class="codeList">
    <div>
        <ul class="menu">
          <li class="edit">编辑</li>
          <li class="new">最新价<div><span class="up"></span><span class="down"></span></div></li>
          <li class="limit">涨跌幅<div><span class="up"></span><span class="down"></span></div></li>
        </ul>
    </div>
    <div>
        <ul class="allLists">
            <li  v-for="(socks,index) in list" :key="index"  class="lists">
                <div class="socksName">{{socks.name}}<p>{{socks.code}}</p></div>
                <div class="socksPrice">{{socks.newPrice}}</div>
                <div class="socksPercent"><span :class="{red:isActive,green:hasError}">{{socks.limitPrice}}</span></div>
            </li>
        </ul>
    </div>
 </div>
</template>
<script src="../../sock-price.html"></script>
<script>
import Vue from "vue";
import VueResource from "vue-resource";
Vue.use(VueResource);
export default {
  name: "SockList",
  data() {
    return {
      list: [
        {
          name: "陕西黑猫",
          code: "601015",
          newPrice: "7.91",
          limitPrice: "+3.94%"
        },
        {
          name: "双一科技",
          code: "300690",
          newPrice: "34.42",
          limitPrice: "+4.05%"
        },
        {
          name: "欧普照明",
          code: "603515",
          newPrice: "56.37",
          limitPrice: "+3.97%"
        },
        {
          name: "南方传媒",
          code: "601900",
          newPrice: "11.17",
          limitPrice: "+3.14%"
        },
        {
          name: "珠江啤酒",
          code: "002461",
          newPrice: "7.26",
          limitPrice: "+3.27%"
        },
        {
          name: "雪 莱 特",
          code: "002076",
          newPrice: "6.44",
          limitPrice: "+6.45%"
        },
        {
          name: "中国国旅",
          code: "601888",
          newPrice: "67.48",
          limitPrice: "-0.25%"
        },
        {
          name: "星云股份",
          code: "300648",
          newPrice: "28.01",
          limitPrice: "-1.96%"
        },
        {
          name: "法拉电子",
          code: "600563",
          newPrice: "48.20",
          limitPrice: "-0.58%"
        },
        {
          name: "天目湖",
          code: "603136",
          newPrice: "40.48",
          limitPrice: "-1.39%"
        },
        {
          name: "步森股份",
          code: "002569",
          newPrice: "18.01",
          limitPrice: "+4.35%"
        }
      ],
      isActive: true,
      hasError: false
    };
  },
  props: ['list'],
  created: function() {
    this.$http
      .get(this.url)
      .then(function(res) {
        var sockList = this.parseData(res);
        this.data.list = sockList; //map 从处理过的对象里取出需要的值，列入一个数组赋值给list
      });
  },
  methods: {
    parseData: function() {
      var stock = [
        "sh000001",
        "sz300001",
        "sh600180",
        "sz000729",
        "sz000001",
        "sz300540",
        "sh600150"
      ];
      var url = `http://web.sqt.gtimg.cn/q=${this.stock.join(",")}`;
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
      $.get(url).done(res => {
        console.log(res);
        var data = parse(res);
        console.log(data);
      });
    }
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
  border-bottom: 5px solid #abbfe2;
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
  overflow-x: scroll;
  overflow-y: hidden;
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
.socksName {
  width: 48%;
}
.new,
.socksPrice {
  display: flex;
  width: 22%;
  justify-content: flex-end;
  align-items: center;
}
.socksPrice {
  font-weight: bold;
}
.limit,
.socksPercent {
  display: flex;
  width: 30%;
  justify-content: flex-end;
  align-items: center;
}
.socksName p {
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
  background-color: #bc4104;
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
