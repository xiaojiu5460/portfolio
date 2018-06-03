<template>
 <div id="codeList">
            <table>
                <thead>
                    <tr>
                        <th class="edit">编辑</th>
                        <th class="new">最新价</th>
                        <th class="limit" style="padding-right:18px">涨跌幅</th>
                    </tr>
                </thead>
                <tbody v-for="(socks,index) in list" :key="index">
                    <tr>
                        <td class="socksName">{{socks.name}}
                            <p>{{socks.code}}</p>
                        </td>
                        <td class="socksPrice">{{socks.newPrice}}</td>
                        <td class="percent">{{socks.limitPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
export default {
  name: 'percent',
  data() {
      return{
        list: [{
                name: '陕西黑猫',
                code: '601015',
                newPrice: '7.91',
                limitPrice: '+3.94%'
            }, {
                name: '双一科技',
                code: '300690',
                newPrice: '34.42',
                limitPrice: '+4.05%'
            }, {
                name: '欧普照明',
                code: '603515',
                newPrice: '56.37',
                limitPrice: '+3.97%'
            }, {
                name: '南方传媒',
                code: '601900',
                newPrice: '11.17',
                limitPrice: '+3.14%'
            }, {
                name: '珠江啤酒',
                code: '002461',
                newPrice: '7.26',
                limitPrice: '+3.27%'
            }, {
                name: '雪 莱 特',
                code: '002076',
                newPrice: '6.44',
                limitPrice: '+6.45%'
            }, {
                name: '中国国旅',
                code: '601888',
                newPrice: '67.48',
                limitPrice: '-0.25%'
            }, {
                name: '星云股份',
                code: '300648',
                newPrice: '28.01',
                limitPrice: '-1.96%'
            }, {
                name: '法拉电子',
                code: '600563',
                newPrice: '48.20',
                limitPrice: '-0.58%'
            }, {
                name: '天目湖',
                code: '603136',
                newPrice: '40.48',
                limitPrice: '-1.39%'
            }, {
                name: '步森股份',
                code: '002569',
                newPrice: '18.01',
                limitPrice: '+4.35%'
            }]
        }},
  props: {
    
      }
    
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 只应用于局部非全局--> 
<style scoped>
#codeList {
            margin-left: 12px;
        }
        
        #codeList table {
            width: 100%;
            margin-right: 18px;
        }
        
        #codeList thead th {
            padding: 0;
            color: #93a1bb;
            font-weight: normal;
            line-height: 26px;
            font-size: 15px;
        }
        
        #codeList thead {
            border-bottom: 1px solid #f1f2f5;
        }
        
        #codeList tbody {
            padding: 0;
        }
        
        #codeList p {
            color: #686e71;
            font-size: 12px;
        }
        
        #codeList .edit,
        #codeList .socksName {
            text-align: left;
            padding: 0;
            width: 125px;
            letter-spacing: 1px;
        }
        
        .new,
        .socksPrice {
            padding: 0;
            float: right;
            text-align: right;
            width: 100%;
            line-height: 38px;
            margin-right: 16px;
        }
        
        .socksPrice {
            font-weight: 900;
        }
        
        .limit,
        .percent {
            text-align: right;
        }
        
        .percent {
            width: 78px;
            padding: 0 18px 0 0;
            background-color: #bc4104;
            color: #fff;
            border-radius: 3px;
        }
</style>
