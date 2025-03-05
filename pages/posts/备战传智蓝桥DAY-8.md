---
layout: post
title: 备战传智蓝桥DAY-8
date: 2025-02-15 00:35:44
tags: 
    - 算法
    - 最短路
    - 图论
    - DP
    - 状压DP
    - BFS
    - 虚拟源点
    - K & R
    - 最小生成树
    - Dijkstra
    - SPFA
    - 多源最短路
    - 费用流
    - 拓扑排序
    - 并查集
    - 蓝桥杯
    - 传智杯
    - 洛谷
    - HDU
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-8_2025-02-15-00-38-23.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 14:30-18:00   | 📝 刷题最短路的综合  | 
| 22:00-00:30   | 📝 刷最短路综合题目         |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 4 道题目
  >蓝桥云课
  - [最小权重路径](https://www.lanqiao.cn/problems/3719/learning/) - 最短路[简单🟢] (目测困难🔴)
  >洛谷
  - [[NOIP 2009 提高组] 最优贸易](https://www.luogu.com.cn/problem/P1073) - 最短路DP[提高+/省选−🔵]
  - [孤岛营救问题](https://www.luogu.com.cn/problem/P4011) - BFS,状压DP[提高+/省选−🔵]
  >HDU
  - [Choose the best route](https://acm.hdu.edu.cn/showproblem.php?pid=2680) - 多起点最短路(虚拟源点)[中等🟠]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**

#### 题目1.[[NOIP 2009 提高组] 最优贸易](https://www.luogu.com.cn/problem/P1073)
- **解题方法**：建立正反图,枚举每个点为终点,正图算出到这个点最小购入价格,反图算出到这个点最大卖出价格,枚举以每个点为终点两者相减的价格更新最大值
- **遇到的问题**：
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
constexpr int N =  100000 + 10,M = 2 * 500000 + 10;

int n,m;
int w[N];
bool vis[N];
int dmin[N],dmax[N];
vector<int> Gmin[M],Gmax[M];
void Spfa(vector<int> G[],int dist[],int type)
{
    queue<int> q;
    if(type == 0)
    {
        memset(dist,0x3f,sizeof dmin);
        q.push(1);
        dist[1] = w[1];
        vis[1] = 1;
    }
    else
    {
        memset(dist,-0x3f,sizeof dmax);
        q.push(n);
        dist[n] = w[n];
        vis[n] = 1;
    }

    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[u] = 0;
        for(int v : G[u])
        {
            if(type == 0 && min(dist[u],w[v]) < dist[v] || type == 1 && max(dist[u],w[v]) > dist[v])
            {
                if(type == 0) dist[v] = min(dist[u],w[v]);
                else dist[v] = max(dist[u],w[v]);
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }
    }
}
void solve()
{
    cin >> n >> m;
    for(int i=1;i<=n;i++) cin >> w[i];
    while(m--)
    {
        int x,y,z;
        cin >> x >> y >> z;
        Gmin[x].emplace_back(y);
        Gmax[y].emplace_back(x);
        if(z == 2)
        {
            Gmin[y].emplace_back(x);
            Gmax[x].emplace_back(y);
        }
    }

    Spfa(Gmin,dmin,0);
    Spfa(Gmax,dmax,1);

    int ans = 0;
    for(int i=1;i<=n;i++) ans = max(dmax[i] - dmin[i],ans);

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
 *    created: 2025.02.14 14:40:56
 */
```


#### 题目2.[最小权重路径](https://www.lanqiao.cn/problems/3719/learning/)
- **解题方法**：Dijkstra+状态处理
- **遇到的问题**：
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << "=" << a << endl;

using namespace std;
constexpr int N = 2 * 1e5 + 10, M = 4 * 1e5 + 10;

int n, m;
int dist[N][2][2];  // dist[u][add][sub] 存储从 1 到 u 的最短路径，状态由 add 和 sub 控制
struct node {
    int u, add, sub, d;  // u: 节点，add: 加边状态，sub: 减边状态，d: 当前的距离
};

struct cmp {
    bool operator()(const node& a, const node& b) {
        return a.d > b.d;  // 最小堆
    }
};

vector<PII> G[M];  // 图的邻接表

void Dijkstra() {
    // 初始化 dist 数组
    for (int i = 1; i <= n; i++) {
        dist[i][0][0] = dist[i][1][1] = 1e18 + 10;
        dist[i][1][0] = dist[i][0][1] = 1e18 + 10;
    }
    priority_queue<node, vector<node>, cmp> heap;  // 优先队列

    // 从起点 1 开始，初始状态 add = 0, sub = 0, 距离 = 0
    heap.push(node{1, 0, 0, 0});
    dist[1][0][0] = 0;

    while (!heap.empty()) {
        auto [u, add, sub, d] = heap.top();
        heap.pop();

        // 访问相邻节点
        for (auto [v, w] : G[u]) {
            // 如果不改变状态的情况下，更新 dist
            if (dist[u][add][sub] + w < dist[v][add][sub]) {
                dist[v][add][sub] = dist[u][add][sub] + w;
                heap.push(node{v, add, sub, dist[v][add][sub]});
            }

            // 如果 sub == 0, 允许进行减边操作
            if (sub == 0 && dist[u][add][sub] < dist[v][add][1]) {
                dist[v][add][1] = dist[u][add][sub];
                heap.push(node{v, add, 1, dist[v][add][1]});
            }

            // 如果 add == 0, 允许进行加边操作，权重加倍
            if (add == 0 && dist[u][add][sub] + 2 * w < dist[v][1][sub]) {
                dist[v][1][sub] = dist[u][add][sub] + 2 * w;
                heap.push(node{v, 1, sub, dist[v][1][sub]});
            }

            // 如果 add == 0 且 sub == 0, 允许同时进行加边和减边操作
            if (add == 0 && sub == 0 && dist[u][add][sub] + w < dist[v][1][1]) {
                dist[v][1][1] = dist[u][add][sub] + w;
                heap.push(node{v, 1, 1, dist[v][1][1]});
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        G[u].emplace_back(v, w);
        G[v].emplace_back(u, w);
    }

    Dijkstra();

    // 输出从 1 到其他节点的最短路径（状态 1, 1）
    for (int i = 2; i <= n; i++) {
        cout << dist[i][1][1] << ' ';
    }
    cout << '\n';
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
 *    created: 2025.02.14 16:29:34
 */

```



#### 题目3.[Choose the best route](https://acm.hdu.edu.cn/showproblem.php?pid=2680)
- **解题方法**：创建一个虚拟原点,到所有起点,再从虚拟原点开始求最短路就可以
- **遇到的问题**：终点不是n,是输入的s
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
constexpr int N =  1000 + 10,M = 20000 + 10;

int n,m,s;
int dist[N];
bool vis[N];
vector<PII> G[M];
int Spfa() {
    memset(dist,0x3f,sizeof dist);
    queue<int> q;
    q.emplace(0);
    dist[0] = 0;
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

    if(dist[s] == INF) return -1;
    return dist[s];
}
void solve() {
    while(cin >> n >> m >> s) {
        for(int i=0;i<=n;i++) G[i].clear();
        while(m--) {
            int p,q,t;
            cin >> p >> q >> t;
            G[p].emplace_back(q,t);
        }
        int w;
        cin >> w;
        while(w--) {
            int t;
            cin >> t;
            G[0].emplace_back(t,0);
        }

        cout << Spfa() << '\n';
    }
}
signed main() {
    ios::sync_with_stdio(0);cin.tie(nullptr),cout.tie(nullptr);
    int _=1;
    // cin>>_;
    while(_--) {
        solve();
    }
    return 0;
}

/**
 *    author: Nijika_jia
 *    created: 2025.02.14 22:01:45
 */
```



#### 题目4.[孤岛营救问题](https://www.luogu.com.cn/problem/P4011)
- **解题方法**：双向BFS(线性时间复杂度) + 状压DP(记录有几把钥匙的状态)
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
// #define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 15 , M = 550;

int n,m,p,k;
int g[N][N],key[N * N];
int dist[N * N][1 << 10];
bool vis[N *  N][1 << 10];
vector<PII> G[M];
map<PII,int> mp;
void build() {
    int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            for (int d = 0; d < 4; d++) {
                int x = i + dir[d][0];
                int y = j + dir[d][1];
                if (x <= 0 || y <= 0 || x > n || y > m) continue;
                int a = g[i][j] , b = g[x][y];
                if (!mp.count({a,b})) G[a].emplace_back(b,0);
            }
        }
    }
}
int bfs() {
    memset(dist,0x3f,sizeof dist);
    deque<PII> q;
    dist[1][0] = 0;
    q.push_back({1,0});
    while (q.size()) {
        auto [u,cur] = q.front();
        q.pop_front();
        if (vis[u][cur]) continue;
        vis[u][cur] = 1;
        if (u == n*m) return dist[u][cur];
        if (key[u]) {
            int next = cur | key[u];
            if (dist[u][next] > dist[u][cur]) {
                dist[u][next] = dist[u][cur];
                q.push_front({u,next});
            }
        }

        for (auto [v,w] : G[u]) {
            if (w && !(cur >> w - 1 & 1)) continue;
            if (dist[u][cur] + 1 < dist[v][cur]) {
                dist[v][cur] = dist[u][cur] + 1;
                q.push_back({v,cur});
            }
        }
    }

    return -1;
}
void solve() {
    cin >> n >> m >> p;

    for (int i = 1, t = 1; i <= n; i++)
        for (int j = 1;j <= m;j++)
            g[i][j] = t++;

    cin >> k;
    while (k--) {
        int x1,y1,x2,y2,c;
        cin >> x1 >> y1 >> x2 >> y2 >> c;
        int a = g[x1][y1] , b = g[x2][y2];
        mp[{a,b}] = 1;mp[{b,a}] = 1;
        if (c) G[a].emplace_back(b,c) , G[b].emplace_back(a,c);
    }

    build();

    int s;
    cin >> s;
    while (s--) {
        int x,y,c;
        cin >> x >> y >> c;
        key[g[x][y]] |= 1 << c - 1;
    }

    cout << bfs() << '\n';
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(nullptr), cout.tie(nullptr);
    int _ = 1;
    // cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}

/**
 *    author: Nijika_jia
 *    created: 2025.02.14 23:33:54
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```







#### 额外收获:

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
- 🥲严重怀疑蓝桥题目的难度是乱整的
- 👣正在调整自己的码风为 K&R^[K&R 风格：大括号和语句在同一行。这样减少了代码行数，使得代码更紧凑，适合短小的函数和语句块。] 风格
### 🍕封面图
![](/posts/备战传智蓝桥DAY-8_2025-02-15-00-38-23.png)
---