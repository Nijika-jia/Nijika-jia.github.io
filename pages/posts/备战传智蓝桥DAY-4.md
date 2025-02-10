---
layout: post
title: 备战传智蓝桥DAY-4
date: 2025-02-10 22:27:56
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
cover : /posts/备战传智蓝桥DAY-4_2025-02-10-23-23-45.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:40-18:40   | 📝 刷最短路(SPFA,Dijkstra)题目         | 学新东西    |
| 19:40-22:20   | 📝 刷Floyd类的题目(for写到手麻)         | 学新东西    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 5 道题目(新东西慢慢来)
  >蓝桥云课
  - [魔法阵](https://www.lanqiao.cn/problems/3542/learning/) - Dijkstra[中等🟠]
  :::tip tip
   完结蓝桥云课的Dijkstra类的题!!!
   :::
  - [随机数据下的最短路问题](https://www.lanqiao.cn/problems/1366/learning/) - SPFA[困难🔴]
  - [判断负环](https://www.lanqiao.cn/problems/20020/learning/) - SPFA[中等🟠]
  - [会面](https://www.lanqiao.cn/problems/4218/learning/) - SPFA[简单🟢]
  >dotcpp
  - [信息学奥赛一本通T1503-道路和航线](https://www.dotcpp.com/oj/problem2412.html) - dfs求连通块+拓扑排序+Dijkstra
  - ❌ **未完成**：
  - [寻路](https://www.lanqiao.cn/problems/1013/learning/) - 乍一看还以为就SPFA或者DIjkstra就能解决的,发现是自己没水准了
  :::danger danger
  搜了一下发现是AOIP的题,这是我能做的嘛?!
  :::
---

### 💡 **解题思路与总结**

#### 题目1.[魔法阵](https://www.lanqiao.cn/problems/3542/learning/)
- **解题方法**：DIjkstra + 简单dp
- **遇到的问题**：遇到dp就害怕的病还能治嘛😱
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m,k;
int dp[M][M];
vector<PII> G[M];
void Dijkstra()
{
    memset(dp,0x3f,sizeof dp);
    queue<int> q;
    q.push(0);
    dp[0][0] = 0;
    while(q.size())
    {
        int u = q.front();
        q.pop();
        for(auto [v,w] : G[u])
        {
            bool flag = 0;
            if(dp[u][0] + w < dp[v][0])
            {
                dp[v][0] = dp[u][0] + w;
                flag = 1;
            }

            for(int i=1;i<=k;i++)
            {
                if(dp[u][i-1] < dp[v][i])
                {
                    dp[v][i] = dp[u][i-1];
                    flag = 1;
                }
            }

            if(dp[u][k] + w < dp[v][k])
            {
                dp[v][k] = dp[u][k] + w;
                flag = 1;
            }

            if(flag) q.push(v);
        }
    }
}
void solve()
{
    cin >> n >> k >> m;
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
        G[v].push_back({u,w});
    }
    Dijkstra();
    cout << min(dp[n-1][0],dp[n-1][k]);
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
 *    created: 2025.02.10 13:58:01
 */
```

#### 题目2.[随机数据下的最短路问题](https://www.lanqiao.cn/problems/1366/learning/)
- **解题方法**：SPFA板子题
- **遇到的问题**：w会爆int,注意longlong
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
#define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e5 + 10,M = 5 * 1e3 + 10;

int n,m,s;
int dist[N];
bool vis[N];
vector<PII> G[N];
void spfa()
{
    fill(dist,dist+n+1,1e18+10);
    memset(vis,false,sizeof vis);
    queue<int> q;
    q.push(s);
    dist[s] = 0;
    vis[s] = 1;
    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[u] = false;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                if(!vis[v])
                {
                    vis[v] = 1;
                    q.push(v);
                }
            } 
        }
    }
}
void solve()
{
    cin >> n >> m >> s;
    int a,b,c;
    for(int i=1;i<=m;i++)
    {
        cin >> a >> b >> c;
        G[a].push_back({b,c});
    }
    spfa();
    for(int i=1;i<=n;i++)
    {
        cout << (dist[i] >= 1e18 + 10 ? -1 : dist[i]) << ' ';
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
 *    created: 2025.02.10 15:05:58
 */
```

#### 题目3.[判断负环](https://www.lanqiao.cn/problems/20020/learning/)
- **解题方法**：基础的SPFA判负环
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
#define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e4 + 10,M = 5 * 1e3 + 10;

int n,m;
int dist[M],cnt[M];
bool vis[M];
vector<PII> G[N];
bool SPFA()
{
    queue<int> q;
    for(int i=1;i<=n;i++)
    {
        vis[i] = 1;
        q.push(i);
    }

    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[u] = 0;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
            if(cnt[v] >= n) return true;
        }
    }
    return false;
}
void solve()
{
    cin >> n >> m;
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
    }
    cout << (SPFA() ? "Yes" : "No") << '\n';
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
 *    created: 2025.02.10 15:56:22
 */
```

#### 题目4.[信息学奥赛一本通T1503-道路和航线](https://www.dotcpp.com/oj/problem2412.html)
- **解题方法**：dfs求连通块+拓扑排序+Dijkstra
- **遇到的问题**：开始以为用SPFA就行,果不其然,卡掉了两个,看了题解又学到了,Dijkstra也可以求负权图的最短路😋
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int t,r,p,s;
int ku;
int dist[N],in[N],cnt[N];
bool vis[N];
vector<PII> G[N];
vector<int> bo[N];
queue<int> topp;
void dfs(int u,int ko)
{
    cnt[u] = ko;
    bo[ko].push_back(u);
    for(auto [v,_] : G[u])
    {
        if(cnt[v]) continue;
        dfs(v,ko);
    }
}
void Dijkstra(int st)
{
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    for(int u : bo[st]) heap.push({dist[u],u});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(cnt[v] != cnt[u] && --in[cnt[v]] == 0)
            {
                topp.push(cnt[v]);
            }
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                if(cnt[u] == cnt[v]) heap.push({dist[v],v});
            }
        }
    }
}
void topsort()
{
    memset(dist,0x3f,sizeof dist);
    dist[s] = 0;
    for(int i=1;i<=ku;i++)
    {
        if(!in[i]) topp.push(i);
    }
    while(topp.size())
    {
        int u = topp.front();
        topp.pop();
        Dijkstra(u);
    }
}
void solve()
{
    cin >> t >> r >> p >> s;
    int a,b,c;
    for(int i=0;i<r;i++)
    {
        cin >> a >> b >> c;
        G[a].push_back({b,c});
        G[b].push_back({a,c});
    }
    for(int i=1;i<=t;i++)
    {
        if(!cnt[i]) dfs(i,++ku);
    }
    for(int i=0;i<p;i++)
    {
        cin >> a >> b >> c;
        G[a].push_back({b,c});
        in[cnt[b]] ++;
    }
    topsort();
    for(int i=1;i<=t;i++)
    {
        if(dist[i] > INF / 2) cout << "NO PATH\n";
        else cout << dist[i] << '\n';
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
 *    created: 2025.02.10 18:08:33
 */
```

#### 题目5.[会面](https://www.lanqiao.cn/problems/4218/learning/)
- **解题方法**：枚举每个中间会面点就行,求两段路(起点到会面点,会面点到终点)的最大值加起来更新最小的答案就行
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m;
int dis[M][M];
void init()
{
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {
            if(i == j) dis[i][j] = 0;
            else dis[i][j] = INF;
        }
    }
}
void floyd()
{
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                dis[i][j] = min(dis[i][j],dis[i][k]+dis[k][j]);
            }
        }
    }
}
void solve()
{
    cin >> n >> m;
    init();
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        dis[u][v] = min(dis[u][v],w);
        dis[v][u] = min(dis[v][u],w);
    }
    int s1,e1,s2,e2;
    cin >> s1 >> e1 >> s2 >> e2;
    floyd();
    int time = INF;
    for(int i=1;i<=n;i++)
    {
        time = min(max(dis[s1][i],dis[s2][i]) + max(dis[i][e1],dis[i][e2]), time);
    }
    if(time == INF) cout << -1;
    else cout << time;
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
 *    created: 2025.02.10 21:40:18
 */
