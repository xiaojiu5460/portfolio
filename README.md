# 自选股APP

标签（空格分隔）： VUE APP

---

### 简介
> 此款APP可实时查看个股行情、成交数据、资讯等。

### 功能分布
* 基本功能介绍：
    +  行情列表展示
        * 个股最新价、涨跌幅展示
        * 可编辑当前展示分组个股：删除、全选、反选、取消
    + Header拓展功能
        *  自选股自定义分组管理：系统分组、个人分组、添加分组
        *  换肤功能：黑白色
    +  热搜榜、股票查询记录
        * 热搜榜
        * 搜索股票增至不同分组
    +  个股交易数据展示
        * 现价、涨跌价、涨跌幅、今开、昨收、成交量、成交额、市值等信息
        * 五档、详情、大单
    +  资讯展示
        * 包括：新闻、公告、资金、简况、研报 
***
* 功能实现过程 :
***一、行情列表展示***
* 个股最新价、涨跌幅数据和颜色展示、价格和涨跌排序
1. 通过GET请求获取股票列表`list`
<br/>**数据接口**：http://sqt.gtimg.cn/utf8/q=${this.stocksList.join(",")}
<br/>**查询参数**：`q=${this.stocksList.join(",")}`(备:`stockList`为*查询代码列表*)
<br/>**响应内容格式**：文本格式;
<br/>**响应结果**：`res=`~000729~6.31~6.35~6.33~37621~20261~17357~6.31~1181~6.30~1228~6.29~99~6.28~137~6.27~151~6.33~588~6.34~341~6.35~454~6.36~787~6.37~207~15:00:04/6.31/161/S/101591/9530|14:56:57/6.31/55/S/34757/9445|14:56:45/6.33/7/B/4428/9437|14:56:42/6.32/4/B/2528/9435|14:56:39/6.32/10/B/6320/9433|14:56:36/6.32/20/S/12640/9431~20180920150045~-0.04~-0.63~6.37~6.30~6.31/37621/23844290~37621~2384~0.15~100.8;
<br/>**数据处理**：`tool.js`中的  **export parse()** 对res做数据处理；
<br/>**渲染数据格式**：`list=[
{name: "中金岭南", code: "000060", newPrice: "4.50", percent: "1.35%", code2: "sz000060", …},
{...}
]`
2. 价格、涨跌幅排序
<br/>**逻辑**：a、保存默认排序顺序(Object.assign())<br/>b、当传进的字段和上一次被点击的字段相同时，走下面正常排序方式，当不等于上次字段，则修改默认值为降序，并保存上次点击字段。
<br/>**实现**:
```
sort: function(field) {
    if (field !== this.sortValue) { //sortValue:''保存上个被点击的字段
     this.sortDir = 0;//sortDir: 0,保存降序默认值为1，点击排降序为1后，调整升序为-1
    this.sortValue = field;
      }
    if (this.sortDir === 1) {
      this.sortDir = -1;
      this.list.sort(function(p1, p2) {
        return parseFloat(p1[field]) < parseFloat(p2[field]) ? 1 : -1;
      });
    } else if (this.sortDir === -1) {
      this.sortDir = 0;
    // 把list的顺序恢复成stockList一样
      this.list = Object.assign([], this.defaultList);
    } else {
      this.sortDir = 1;
      this.list.sort(function(p1, p2) {
        return parseFloat(p1[field]) < parseFloat(p2[field]) ? -1 : 1;
        });
      }
    }
```
* 可编辑当前展示分组个股：删除(确认,取消)、全选、反选、取消。并弹窗确认删除与否
>  点击title的`编辑`按钮可展示底部功能按钮，四个按钮分别实现不同功能。
<br/>**删除**：无勾选时`disabled`；勾选时`highlight`，并显示*勾选数量*。勾选与否由渲染数据中`clickValue=true/false`决定，勾选数量也由此统计。
<br/>**确认&取消**：点击`确认`后**watch** stocklist列表变化并重新渲染；`取消`返回主界面(列表页面)
<br/>**全选**：修改`list`的`chickValue=true`，并显示*勾选数量*
<br/>**反选**：根据`全选`中`chickValue`状态做相反处理，并显示*勾选数量*
<br/>**取消**：返回主界面(列表页面)，编辑功能按钮隐藏

