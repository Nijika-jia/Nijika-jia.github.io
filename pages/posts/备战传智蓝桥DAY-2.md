---
layout: post
title: 备战传智蓝桥DAY-2
date: 2025-02-08 14:33:22
tags: 
    - 算法
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-2_2025-02-08-20-15-49.png
---

### 🎯 **今日目标**
- [ ] 💻 **目标1**：完成 7 道 题目。
- [ ] 📚 **目标2**：复习算法知识点（拓扑排序,最短路）。
---

### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:40-17:40   | 📝 复习拓扑排序并刷最短路(Dijkstra)题目         | 学    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 6 道题目。
  >蓝桥云课
  - [神经网络](https://www.lanqiao.cn/problems/748/learning/) - 拓扑排序[中等🟠]
  - [Dijkstra求最短路1](https://www.lanqiao.cn/problems/19839/learning/) - Dijkstra[中等🟠]
  - [旅行的截止日期](https://www.lanqiao.cn/problems/18333/learning/) - 有限制的Dijkstra[中等🟠]
  - [欧涛最短路](https://www.lanqiao.cn/problems/3284/learning/) - Dijkstra(一遍过)[困难🔴]
  > 洛谷
  - [神经网络](https://www.luogu.com.cn/problem/P1038) - 拓扑排序[普及+/提高🟢]
  - [营救](https://www.luogu.com.cn/problem/P1396) - Dijkstra + 读题[普及/提高−🟡]
---

### 💡 **解题思路与总结**

#### 题目1.[神经网络](https://www.lanqiao.cn/problems/748/learning/)
- **解题方法**：拓扑排序
- **遇到的问题**：我以为非输入层就是输出层,在输入数据时就判了,非活动层的权值*阈值也加上了
- **解决方案**：非输入层!=输出层,节点后没有子节点的才是输出层
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-25-53.png)

#### 题目2.[Dijkstra求最短路1](https://www.lanqiao.cn/problems/19839/learning/)
- **解题方法**：Dijkstra
- **遇到的问题**：本来是很简单的一个板子题,但总是错一个,没想到是memset配合#define int long long的问题
- **解决方案**：给数组memset值为0x3f的时候求你们一定要去掉#define int long long,下面是来自ai的解答
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-32-23.png)
吓得我感觉给我的代码片段加上了这个
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-33-08.png)

#### 题目3.[旅行的截止日期](https://www.lanqiao.cn/problems/18333/learning/)
- **解题方法**：Dijkstra + 特判(限制了扩展最短的路的策略)
 **太简单了,一遍过**

 #### 题目4.[欧涛最短路](https://www.lanqiao.cn/problems/3284/learning/)
- **解题方法**：预处理一下点与点之间的权值,连接每一个点(稠密图还在用堆优化Dijkstra竟然还能过)就是后面就是纯纯的Dijkstra,虽然还是有限制条件,而且还需要记录路径,用到了前驱数组倒推出路径\
 **太简单了,一遍过** 顺便推荐个网站,我做的时候稍微用了一下这个\
 [3D Calculator](https://www.geogebra.org/3d?lang=zh_CN)
 ![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-43-00.png)
 三维图一目了然,而且还可以算出点与点之间的距离(目前我只用到了这两个功能)

  #### 题目5.[营救](https://www.luogu.com.cn/problem/P1396)
- **解题方法**：读懂题再做
- **遇到的问题**：是路径上遇到的每个权值的最小的最大的权值,而不是所有路径相加的最小值
- **解决方案**： 节点与节点的松弛策略改一下就行
#### 总结:
- 能把抽象问题转化成图结构就能做
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：使用了lamda表达式函数(个人感觉帅的一批)。
  - 📊 **刷题**：拓扑排序和Dijkstra
  - ⏳ **时间管理**：我要是一觉不睡到中午就好了,每天只要一下午的时间,但晚上就是止不住熬夜
  - 👣 **额外收获**: 还可以用fill(arr,arr+n,1e18)来预处理数组,学到了
---

### 📖 **明日计划**
  - 💻 完成 7 道题目，重点攻克 单源最短路(带负权) 类型题。
---

### 📝 **附注**
- ✏️ 晚点再让ai给我的小项目增加点功能(点击增加或者删除节点或者线,自定义点(背景,描边)线的颜色,自定义点的名字)
- 🐱 再去看看能不能申请个GitHub的学生证明,听说免费用GPT4o等那些高级模型
### 🍕封面图
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-15-49.png)
---