```


#### 额外收获:
- 存一下求矩形边上所有点以及外围点的函数吧和判断是否在矩形边上的函数
```cpp
vector<pair<int, int>> getRectangleAndOuterEdges(int x1, int y1, int x2, int y2) {
    vector<pair<int, int>> points;

    // 先处理矩形边上的点
    // 上边 (x1, y1) -> (x2, y1)
    for (int x = x1; x <= x2; ++x) {
        points.push_back({x, y1});
    }

    // 下边 (x1, y2) -> (x2, y2)
    for (int x = x1; x <= x2; ++x) {
        points.push_back({x, y2});
    }

    // 左边 (x1, y1) -> (x1, y2)
    for (int y = y1; y <= y2; ++y) {
        points.push_back({x1, y});
    }

    // 右边 (x2, y1) -> (x2, y2)
    for (int y = y1; y <= y2; ++y) {
        points.push_back({x2, y});
    }

    // 处理外围一格的点
    // 上边外侧 (x1, y1-1) -> (x2, y1-1)
    for (int x = x1; x <= x2; ++x) {
        points.push_back({x, y1 - 1});
    }

    // 下边外侧 (x1, y2+1) -> (x2, y2+1)
    for (int x = x1; x <= x2; ++x) {
        points.push_back({x, y2 + 1});
    }

    // 左边外侧 (x1-1, y1) -> (x1-1, y2)
    for (int y = y1; y <= y2; ++y) {
        points.push_back({x1 - 1, y});
    }

    // 右边外侧 (x2+1, y1) -> (x2+1, y2)
    for (int y = y1; y <= y2; ++y) {
        points.push_back({x2 + 1, y});
    }

    return points;
}
```
```cpp
bool isOnEdge(int x1, int y1, int x2, int y2, int px, int py) {
    // 规范矩形的坐标范围，确保 (x1, y1) 是左下角，(x2, y2) 是右上角
    if (x1 > x2) swap(x1, x2);
    if (y1 > y2) swap(y1, y2);

    // 检查是否在矩形边上
    return (
        (py == y1 && px >= x1 && px <= x2) ||  // 在上边
        (py == y2 && px >= x1 && px <= x2) ||  // 在下边
        (px == x1 && py >= y1 && py <= y2) ||  // 在左边
        (px == x2 && py >= y1 && py <= y2)     // 在右边
    );
}
```
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：那道dotcpp的题直接帮我复习了,什么拓扑排序,DIjkstra,dfs分连通块,真好
  - 📊 **刷题**：学新东西刷的慢正常吧,大概?
  - ⏳ **时间管理**：这次睡的更死了,都到饭点了🥲
---

### 📖 **明日计划**
  - 💻 完成 6 道题目，明天纯刷图论的题
---

### 📝 **附注**
- 还有11天开学了,才发现🥲
### 🍕封面图
![](/posts/备战传智蓝桥DAY-4_2025-02-10-23-23-45.png)
---