---
***二、Header拓展功能***
<br/> 1. 自选股自定义分组管理:系统分组/个人分组/添加分组(`locaLstorage读写`)
<br/>**系统分组**：主页面`created`时来读取locaLstorage做**全部分组**渲染,读取过程中判断系统分组内stock是否为空，若为空，渲染`默认给的stockList`去渲染;
<br/>**个人分组**：配合**添加分组**功能使用，增加分组后写入locaLstorage。
<br/>2. 颜色切换:子组件通过EventBus.$emit/$on通知兄弟组件和父组件同时切色

---
***三、热搜榜、股票查询记录***
1. 热搜榜
<br/>**接口地址**：`http://proxy.finance.qq.com/ifzqgtimg/appstock/app/HotStock/getHotStock`
<br/>**响应内容格式**：json
<br/>**响应结果**：res=
```
"code": 0,
"msg": "",
"data": [
    ["hk03690",     //market+code
    "美团点评-Ｗ",  //name
    "GP"],
    ["sz300104",
    "乐视网",
    "GP-A"],
    ...
]
```
<br/>**数据处理**：`res.data`
<br/>2. 搜索股票增至不同分组
<br/>**接口地址**：`http://proxy.finance.qq.com/ifzqgtimg/appstock/smartbox/search/get?q=${this.inputNumber}`
<br/>**查询参数**: `q=${this.inputNumber}` (定义inputNumber为input输入值)
<br/>**响应内容格式**：json
<br/>**响应结果**：res=
```
{
  "code": 0,
  "msg": "",
  "data": {
  "stock": [
    ["sh",            //market
     "600001",       //code
     "邯郸钢铁",    //name
     "hdgt",        //简称
     "GP-A"         //所属A股
    ]
  ],
  "sector": []
  }
}
```
<br/>**数据处理**：
```
this.searchList = (res.body.data.stock).filter(market => market[4] == "GP-A").map(v => {
            return {
              code: v[0] + v[1],  //market+code
              name: v[2],        //name
              groups: getGroupsByCode(v[0] + v[1]), // 调用ls.js获取分组
              market: v[0],    //matket
              state: true,     //true or false 切换是否勾选分组的icon状态
            }
          })
```
***
***四、个股交易数据展示***(点击个股展示detail详情页)
1. 现价、涨跌价、涨跌幅、今开、昨收、成交量、成交额、市值等信息

<br/>***接口与获取stockList的接口相同，结果也相同，处理结果***

<br/>**接口地址**:http://web.sqt.gtimg.cn/`q=${this.$route.query.code}`
<br/>**请求参数**：`q=${this.$route.query.code}`  //code为展示detail详情页跳转时获取到的股票代码
<br/>**响应内容格式**：文本格式;
<br/>**响应结果**：`res=`~000729~6.31~6.35~6.33~37621~20261~17357~6.31~1181~6.30~1228~6.29~99~6.28~137~6.27~151~6.33~588~6.34~341~6.35~454~6.36~787~6.37~207~15:00:04/6.31/161/S/101591/9530|14:56:57/6.31/55/S/34757/9445|14:56:45/6.33/7/B/4428/9437|14:56:42/6.32/4/B/2528/9435|14:56:39/6.32/10/B/6320/9433|14:56:36/6.32/20/S/12640/9431~20180920150045~-0.04~-0.63~6.37~6.30~6.31/37621/23844290~37621~2384~0.15~100.8;
<br/>**数据处理**：`tool.js`中的  **export parse()** 对res做数据处理；
<br/>**渲染数据格式**：`list=[
{name: "中金岭南", code: "000060", newPrice: "4.50", percent: "1.35%", code2: "sz000060", …},
{...}
]`

<br/>2. 五档、详情、大单
 <br/>**五档**：买卖各五档价格&成交量
 <br/>**详情**：买卖各五档每秒实时价格&每秒实时成交量
 <br/>**大单**：大单买卖盘`Echart`占比饼图
 
 <br/>**备注**：上述三项数据，均通过http://web.sqt.gtimg.cn/`q=${this.$route.query.code}`获取的res筛选需要的数据做格式化处理后渲染。
***

