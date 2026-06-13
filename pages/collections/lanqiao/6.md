---
layout: post
title: 备战传智蓝桥DAY-6
date: 2025-02-13 00:11:45
tags: 
    - 算法
    - 蓝桥云课
    - 洛谷
    - 最短路
    - 图论
    - 二分
    - Dijkstra
    - SPFA
    - Floyd
    - DP
    - 拓扑排序
    - 勾股定理
    - STL优化
    - 未完成
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-6_2025-02-13-00-25-35.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:30-15:15   | 📝 刷最短路题目         | 唯手未熟尔    |
| 14:00-17:30   | 📝 刷最短路题目         | 唯手还没熟尔    |
| 20:30-24:00   | 📝 刷最短路题目         | 唯手熟尔    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 7 道题目
  >蓝桥云课
  - [城市配送路径查询](https://www.lanqiao.cn/problems/4184/learning/) - 最短路问题[简单🟢]
  - [盛夏！海岛？大冒险！](https://www.lanqiao.cn/problems/3947/learning/) - 最短路问题[简单🟢]
  - [小秋的旅行](https://www.lanqiao.cn/problems/3783/learning/) - 最短路问题,二分[困难🔴]
  - [大陆争霸](https://www.lanqiao.cn/problems/978/learning/) - 最短路[中等🟠]
  - [飞往全国的飞机【UUST】](https://www.lanqiao.cn/problems/3115/learning/) - 最短路问题[困难🔴]
  - [欧涛玩游戏](https://www.lanqiao.cn/problems/3279/learning/) - 最短路问题[困难🔴] ???
  - [染色时间](https://www.lanqiao.cn/problems/2386/learning) - 最短路问题[困难🔴]
  >洛谷
  - [[SDOI2010] 大陆争霸](https://www.luogu.com.cn/problem/P2446) - 最短路[提高+/省选🔵]


  - ❌ **未完成**：
  - [[ZJOI2006] 物流运输](https://www.luogu.com.cn/problem/P1772) - 最短路,dp[提高+/省选🔵]
---

### 💡 **解题思路与总结**

#### 题目1.[城市配送路径查询](https://www.lanqiao.cn/problems/4184/learning/)
- **解题方法**：Dijkstra
- **遇到的问题**：题目上叫用A*算法,有障碍物怎么个写估价函数啊,曼哈顿距离也用不了,只能用DIjkstra
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
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e2 + 10;

typedef pair<int,PII> PIPII;
int n;
char g[M][M];
int dist[M][M];
bool vis[M][M];
int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
int Dijkstra(int sx,int sy,int ex,int ey)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PIPII,vector<PIPII>,greater<PIPII>> heap;
    heap.push({0,{sx,sy}});
    dist[sx][sy] = 0;
    while(heap.size())
    {
        auto t = heap.top();
        heap.pop();
        auto [x,y] = t.second;
        if(vis[x][y]) continue;
        vis[x][y] = 1;
        for(int i=0;i<4;i++)
        {
            int nx = x + dir[i][0];
            int ny = y + dir[i][1];
            if(x < 0 || y < 0 || x >= n || y >= n) continue;
            if(g[nx][ny] == '#') continue;
            if(dist[x][y] + 1 < dist[nx][ny])
            {
                dist[nx][ny] = dist[x][y] + 1;
                heap.push({dist[nx][ny],{nx,ny}});
            }
        } 
    }

    if(dist[ex][ey] == INF) return -1;
    return dist[ex][ey];
}
void solve()
{
    cin >> n;
    for(int i=0;i<n;i++)
        for(int j=0;j<n;j++)
            cin >> g[i][j];
    int sx,sy,ex,ey;
    cin >> sx >> sy >> ex >> ey;
    cout << Dijkstra(sx,sy,ex,ey) << '\n';
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
 *    created: 2025.02.12 13:40:43
 */
```

#### 题目2.[盛夏！海岛？大冒险！](https://www.lanqiao.cn/problems/3947/learning/)
- **解题方法**：Floyd
- **遇到的问题**：答案其实就是已经是所有采集宝物的时间 + 到各个岛屿的最短路
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
int dist[M][M],w[M];
void Floyd()
{
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
}
void solve()
{
    cin >> n >> m;
    memset(dist,0x3f,sizeof dist);
    for(int i=1;i<=n;i++) dist[i][i] = 0;
    for(int i=1;i<=n;i++) cin >> w[i];
    for(int i=0;i<m;i++)
    {
        int a,b,d;
        cin >> a >> b >> d;
        dist[a][b] = min(dist[a][b],d);
        dist[b][a] = min(dist[b][a],d);
    }
    Floyd();
    int ans = 0;
    bool f = false;    
    for(int i=1;i<=n;i++)
    {
        if(dist[1][i] == INF) f = true;
        ans += dist[1][i] + w[i];
    }
    if(f) cout << -1;
    else cout << ans;
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
 *    created: 2025.02.12 14:24:06
 */
```

#### 题目3.[小秋的旅行](https://www.lanqiao.cn/problems/3783/learning/)
- **解题方法**：二分答案用SPFA检验合法性
- **遇到的问题**：要注意一下第一个点是SPFA是检验不到答案的,最后要判断一下是不是小于第一个中转时间
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
constexpr int N =  1 * 1e5 + 10,M = 5 * 1e3 + 10;

int n,m,k;
int tran[N],dist[N];
bool vis[N];
vector<PII> G[N];
bool Spfa(int limt)
{
    memset(dist,0x3f,sizeof dist);
    memset(vis,false,sizeof vis);
    queue<int> q;
    q.push(1);
    vis[1] = 1;
    dist[1] = 0;
    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[u] = 0;
        for(auto [v,w] : G[u])
        {
            if(tran[v] > limt && v != n) continue;
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }
    }
    return dist[n] <= k && dist[n] != INF;
}
void solve()
{
    cin >> n >> m >> k;
    for(int i=1;i<=n;i++) cin >> tran[i];
    for(int i=0;i<m;i++)
    {
        int a,b,c;
        cin >> a >> b >> c;
        G[a].push_back({b,c});
        G[b].push_back({a,c});
    }
    int l = 0 , r = INF;
    while(l < r)
    {
        int mid = l + r >> 1;
        if(!Spfa(mid)) l = mid + 1;
        else r = mid;
    }
    if(l < tran[1]) l = tran[1];
    if(l == INF) cout << -1;
    else cout << l << '\n';
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
 *    created: 2025.02.12 14:42:34
 */
```

#### 题目4.[[SDOI2010] 大陆争霸](https://www.luogu.com.cn/problem/P2446)
- **解题方法**：有点像拓扑排序,先处理入度为0的点,就是没有被结界保护的(可以再建一个图),如果处理完前置,才加入Dijkstra的堆里,最短时间也不是直接更新上一次的,可能一个地方先打破结界了但机器人还没到,或者机器人到了结界还没打破,两者取最大加入堆里就行
- **遇到的问题**：更新dist地方需要一点时间理解
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
constexpr int N =  3 * 1e5 + 10,M = 7 * 1e4 + 10;

int n,m;
bool vis[N];
int dist[N],in[N],arrive[N];
vector<PII> G[M];
vector<int> wards[N];
int Dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,1});
    dist[1] = 0;
    while(heap.size())
    {
        auto [_,u] = heap.top();
        heap.pop();
        int d = max(dist[u],arrive[u]);
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(w + d < dist[v])
            {
                dist[v] = w + d;
                if(!in[v]) heap.push({max(dist[v],arrive[v]),v});
            }
        }
        for(int v : wards[u])
        {
            arrive[v] = max(arrive[v],d);
            if(--in[v] == 0) heap.push({max(dist[v],arrive[v]),v});
        }
    }
    
    return max(arrive[n],dist[n]);
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
    for(int i=1;i<=n;i++)
    {
        cin >> in[i];
        for(int j=0,x;j<in[i];j++)
        {
            cin >> x;
            wards[x].push_back(i);
        }
    }

    cout << Dijkstra() << '\n';
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
 *    created: 2025.02.12 15:46:15
 */
```

#### 题目5.[飞往全国的飞机【UUST】](https://www.lanqiao.cn/problems/3115/learning/)
- **解题方法**：Spfa,Dijkstra都行(Spfa 平均O(m)又能求负权图谁不爱呢),每个样例清空一下G,vis,dist就行
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
constexpr int N =  2 * 1e5 + 10,M = 5 * 1e3 + 10;

int n,m,k;
vector<PII> G[N];
bool vis[N];
int dist[N];
void Spfa()
{
    memset(dist,0x3f,sizeof dist);
    memset(vis,false,sizeof vis);
    queue<int> q;
    q.emplace(1);
    dist[1] = 0;
    vis[1] = 1;
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
                if(vis[v]) continue;
                vis[v] = 1;
                q.emplace(v);
            }
        }
    }
}
void solve()
{
    int x,y,z;
    cin >> n >> m >> k;
    for(int i=1;i<=n;i++) G[i].clear();
    for(int i=0;i<m;i++)
    {
        cin >> x >> y;
        G[x].emplace_back(y,0);
    }
    for(int i=0;i<k;i++)
    {
        cin >> x >> y >> z;
        G[x].emplace_back(y,z);
    }

    Spfa();

    for(int i=1;i<=n;i++)
    {
        if(dist[i] == INF) cout << -1 << ' ';
        else cout << dist[i] << ' ';
    }
    cout << '\n';
}
signed main()
{
    ios::sync_with_stdio(0);cin.tie(nullptr),cout.tie(nullptr);
    int _=1;
    cin>>_;
    while(_--)
    {
        solve();
    }
    return 0;
}

/**
 *    author: Nijika_jia
 *    created: 2025.02.12 20:35:34
 */
```

#### 题目6.[欧涛玩游戏](https://www.lanqiao.cn/problems/3279/learning/)
- **解题方法**：勾股定理,这不水题,还挂一个最短路困难的标签吓我
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
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;


void solve()
{
    int a[3];
    while(cin >> a[0] >> a[1] >> a[2])
    {
        sort(a,a+3);
        cout << (a[0]*a[0] + a[1]*a[1] == a[2]*a[2] ? "YES" : "NO") << '\n';
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
 *    created: 2025.02.12 20:50:25
 */
```

#### 题目7.[染色时间](https://www.lanqiao.cn/problems/2386/learning)
- **解题方法**：DIjkstra找到最短到达方格的时间后,再加上自己染好的时间就是每个方格最少需要的时间,遍历整个方格更新最大值
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

typedef pair<int,PII> PIPII;

int n,m;
int g[M][M],dist[M][M];
bool vis[M][M];
int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
int Dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PIPII,vector<PIPII>,greater<PIPII>> heap;
    heap.emplace(0,make_pair(1,1));
    dist[1][1] = 0;
    while(heap.size())
    {
        auto [x,y] = heap.top().second;
        heap.pop();
        if(vis[x][y]) continue;
        vis[x][y] = 1;
        for(int i=0;i<4;i++)
        {
            int nx = x + dir[i][0];
            int ny = y + dir[i][1];
            if(nx <= 0 || ny <= 0 || nx > n || ny > m) continue;
            if(dist[x][y] + g[x][y] < dist[nx][ny])
            {
                dist[nx][ny] = dist[x][y] + g[x][y];
                heap.emplace(dist[nx][ny],make_pair(nx,ny));
            }
        }
    }
    int res = 0;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            res = max(res,dist[i][j] + g[i][j]);
    
    return res;
}
void solve()
{
    cin >> n >> m;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            cin >> g[i][j];

    cout << Dijkstra()<< '\n';
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
 *    created: 2025.02.12 23:23:23
 */
```


#### 额外收获:
- 问了一下ai让他帮我总结了下面的文章->[传送门](/posts/C++容器操作优化.md),就是push_back和push换成emplace_back和emplace好点咯
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：猛猛刷题复习最短路,可惜忘了今天还要学最小生成树了
  - 📊 **刷题**：刷到两道硬骨头了(指洛谷蓝题🔵),啃不动
  - ⏳ **时间管理**：还是不能一干就是一下午,给自己放松了一下,下午
---

### 📖 **明日计划**
  - 💻 学习最小生成树,解决几道相关的题
---

### 📝 **附注**

### 🍕封面图
![](/posts/备战传智蓝桥DAY-6_2025-02-13-00-25-35.png)
---