## 问题 2018年5月30日22:31:55
- 整个项目的代码结构，没有组件拆分（组件化开发的思想）
- iPhone是双倍屏，某些Android是3倍屏（尺寸量大了）
- dom结构的组织不合理
- 为什么不用开发环境
- 怎么把本地的一个目录作为一个git项目提交到github
- normalize.css 把所有浏览器中不一致的默认值定义成一致


## 问题 2018年5月31日23:12:47
- placeholder 垂直不居中

## 问题 2018年6月3日22:38:27
- Header部分高度应该是45px，要减掉手机状态栏10px
- Header部分使用flex布局，去掉dom节点上所有的内联样式
- navigation部分激活状态的文字颜色才是蓝色，未激活状态的文字颜色是黑色（与股票名称颜色相同）
- navigation部分每个分组的文字左右有一点padding，与底部的蓝色border不是同等的宽度
- 编辑栏有border-bottom
- 组件命名首字母全部大写，包括组件名和组件的文件名（跟Header组件保持一致）
- percent命名换掉，这个名字不能概况整个组件的主要功能
- 配置SASS支持，接下来的CSS全部用SASS写
- 股票列表里面，应该是整个列表一个ul，一行一个li，不应该是一行一个ul。dom结构极不合理。

## 问题 2018年6月25日21:58:30
- script 只能引用js脚本 复用的地方import进去
- this在vue里指代vue唯一实例，会computed，methods，props，data里去查找
- import Vue from "vue";import VueResource from "vue-resource";Vue.use(VueResource); 整个程序的入口，和顺序考虑。
- stock
- map
- 取对象中key为中文的值时，格式为item['中文名']