***五、资讯展示*** (新闻、公告、简况、研报...)
1. 新闻
<br/>**接口地址**：`http://220.249.243.51/ifzqgtimg/appstock/news/info/search?symbol=${this.stockcode}&page=1&n=5&type=3`
<br/>**请求参数**：`symbol=${this.stockcode}&page=1&n=5&type=3` //stockcode为从父组件传的当前需要detail的股票代码;symbol=股票代码;page=查第几页;n=每页新闻个数;type=固定值
<br/>**响应内容格式**：json
<br/>**响应结果**：
```
{
"code": 0,
"msg": "",
"data": {
"total_num": 9999,
"total_page": 2000,
"data": [{
    "time": "2018-09-11 13:51:26",    //新闻发布时间
    "id": "nesstock-20180911075214",  //每条新闻的识别id
    "type": "2",
    "symbol": "sh603080",
    "title": "天然气概念股再度拉升 河北4市拟上调天然气价格", //title
    "url": "http://stock.qq.com/a/20180911/075214.htm",  //url
    "newstype": "1",
    "src": "腾讯证券",
    "summary": "",
    "typeStr": "",
    "symbols": ["sh603080"]
  }],
"symbolsName": [{
    "symbol": "sh603080",
    "name": "新疆火炬",
    "logo": ""
  }]
 }
}
```
<br/>**数据处理**：`res.body.data.data`
<br/>2. 公告
<br/>**接口地址**：`http://220.249.243.51/ifzqgtimg/appstock/news/noticeList/searchByType?symbol=${this.stockcode}&page=1&n=20&noticeType=0`
<br/>**请求参数**： *参数同新闻模块参数一致*
<br/>**响应内容格式**：json
<br/>**响应结果**：
```
"code": 0,
"msg": "",
"data": {
  "total_num": 997,
  "total_page": 50,
  "data": [{
    "time": "2018-09-20 00:00:00",
    "id": "nos1205455743",
    "type": "0",
    "newstype": "01010503,010112,010115,01239999",
    "symbol": "sz300001",
    "title": "特锐德：关于参加青岛辖区上市公司投资者网上集体接待日活动的公告",
    "url": ""
  },{...},{...},...
}
```
<br/>**数据处理**：`res.body.data.data`
<br/>3. 简况
<br/>**接口地址**：`http://220.249.243.51/ifzqgtimg/appstock/app/stockinfo/jiankuang?code=${this.$route.query.code}`
<br/>**请求参数**：`code=${this.$route.query.code}` //code为展示detail详情页跳转时获取到的股票代码
<br/>**响应内容格式**：json
<br/>**响应结果**：*因简况界面数据较多，响应结果内容过多，下面展示一部分*
```
{
    "code": 0,
    "msg": "",
    "data": {
    "zyzb": {
        "date": "2018中报",
        "detail": {
          "date": "2018中报",  
          "mgsy": "0.1200元",  //每股收益
          "yysr": "26.37亿元", //营业收入
          "srzzl": "0.70%",    //营收同比
          "jlr": "1.23亿元",   //净利润
          "jlrzzl": "20.10%",  //净利润同比
          "mgjzc": "3.06元",   //每股净资产
          "syl": "45.66",      //收益率
          "sjl": "4.48"        //市净率
         }
    },
"gsjj": {},
"zysr": {},...
```
<br/>**数据处理**：`res.body.data`中取各部分所需渲染数据
<br/>4. 研报
<br/>**接口地址**：`http://220.249.243.51/ifzqgtimg/appstock/app/investRate/getReport?symbol=${this.stockcode}&page=0&n=20`
<br/>**请求参数**： *参数同新闻模块参数一致*
<br/>**响应内容格式**：json
<br/>**响应结果**：
```
{
   "code": 0,
   "msg": "OK",
   "data": {
     "total_num": 9999,
     "total_page": 500,
     "data": [{
       "id": "res3514293",
       "title": "【华金证券】新光药业:区域性中成药企业,主导品种全国首创",
       "time": "2016-10-28 00:00:00",
       "typeStr": "",
       "type": "1",
       "symbol": "sz300519",
       "url": "",
       "src": "",
      "summary": "",
      "symbols": ["sz300519"],
    "tzpj": ""
    },{...},{...},...
  }
 }
```
<br/>**数据处理**：`res.body.data.data`





