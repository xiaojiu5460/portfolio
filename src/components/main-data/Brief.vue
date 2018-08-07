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
                    <div class="own">
                        <div class="belong">所属行业</div>
                        <div v-if="zdf">
                            <span class="belongName">{{zdf.name}}</span>
                            <span v-bind:class="[zdf.color]">{{'('+plateZdf+')'}}</span>
                        </div>
                    </div>
                    <div class="own">
                        <div class="belong">所属概念</div>
                        <div class="concept">
                            <div :class="{msg:true,msgAuto:msgAuto}">
                                <div class="message" v-for="(belong,index) in brief.concept" :key="'belong'+index">
                                    <span class="belongName">{{belong.name}}</span>(0.00%)</div>
                            </div>
                            <div class="icon" v-show="showIcon(brief.concept)">
                                <span class="down" v-show="!msgAuto" @click="moreInformation(brief.concept)">查看更多
                                    <i class="iconfont icon-xiangxia"></i>
                                </span>
                                <span class="up" v-show="msgAuto" @click="lessInformation">收起
                                    <i class="iconfont icon-xiangshang"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="own">
                        <div class="belong">公司名称</div>
                        <div>{{brief.gsjj.gsmz}}</div>
                    </div>
                    <div class="own">
                        <div class="belong">上市日期</div>
                        <div>{{brief.gsjj.riqi}}</div>
                    </div>
                    <div class="own">
                        <div class="belong">发行价格</div>
                        <div>{{brief.gsjj.jg}}</div>
                    </div>
                    <div class="own">
                        <div class="belong">所属地区</div>
                        <div>{{brief.gsjj.dy}}</div>
                    </div>
                    <div class="own">
                        <div class="belong">主营业务</div>
                        <div>{{brief.gsjj.yw}}</div>
                    </div>
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
                    <span :class="{yysr:show=='营业收入',yySR:show!=='营业收入'}" @click="yysrChart">营业收入</span>
                    <span :class="{jlr:true,JLR:show=='净利润'}" @click="jlrChart">净利润</span>
                    <span :class="{mgsy:true,MGSY:show=='每股收益'}" @click="mgsyChart">每股收益</span>
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
            <div id="yysrChart" style="width:350px;height:160px;" v-show="show=='营业收入'"></div>
            <div id="jlrChart" style="width:350px;height:160px;" v-show="show=='净利润'"></div>
            <div id="mgsyChart" style="width:350px;height:160px;" v-show="show=='每股收益'"></div>
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
let echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/chart/bar');
export default {
    data() {
        return {
            show: '营业收入',
            msgAuto: false,
        }
    },
    props: ["brief", "zdf"],
    created() {
        // console.log(this.brief.hytrend)
    },
    mounted() {
        this.echart('营业收入');
    },
    methods: {
        mgsyChart: function () {
            this.show = '每股收益';
            this.echart('每股收益');
        },
        jlrChart: function () {
            this.show = '净利润';
            this.echart('净利润');
            // let that = this;
        },
        yysrChart: function () {
            this.show = '营业收入';
            this.echart('营业收入');
        },
        echart: function (type) {
            let that = this;
            let myYysrChart = echarts.init(document.getElementById('yysrChart'));
            let myJlrChart = echarts.init(document.getElementById('jlrChart'));
            let myMgsyChart = echarts.init(document.getElementById('mgsyChart'));
            let data = [];
            let option = {
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
                    min: min,
                    axisLabel: { textStyle: { color: '#999' } },
                    minInterval: Math.max(...data.map(v => Math.abs(v))),
                },
            }
            console.log(data)
            //刻度起点
            let min = function () {
                if (Math.min.apply(null, data) >= 0) {
                    return 0
                } else {
                    return Math.min.apply(null, data).toFixed(2)
                }
            }
            //数组data映射对象数组 过程增加属性

            if (type == '营业收入') {
                // console.log(that.brief.hytrend)
                for (let index = 0; index < that.brief.hytrend.length; index++) {
                    const element = that.brief.hytrend[index];
                    data.unshift(parseFloat(element.yysr))
                }
                myYysrChart.clear();
                option = {
                    grid: {
                        bottom: '13%',
                        top: '3%',
                        left: '13%',
                    },
                    xAxis: option.xAxis,
                    yAxis: option.yAxis,
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
                myYysrChart.setOption(option);
            } else if (type == '净利润') {
                for (let index = 0; index < that.brief.hytrend.length; index++) {
                    const element = that.brief.hytrend[index];
                    // dataAxis.unshift(element.date);
                    if (element.jlr.slice(-2) == "亿元") {
                        data.unshift(parseFloat(element.jlr))
                    } else if (element.jlr.slice(-2) == "万元") {
                        data.unshift(parseFloat(element.jlr) / 10000)
                    }
                }
                let d = data.map(function (value) {
                    let item = {
                        value: value,
                        itemStyle: {
                            color: ''
                        },
                        emphasis: {
                            itemStyle: {
                                color: ''
                            }
                        }
                    }
                    if (value > 0) {
                        item.itemStyle.color = '#a20707'
                        item.emphasis.itemStyle.color = '#dc0000'
                    } else {
                        item.itemStyle.color = 'green'
                        item.emphasis.itemStyle.color = 'green'
                    }
                    return item;
                })
                myJlrChart.clear();
                option = {
                    grid: {
                        bottom: '40%',
                        top: '3%',
                        left: '15%',
                    },
                    xAxis: option.xAxis,
                    yAxis: option.yAxis,
                    series: [{
                        name: '净利润',
                        type: 'bar',
                        barWidth: 30,
                        barGap: '50%',
                        data: d,
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myJlrChart.setOption(option);
            } else {
                for (let index = 0; index < that.brief.hytrend.length; index++) {
                    const element = that.brief.hytrend[index];
                    data.unshift(parseFloat(element.mgsy))
                }
                let d = data.map(function (value) {
                    let item = {
                        value: value,
                        itemStyle: {
                            color: ''
                        },
                        emphasis: {
                            itemStyle: {
                                color: ''
                            }
                        }
                    }
                    if (value > 0) {
                        item.itemStyle.color = '#a20707'
                        item.emphasis.itemStyle.color = '#dc0000'
                    } else {
                        item.itemStyle.color = 'green'
                        item.emphasis.itemStyle.color = 'green'
                    }
                    return item;
                })
                myMgsyChart.clear();
                option = {
                    grid: {
                        bottom: '40%',
                        top: '3%',
                    },
                    xAxis: option.xAxis,
                    yAxis: option.yAxis,
                    series: [{
                        name: '净利润',
                        type: 'bar',
                        barWidth: 30,
                        barGap: '50%',
                        data: d
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                myMgsyChart.setOption(option);
            }
        },
        moreInformation: function () {
            this.msgAuto = true;
        },
        lessInformation: function () {
            this.msgAuto = false;
        },
        showIcon: function (concept) {
            if (concept.length > 2) {
                return true;
            }
        },
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
    flex-direction: column;
    line-height: 20px;
    .own {
      display: flex;
      .belong {
        width: 60px;
      }
      .belongName {
        color: #10c8cacf;
      }
      .red {
        color: #e6311d;
      }
      .green {
        color: #0b9c11;
      }
      div:last-child {
        flex: 1;
      }
      .msg {
        height: 40px;
        overflow: hidden;
        .message {
          width: 50%;
          display: inline-block;
          line-height: 20px;
        }
        &.msgAuto {
          height: auto;
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
