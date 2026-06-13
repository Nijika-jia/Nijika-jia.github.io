---
layout: post
title: 备战传智蓝桥DAY-7
date: 2025-02-14 01:10:53
tags:
    - 算法
    - 蓝桥云课
    - 洛谷
    - xfxcy
    - 图论
    - 最小生成树
    - 二分
    - DFS
    - Dijkstra
    - SPFA
    - BFS
    - 反图
    - Kruskal
    - emplace_back/emplace
    - 排列组合
    - 最短路
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-7_2025-02-14-02-42-06.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 16:00-18:15   | 📝 学习最小生成树+刷题  | 
| 20:00-01:00   | 📝 刷最短路题目         |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 7 道题目
  >蓝桥云课
  - [修建公路](https://www.lanqiao.cn/problems/1124/learning/) - 最小生成树[困难🔴]
  - [矿区建设](https://www.lanqiao.cn/problems/5061/learning/) - 最小生成树[中等🟠]
  - [小怂前往风龙废墟](https://www.lanqiao.cn/problems/4450/learning/) - 最短路问题,二分[简单🟢]
  >洛谷
  - [[NOI1997] 最优乘车](https://www.luogu.com.cn/problem/P5767) - 最短路[普及/提高−🟡]
  - [[CQOI2005] 新年好](https://www.luogu.com.cn/problem/P5764) - 最短路+DFS[普及/提高−🟡]
  - [[USACO08JAN] Telephone Lines S](https://www.luogu.com.cn/problem/P1948) - 二分+最短路[提高+/省选−🔵]
  >xfxcy
  - [昂贵的聘礼](https://www.xfxcy.com/p/P0246) - 最短路,反图[不知道,目测黄题]
  - ❌ **未完成**：
  - [抵御攻击【算法赛】](https://www.lanqiao.cn/problems/20090/learning/) - 最小生成树,但真的能用嘛,10^5个点,互相都有联系,建图都没法建

---

### 💡 **解题思路与总结**

#### 题目1.[修建公路](https://www.lanqiao.cn/problems/1124/learning/)
- **解题方法**：Kruskal板子题
- **遇到的问题**：数据范围有点大,好像不能用prim,二维开不了
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

typedef tuple<int,int,int> PIII;

int n,m;
int p[N];
int find(int x)
{
    if(p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve()
{
    cin >> n >> m;
    vector<PIII> edges;
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        edges.emplace_back(w,u,v);
    }
    sort(all(edges));

    for(int i=1;i<=n;i++) p[i] = i;

    int res = 0 , cnt = 0;
    
    for(int i=0;i<m;i++)
    {
        auto [c,a,b] = edges[i];
        a = find(a) , b = find(b);
        if(a!=b)
        {
            p[a] = b;
            cnt ++;
            res += c;
        }
    }

    if(cnt == n-1) cout << res;
    else cout << -1;
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
 *    created: 2025.02.13 16:10:31
 */
```


#### 题目2.[矿区建设](https://www.lanqiao.cn/problems/5061/learning/)
- **解题方法**：强行构造之后Kruskal没想到还过了,我以为会卡我map的查找效率
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

typedef tuple<double,int,int> PDII;

int n,m;
int p[N];
map<PII,int> mp;
int find(int x)
{
    if(p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve()
{
    cin >> n >> m;
    vector<PII> V,G;
    int x,y;
    for(int i=0;i<n;i++)
    {
        cin >> x >> y;
        V.emplace_back(x,y);
    }
    for(int i=0;i<m;i++)
    {
        cin >> x >> y;
        G.emplace_back(x,y);
    }

    vector<PDII> vil,gem;
    auto getdis = [](int x1,int y1,int x2,int y2){
        return sqrt(pow(x1-x2,2) + pow(y1-y2,2));
    };
    int cnt = 0;
    for(auto [vx,vy] : V)
    {
        if(!mp.count({vx,vy}))
        mp.insert({{vx,vy},cnt++});
        for(auto [nx,ny] : V)
        {
            if(!mp.count({nx,ny}))
            mp.insert({{nx,ny},cnt++});
            vil.push_back({getdis(vx,vy,nx,ny),mp[{vx,vy}],mp[{nx,ny}]});
        }
    }

    for(auto [gx,gy] : G)
    {
        if(!mp.count({gx,gy}))
        mp.insert({{gx,gy},cnt++});
        for(auto [nx,ny] : V)
        {
            if(!mp.count({nx,ny}))
            mp.insert({{nx,ny},cnt++});
            gem.push_back({getdis(gx,gy,nx,ny),mp[{gx,gy}],mp[{nx,ny}]});
        }
    }

    sort(all(vil));
    sort(all(gem));


    for(int i=0;i<m+n;i++) p[i] = i;


    double res = 0;

    for(auto [w,a,b] : vil)
    {
        a = find(a) , b = find(b);
        if(a!=b)
        {
            res += w;
            p[a] = b;
        }
    }
    for(auto [w,a,b] : gem)
    {
        a = find(a) , b = find(b);
        if(a!=b)
        {
            res += w;
            p[a] = b;
        }
    }
    printf("%.2lf",res);
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
 *    created: 2025.02.13 16:10:31
 */
```



#### 题目3.[[NOI1997] 最优乘车](https://www.luogu.com.cn/problem/P5767)
- **解题方法**：Spfa,Dijkstra,BFS都行,难在处理那个输入的情况
- **解决方案**：
```cpp:line-numbers{43,44,47,48,51}
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define PIII tuple<int,int,int>
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m;
int dist[N];
bool vis[N];
vector<int> G[M];
void Spfa()
{
    memset(dist,0x3f,sizeof dist);
    queue<int> q;
    q.push(1);
    vis[1] = 1;
    dist[1] = 0;
    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[1] = 0;
        for(int v : G[u])
        {
            if(dist[u] + 1 < dist[v])
            {
                dist[v] = dist[u] + 1;
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }
    }
}
void solve()
{
    cin >> m >> n;
    string line;
    getline(cin,line); //吸收一个回车
    for(int i=0;i<m;i++)
    {
        getline(cin,line); //读取一行
        stringstream ssin(line); //进入输入流
        int p;
        vector<int> stop;
        while(ssin >> p) stop.emplace_back(p); //读取输入流内容
        for(int j=0;j<stop.size();j++)
            for(int k=j+1;k<stop.size();k++)
                G[stop[j]].emplace_back(stop[k]);
    }

    Spfa();

    if(dist[n] == INF) cout << "NO";
    else cout << max(dist[n] - 1,0);
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
 *    created: 2025.02.13 20:17:56
 */
```



#### 题目4.[昂贵的聘礼](https://www.xfxcy.com/p/P0246)
- **解题方法**：区间Dijkstra
- **遇到的问题**：题读错了,以为是两两之间的阶级不超过m
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define PIII tuple<int,int,int>
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m;
int dist[N],ranks[N];
bool vis[N];
vector<PII> G[M];
int Dijkstra(int l,int r)
{
    memset(dist,0x3f,sizeof dist);
    memset(vis,false,sizeof vis);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.emplace(make_pair(0,n+1));
    dist[n+1] = 0;
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v] && ranks[v] >= l && ranks[v] <= r)
            {
                dist[v] = dist[u] + w;
                heap.push(make_pair(dist[v],v));
            }
        }
    }

    return dist[1];
}
void solve()
{
    cin >> m >> n;
    for(int i=1;i<=n;i++)
    {
        int P,X,T,V;
        cin >> P >> ranks[i] >> X;
        G[n+1].emplace_back(i,P);
        for(int j=0;j<X;j++)
        {
            cin >> T >> V;
            G[T].emplace_back(i,V);
        }
    }

    int ans = INF;

    for(int i=ranks[1]-m;i<=ranks[1];i++) ans = min(Dijkstra(i,i+m),ans);

    cout << ans << '\n';
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
 *    created: 2025.02.13 20:50:17
 */
```



#### 题目5.[[CQOI2005] 新年好](https://www.luogu.com.cn/problem/P5764)
- **解题方法**：SPFA已经死了,用DIjkstra跑出从1到后面所有亲戚为起点的到所有点的最短路,用DFS排列组合找最小的顺序即可
- **遇到的问题**：注意下标和编号不是一个东西
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define PIII tuple<int,int,int>
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  5 * 1e4 + 10,M = 2 * 1e5 + 10;

int n,m;
int ans = INF;
int rel[10];
int dist[N][10];
bool vis[N],st[N];
vector<PII> G[M];
void Dijkstra(int id)
{
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    memset(vis,false,sizeof vis);
    heap.emplace(make_pair(0,rel[id]));
    dist[rel[id]][id] = 0;
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u][id] + w < dist[v][id])
            {
                dist[v][id] = dist[u][id] + w;
                heap.push(make_pair(dist[v][id],v));
            }
        }
    }
}
void dfs(int u,int start,int total)
{
    if(total > ans) return;
    if(u == 5)
    {
        ans = min(ans,total);
        return;
    }
    for(int i=2;i<=6;i++)
    {
        if(st[i]) continue;
        st[i] = 1;
        dfs(u+1,i,total + dist[rel[i]][start]);
        st[i] = 0;
    }
}
void solve()
{
    cin >> n >> m;
    rel[1] = 1;
    for(int i=2;i<=6;i++) cin >> rel[i];
    for(int i=0;i<m;i++)
    {
        int x,y,t;
        cin >> x >> y >> t;
        G[x].emplace_back(y,t);
        G[y].emplace_back(x,t);
    }

    memset(dist,0x3f,sizeof dist);
    for(int i=1;i<=6;i++) Dijkstra(i);

    dfs(0,1,0);

    cout << ans;
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
 *    created: 2025.02.13 22:00:01
 */
```



#### 题目6.[[USACO08JAN] Telephone Lines S](https://www.luogu.com.cn/problem/P1948)
- **解题方法**：二分答案+SPFA(由于只有1和0的权值,双向BFS也行),超过这个二分答案的边设为1,否则为0,刚好消除小于等于K条就是满足性质,答案可以再大一点,否则再小一点
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define PIII tuple<int,int,int>
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e3 + 10,M = 2 * 1e4 + 10;

int n,p,k;
vector<PII> G[M];
int dist[N];
bool vis[N];
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
            int c = w > limt ? 1 : 0;
            if(dist[u] + c < dist[v])
            {
                dist[v] = dist[u] + c;
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }
    }
    return dist[n] <= k;
}
void solve()
{
    cin >> n >> p >> k;
    for(int i=0;i<p;i++)
    {
        int a,b,l;
        cin >> a >> b >> l;
        G[a].emplace_back(b,l);
        G[b].emplace_back(a,l);
    }

    int l = 0 , r = INF;
    while(l < r)
    {
        int mid = l + r >> 1;
        if(!Spfa(mid)) l = mid + 1;
        else r = mid;
    }

    if(l >= INF / 2) cout << -1;
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
 *    created: 2025.02.13 23:35:54
 */
```



#### 题目7.[小怂前往风龙废墟](https://www.lanqiao.cn/problems/4450/learning/)
- **解题方法**：二分答案SPFA,最后再跟第一个必经之城取最大
- **遇到的问题**：第一个城市是必经的,最后要判断一下
- **解决方案**：
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define PIII tuple<int,int,int>
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e4 + 10,M = 1 * 1e5 + 10;

int n,m,B;
int dist[N],fee[N];
bool vis[N];
vector<PII> G[M];
bool Spfa(int limt)
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
           if(dist[u] + w < dist[v] && fee[v] <= limt)
           {
                dist[v] = dist[u] + w;
                if(vis[v]) continue;
                vis[v] = 1;
                q.emplace(v);
           }
        }
    }

    return dist[n] <= B;
}
void solve()
{
    cin >> n >> m >> B;
    for(int i=1;i<=n;i++) cin >> fee[i];
    for(int i=0;i<m;i++)
    {
        int a,b,c;
        cin >> a >> b >> c;
        G[a].emplace_back(b,c);
        G[b].emplace_back(a,c);
    }

    int l = 0 , r = INF;
    while(l < r)
    {
        int mid = l + r >> 1;
        if(!Spfa(mid)) l = mid + 1;
        else r = mid;
    }

    if(r == INF) cout << -1;
    else cout << max(fee[1],r);
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
 *    created: 2025.02.14 00:37:57
 */
```


#### 额外收获:
-  `emplace_back` 的使用总结：

1. **对 pair/tuple**：
   - 使用 `make_pair` 或 `make_tuple` 创建：  
     ```cpp
     vector<pair<int, int>> v;
     v.emplace_back(make_pair(1, 2));
     ```
   - 直接传入参数（更简洁）：  
     ```cpp
     v.emplace_back(1, 2);
     ```

2. **对结构体**：
   - 有构造函数时：直接传构造参数：  
     ```cpp
     struct Node { int a, b; Node(int x, int y) : a(x), b(y) {} };
     vector<Node> v;
     v.emplace_back(1, 2);
     ```
   - 没有构造函数时：用 `{}` 初始化：  
     ```cpp
     struct Node { int a, b; };
     vector<Node> v;
     v.emplace_back(Node{1, 2}); // 或更简洁：v.emplace_back(1, 2);
     ```
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：排列组合
  - 📊 **刷题**：最小生成树难刷,给了标签又用不了
  - ⏳ **时间管理**：下午玩嗨了
---

### 📖 **明日计划**
  - 💻 继续刷最短路,磕难题
---

### 📝 **附注**

### 🍕封面图
![](/posts/备战传智蓝桥DAY-7_2025-02-14-02-42-06.png)
---