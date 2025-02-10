---
layout: post
title: 备战传智蓝桥DAY-1
date: 2025-02-07 20:05:59
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
cover : /posts/备战传智蓝桥DAY-1_2025-02-10-14-13-15.png
codeHeightLimit: 300
---

### 🎯 **今日目标**
- [ ] 💻 **目标1**：完成 10 道 题目。
- [ ] 📚 **目标2**：复习算法知识点（拓扑排序）。
---

### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:30-17:30   | 📝 复习拓扑排序并刷题目         | 恢复状态和学点新东西    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 6 道题目。
  >蓝桥云课
  - [发现环](https://www.lanqiao.cn/problems/108/learning/) - 拓扑排序 + 证自环 || dfs + 并查集(只有查)[困难🔴]
  - [恋爱通关游戏](https://www.lanqiao.cn/problems/2947/learning/) - 拓扑排序 + dp[困难🔴]
  - [阿霖的旅游计划](https://www.lanqiao.cn/problems/5011/learning/) - 拓扑排序 + dp[简单🟢]
  - [最小字典序排列](https://www.lanqiao.cn/problems/3351/learning/) - 拓扑排序(板子,加了个优先队列强调顺序而已)[简单🟢]
  >xfxcy
  - [奖金](https://www.xfxcy.com/p/P0249) - 拓扑排序 + dp[不知道]
  > 洛谷
  - [家谱树](https://www.luogu.com.cn/problem/B3644) - 拓扑排序(板子)[普及-🟠]
---

### 💡 **解题思路与总结**
#### 题目1.[发现环](https://www.lanqiao.cn/problems/108/learning/)
- **解题方法**：拓扑排序
- **优化点**：从 不会(1/10) 优化到 会(10/10)（具体步骤）。
- **遇到的问题**：不会找自环。
- **解决方案**：看题解有思路,发现只要把所有入度为1(双向建边)的点删去,其余就是环。
![](/posts/备战传智蓝桥DAY-1_2025-02-07-21-05-35.png)
```cpp:line-numbers
#include<bits/stdc++.h>
#define int long long
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10,inf = 0x3f3f3f3f;

int n;
int in[N],f[N];
void dfs(int u)
{
    if(in[u] == 1)
    {
        in[u]--;
        in[f[u]] --;
        dfs(f[u]);
    }
}
void solve()
{
    cin >> n;
    for(int i=0;i<n;i++)
    {
        int a,b;
        cin >> a >> b;
        in[a] ++ , in[b] ++;
        f[b] = a;
    }

    for(int i=1;i<=n;i++) dfs(i);
    for(int i=1;i<=n;i++)
    {
        if(in[i] > 1) cout << i << ' ';
    }
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(nullptr),cout.tie(nullptr);
    int _=1;
    // cin>>_;
    while(_--)
    {
        solve();
    }
    return 0;
}

/**
 *    author: Nijika_jia
 *    created: 2025.02.07 20:53:33
 */
```
#### 额外收获:
- 感觉求什么最大(旅游,恋爱),最少(奖金)的题目拓扑排序就是在给dp打辅助,不会dp照样白瞎
![](/posts/备战传智蓝桥DAY-1_2025-02-07-21-09-08.png)
- 高中的记忆开始攻击我,让我想起来等差公式求和
![](/posts/备战传智蓝桥DAY-1_2025-02-07-21-36-16.png)
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：巩固未掌握的知识点（如堆(小根堆的优先队列都不会写了)、递归优化,lamda表达式）。
  - 📊 **刷题**：增加某类题目练习，如图论题或搜索题。
  - ⏳ **时间管理**：减少不必要的时间浪费，限定每题时间。
---

### 📖 **明日计划**
  - 💻 完成 7 道题目，重点攻克 单源最短路 类型题。
---

### 📝 **附注**
- ✏️ 晚点再让ai做点有用的小项目(图论常常用到的)
### 🍕封面图
![](/posts/备战传智蓝桥DAY-1_2025-02-10-14-13-15.png)
---
