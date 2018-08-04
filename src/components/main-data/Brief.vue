<template>
    <div class="brief">
        <div class="indicant">
            <div class="briefTitle">
                <span>主要指标</span>
                <span>{{brief.detail.date}}</span>
            </div>
            <div class="addition">
                <div class="left">
                    <p>
                        <span>市盈TTM</span>
                        <span>{{brief.detail.syl}}</span>
                    </p>
                    <p>
                        <span>每股收益</span>
                        <span>{{brief.detail.mgsy}}</span>
                    </p>
                    <p>
                        <span>营业收入</span>
                        <span>{{brief.detail.yysr}}</span>
                    </p>
                    <p>
                        <span>净利润</span>
                        <span>{{brief.detail.jlr}}</span>
                    </p>
                </div>
                <div class="right">
                    <p>
                        <span>市净率</span>
                        <span>{{brief.detail.sjl}}</span>
                    </p>
                    <p>
                        <span>每股净资产</span>
                        <span>{{brief.detail.mgjzc}}</span>
                    </p>
                    <p>
                        <span>营收同比</span>
                        <span>{{brief.detail.srzzl}}</span>
                    </p>
                    <p>
                        <span>净利润同比</span>
                        <span>{{brief.detail.jlrzzl}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="introduction">
            <div class="briefTitle">
                <span>公司简介</span>
                <span></span>
            </div>
            <div>
                <div class="belongTo">
                    <div class="left">
                        <p>
                            <span>所属行业</span>
                        </p>
                        <p class="concept">
                            <span>所属概念</span>
                        </p>
                        <p>
                            <span>公司名称</span>
                        </p>
                        <p>
                            <span>上市日期</span>
                        </p>
                        <p>
                            <span>发行价格</span>
                        </p>
                        <p>
                            <span>所属地区</span>
                        </p>
                        <p>
                            <span>主营业务</span>
                        </p>
                    </div>
                    <div class="right">
                        <p>
                            <span v-if="zdf">{{zdf.name}}{{'('+plateZdf+')'}}</span>
                        </p>
                        <p class="belong">
                            <span v-for="(belong,index) in brief.concept" :key="'belong'+index">{{belong.name}}(0.00%)</span>
                        </p>
                        <p class="icon">
                            <span class="down" v-show="active" @click="moreInformation">查看更多
                                <i class="iconfont icon-xiangxia"></i>
                            </span>
                            <span class="up" v-show="!active" @click="lessInformation">收起
                                <i class="iconfont icon-xiangshang"></i>
                            </span>
                        </p>
                        <p>
                            <span>{{brief.gsjj.gsmz}}</span>
                        </p>
                        <p>
                            <span>{{brief.gsjj.riqi}}</span>
                        </p>
                        <p>
                            <span>{{brief.gsjj.jg}}</span>
                        </p>
                        <p>
                            <span>{{brief.gsjj.dy}}</span>
                        </p>
                        <p>
                            <span>{{brief.gsjj.yw}}</span>
                        </p>
                    </div>
                    <!-- <div>
                        <span>所属行业</span>
                        <span v-if="zdf">{{zdf.name}}{{'('+plateZdf+')'}}</span>
                    </div>
                    <div class="own">
                        <div>
                            <span>所属概念</span>
                            <span v-for="(belong,index) in brief.concept" :key="'belong'+index">{{belong.name}}(0.00%)</span>
                        </div>
                    </div>
                    <div>
                        <span>公司名称</span>
                        <span>{{brief.gsjj.gsmz}}</span>
                    </div>
                    <div>
                        <span>上市日期</span>
                        <span>{{brief.gsjj.riqi}}</span>
                    </div>
                    <div>
                        <span>发行价格</span>
                        <span>{{brief.gsjj.jg}}</span>
                    </div>
                    <div>
                        <span>所属地区</span>
                        <span>{{brief.gsjj.dy}}</span>
                    </div>
                    <div>
                        <span>主营业务</span>
                        <span>{{brief.gsjj.yw}}</span>
                    </div> -->
                </div>
            </div>
        </div>
        <div>
            <div class="briefTitle">
                <span>主营构成</span>
                <span>{{brief.zysr.date}}</span>
            </div>
            <div class="mainCamp">
                <ul>
                    <li>
                        <span class="form">收入构成</span>
                        <span class="income">营业收入(元)</span>
                        <span class="percent">占比</span>
                    </li>
                    <li v-for="(main,index) in brief.zysr.detail" :key="'main'+index">
                        <span class="form">{{main.sector}}</span>
                        <span class="income">{{main.income}}</span>
                        <span class="percent">{{main.zb+'%'}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="achievement">
            <div class="briefTitle">
                <span>业绩趋势</span>
                <span></span>
            </div>
            <div class="yjqs">
                <p class="trendtitle">
                    <span :class="{yysr:show=='营业收入',yySR:show!=='营业收入'}" @click="yysrchart(brief.hytrend)">营业收入</span>
                    <span :class="{jlr:true,JLR:show=='净利润'}" @click="jlrchart(brief.hytrend)">净利润</span>
                    <span :class="{mgsy:true,MGSY:show=='每股收益'}" @click="mgsychart">每股收益</span>
                </p>
                <div v-show="show=='营业收入'">
                    <p class="createvolume" v-for="(create,index) in brief.hytrend" :key="'create'+index">
                        <span class="years">{{create.date}}年报</span>
                        <span>{{create.yysr}}</span>
                        <span class="create">同比增长</span>
                        <span>{{create.t_yysr+'%'}}</span>
                    </p>
                </div>
                <div v-show="show=='净利润'">
                    <p class="jrlvolume" v-for="(jrl,index) in brief.hytrend" :key="'jrl'+index">
                        <span class="years">{{jrl.date}}年报</span>
                        <span>{{jrl.jlr}}</span>
                        <span class="create">同比增长</span>
                        <span>{{jrl.t_mgsy+'%'}}</span>
                    </p>
                </div>
                <div v-show="show=='每股收益'">
                    <p class="mgsyvolume" v-for="(mgsy,index) in brief.hytrend" :key="'mgsy'+index">
                        <span class="years">{{mgsy.date}}年报</span>
                        <span>{{mgsy.mgsy}}</span>
                        <span class="create">同比增长</span>
                        <span>{{mgsy.t_jlr+'%'}}</span>
                    </p>
                </div>
            </div>
            <div id="yysrchart" style="width:350px;height:160px;" v-show="show=='营业收入'"></div>
            <div id="jlrchart" style="width:350px;height:160px;" v-show="show=='净利润'"></div>
            <div id="mgsychart" style="width:350px;height:160px;" v-show="show=='每股收益'"></div>
        </div>
        <div class="holder">
            <div class="briefTitle">
                <span>股东股本</span>
                <span></span>
            </div>
            <div class="holdVolume">
                <p>
                    <span>总股本</span>
                    <span>{{brief.gdgb.zgb}}</span>
                </p>
                <p>
                    <span>流通股本</span>
                    <span>{{brief.gdgb.ltgb}}</span>
                </p>
                <p>
                    <span>股东人数</span>
                    <span>{{brief.gdgb.gdrs}}</span>
                </p>
                <p>
                    <span>人均持股</span>
                    <span>{{brief.gdgb.rjcg}}</span>
                </p>
                <p>
                    <span>前十大股东占比</span>
                    <span>{{brief.gdgb.gdzb+'%'}}</span>
                </p>
                <p>
                    <span>前十大流通股东占比</span>
                    <span>{{brief.gdgb.ltgdzb+'%'}}</span>
                </p>
            </div>
        </div>
        <div class="leader">
            <div class="briefTitle">
                <span>公司高管</span>
                <span></span>
            </div>
            <div>
                <div class="leaderPost">
                    <div class="lead">
                        <p>高管</p>
                        <p v-for="(leader,index) in brief.ggjj" :key="'leader'+index">{{leader.gg}}</p>
                    </div>
                    <div class="post">
                        <p>职务</p>
                        <p v-for="(leader,index) in brief.ggjj" :key="'leader'+index">{{leader.zw}}</p>
                    </div>
                    <div class="shares">
                        <p>持股数(股)</p>
                        <p v-for="(leader,index) in brief.ggjj" :key="'leader'+index">{{leader.cgs}}</p>
                    </div>
                    <div class="pay">
                        <p>薪酬(元)</p>
                        <p v-for="(leader,index) in brief.ggjj" :key="'leader'+index">{{leader.xc}}</p>
                    </div>
                </div>
                <div class="reduce">
                    <div class="lead">
                        <p>高管增减持</p>
                        <p v-for="(hold,index) in brief.ggzjc" :key="'hold'+index">{{hold.gg}}</p>
                    </div>
                    <div class="post">
                        <p>公告日期</p>
                        <p v-for="(hold,index) in brief.ggzjc" :key="'hold'+index">{{hold.date}}</p>
                    </div>
                    <div class="shares">
                        <p>变动量(股)</p>
                        <p v-for="(hold,index) in brief.ggzjc" :key="'hold'+index">{{hold.bdl}}</p>
                    </div>
                    <div class="pay">
                        <p>均价(元)</p>
                        <p v-for="(hold,index) in brief.ggzjc" :key="'hold'+index">{{hold.jj}}</p>
                    </div>
                </div>
            </div>
            <div class="shareBonus">
                <div class="briefTitle">
                    <span>分红配送</span>
                    <span></span>
                </div>
                <div class="bonus">
                    <div class="left">
                        <p>年度</p>
                        <p v-for="(bonus,index) in brief.fhsp" :key="'bonus'+index">{{bonus.nd}}</p>
                    </div>
                    <div class="middle">
                        <p>方案</p>
                        <p v-for="(bonus,index) in brief.fhsp" :key="'bonus'+index">10派{{bonus.fh}}</p>
                    </div>
                    <div class="right">
                        <p>除权日</p>
                        <p v-for="(bonus,index) in brief.fhsp" :key="'bonus'+index">{{bonus.date}}</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="briefTitle">
                    <span>行业对比({{zdf.name}})</span>
                    <span>2018一季报</span>
                </div>
                <div></div>
            </div>
        </div>

    </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
export default {
    data() {
        return {
            active: true,
            show: '营业收入',
        }
    },
    props: ["brief", "zdf"],
    created() {
        // console.log(this.brief.hytrend)
    },
    methods: {
        mgsychart: function () {
            this.show = '每股收益';
        },
        jlrchart: function (j) {
            this.show = '净利润';
            let myChart = echarts.init(document.getElementById('jlrchart'));
            let data = [];
            // var yMax=data.sort()[3];
            for (let index = 0; index < j.length; index++) {
                const element = j[index];
                // dataAxis.unshift(element.date);
                if (element.jlr.slice(-2) == "亿元") {
                    data.unshift(parseFloat(element.jlr))
                } else if (element.jlr.slice(-2) == "万元") {
                    data.unshift(parseFloat(element.jlr) / 10000)
                }
            }
            // console.log(data)
            let option = {
                color: ['#a20707', '#05a21a'],
                grid: {
                    bottom: '50%',
                    top: '3%',
                },
                xAxis: {
                    data: ['2014', '2015', '2016', '2017'],
                    axisLabel: { margin: 50, textStyle: { color: '#818182' } },
                    axisTick: { show: false },
                    axisLine: { lineStyle: { type: 'dashed', color: '#b9cce2', } },
                },
                yAxis: {
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { textStyle: { color: '#999' } },
                    min: 0,
                    minInterval: 50
                },
                series: [{
                    name: '净利润',
                    type: 'bar',
                    barWidth: 30,
                    barGap: '50%',
                    itemStyle: {
                        normal: { color: '#a20707', },
                        emphasis: { color: '#dc0000', },
                    },
                    data: data
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // console.log(JSON.stringify(option))
        },
        yysrchart: function (yysr) {
            this.show = '营业收入';
            let myChart = echarts.init(document.getElementById('yysrchart'));
            // var dataAxis = []; //年度
            let data = [];
            // var yMax=data.sort()[3];
            for (let index = 0; index < yysr.length; index++) {
                const element = yysr[index];
                // dataAxis.unshift(element.date);
                data.unshift(parseFloat(element.yysr))
            }
            var option = {
                grid: {
                    bottom: '13%',
                    top: '3%',
                },
                xAxis: {
                    data: ['2014', '2015', '2016', '2017'],
                    axisLabel: { textStyle: { color: '#818182' } },
                    axisTick: { show: false },
                    axisLine: { lineStyle: { type: 'dashed', color: '#b9cce2', } },
                },
                yAxis: {
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { textStyle: { color: '#999' } },
                    min: 0,
                    minInterval: 70
                },
                series: [{
                    name: '营业收入',
                    type: 'bar',
                    barWidth: 30,
                    barGap: '50%',
                    itemStyle: {
                        normal: { color: '#a20707', },
                        emphasis: { color: '#dc0000', },
                    },
                    data: data
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // console.log(JSON.stringify(option))
        },
        moreInformation: function () {
            this.active = false;
        },
        lessInformation: function () {
            this.active = true;
        }
    },
    computed: {
        plateZdf: function () {
            if (this.zdf.zdf > 0) {
                return "+" + (this.zdf.zdf) + "%";
            } else {
                return (this.zdf.zdf) + "%";
            }
        },
    }
}
</script>
<style scoped lang="scss">
li {
  list-style: none;
}
.brief {
  margin: 0;
  .briefTitle {
    border-bottom: solid 1px #d7e0ea;
    line-height: 30px;
    span {
      color: #2e6bb1;
      font-size: 12px;
      margin: 3px 12px;
    }
    span:last-child {
      float: right;
      line-height: 20px;
    }
  }
  .achievement {
    .yjqs {
      .trendtitle {
        font-size: 13px;
        width: 220px;
        text-align: center;
        display: flex;
        margin: 12px 20%;
        span {
          flex: 1;
          width: 33.3%;
          border: #2e6bb1 solid 1px;
          color: #2e6bb1;
          line-height: 25px;
          align-items: center;
        }
        .yysr,
        .JLR,
        .MGSY {
          background-color: #2e6bb1;
          color: #fff;
          //   border-top-left-radius: 3px;
          //   border-bottom-left-radius: 3px;
          border-right: 0;
        }
        .yySR {
          border-right: 0;
        }
        span:last-child {
          //   border-top-right-radius: 3px;
          //   border-bottom-right-radius: 3px;
          border-left: 0;
        }
      }
      .createvolume,
      .jrlvolume,
      .mgsyvolume {
        font-size: 12px;
        width: 278px;
        text-align: center;
        display: flex;
        margin: 12px 15%;
        span {
          flex: 1;
          width: 25%;
        }
        .years,
        .create {
          color: #a2a8ae;
        }
      }
    }
  }
  .addition {
    justify-content: space-between;
    display: flex;
    .left,
    .right {
      width: 50%;
      flex: 1;
      p {
        display: flex;
        margin: 3px 12px;
        font-size: 12px;
        line-height: 18px;
        span:last-child {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          font-size: 10px;
        }
      }
    }
  }
  .belongTo {
    margin: 5px 12px;
    font-size: 12px;
    display: flex;
    .left {
      width: 65px;
      .concept {
        padding-bottom: 43px;
      }
    }
    .right {
      flex: 1;
      .belong {
        height: 35px;
        overflow: hidden;
        margin: 0;
        span {
          color: darkturquoise;
          padding-right: 50px;
          line-height: 18px;
        }
      }
      .icon {
        margin: 3px 0;
        .down,
        .up {
          display: inline-block;
          color: #094775;
        }
      }
    }
  }
  .mainCamp {
    font-size: 12px;
    ul {
      margin: 5px 12px;
      padding: 0;
      li {
        display: flex;
        line-height: 20px;
        .form {
          width: 170px;
          overflow: hidden;
        }
        .income,
        .percent {
          flex: 1;
        }
        .percent {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
  .holdVolume {
    font-size: 12px;
    margin: 5px 12px;
    p {
      margin: 10px 0;
      display: flex;
      span:first-child {
        width: 120px;
      }
      span:last-child {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .leaderPost,
  .reduce {
    display: flex;
    font-size: 12px;
    margin: 5px 12px;
    .lead {
      width: 70px;
    }
    .post {
      flex: 1;
    }
    .shares {
      width: 80px;
      p {
        display: flex;
        justify-content: flex-end;
      }
    }
    .pay {
      width: 50px;
      p {
        display: flex;
        justify-content: flex-end;
      }
    }
    p:first-child {
      color: rgb(68, 66, 66);
    }
    p {
      margin: 5px 0;
    }
  }
  .bonus {
    display: flex;
    font-size: 12px;
    margin: 5px 12px;
    .left {
      width: 70px;
    }
    .middle {
      flex: 1;
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      p:first-child {
        margin-bottom: 0;
      }
    }
    p:first-child {
      color: rgb(68, 66, 66);
    }
    p {
      margin: 5px 0;
    }
  }
}
</style>
