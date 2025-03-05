---
layout: post
title: 备战传智蓝桥DAY-3
date: 2025-02-09 23:10:31
tags: 
    - 算法
    - Dijkstra
    - 最短路
    - 图论
    - 蓝桥杯
    - BFS
    - 蓝桥云课
    - DP
    - 数据结构
    - 时空复杂度优化
    - 图的遍历
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-3_2025-02-10-01-16-34.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:30-16:00   | 📝 刷最短路(Dijkstra)题目         | 熟练最短路模型类型的题    |
| 16:00-17:00   | 😐 被胁迫上山背柴         | 别中途看到太奶奶就好    |
| 19:30-23:00   | 📝 继续补刷没刷完的最短路(Dijkstra)题目         | 补下午的时间    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 8 道题目(终于完成甚至超额完成目标了)。
  >蓝桥云课
  - [限高杆](https://www.lanqiao.cn/problems/2357/learning/) - 分层图DIjkstra[困难🔴]
  - [小鱼吃虾米](https://www.lanqiao.cn/problems/19849/learning/) - Dijkstra(一遍过)[中等🟠]
  - [星际旅行](https://www.lanqiao.cn/problems/19726/learning/) - Dijkstra(BFS也能水过去)[困难🔴]
  - [蓝桥王国](https://www.lanqiao.cn/problems/1122/learning/) - Dijkstra[困难🔴]
  - [混境之地1](https://www.lanqiao.cn/problems/3816/learning/) - Dijkstra(一遍过)[中等🟠]
  - [混境之地3](https://www.lanqiao.cn/problems/3818/learning/) - Dijkstra(一遍过)[简单🟢]
  - [Dijkstra求最短路2](https://www.lanqiao.cn/problems/19840/learning/) -  Dijkstra(板子题还能说啥一遍过)[中等🟠]
  - [不同角度【算法赛】](https://www.lanqiao.cn/problems/19949/learning/) - 字符串[简单🟢]
  - 差一道完结蓝桥云课的Dijkstra类的题!!!
  ![](/posts/备战传智蓝桥DAY-3_2025-02-10-00-41-25.png)
---

### 💡 **解题思路与总结**

#### 题目1.[限高杆](https://www.lanqiao.cn/problems/2357/learning/)
- **解题方法**：分层图Dijkstra
- **遇到的问题**：又没认真读题,想着还挺简单的,直接分别跑两次Dijkstra,一次就假设没有限高杆跑一次最短路,再跑一次有限高杆最短路,两者一减答案不就出来了😎,样例也是非常给面子啊,对了!一交,WA😱!

```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  2 * 1e4 + 10,M = 5 * 1e3 + 10;

int n,m;
vector<tuple<int,int,int>> G[N];
int Dijkstra(bool limt)
{
    vector<int> dist(n+1,INF);
    vector<bool> vis(n+1,false);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    dist[1] = 0;
    heap.push({0,1});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w,gan] : G[u])
        {
            if(dist[u] + w < dist[v] && (gan != 1 || !limt))
            {
                dist[v] = dist[u] + w;
                heap.push({dist[v],v});
            }
        }
    }

    return dist[n];
}
void solve()
{
    cin >> n >> m;
    for(int i=0;i<m;i++)
    {
        int a,b,c,d;
        cin >> a >> b >> c >> d;
        G[a].push_back({b,c,d});
        G[b].push_back({a,c,d});
    }

    cout << Dijkstra(true) - Dijkstra(false) << '\n';
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
 *    created: 2025.02.09 21:13:23
 */
```
后面一读题,啊米诺斯,原来只能拆两个限高杆,样例也刚刚好就是两个,出题人你🙂
- **解决方案**：试了用优先队列保存当前状态拆了几次,好像也不行,看了题解,又学到新东西了,分层图Dijkstra,具体恐怕就是一个节点存了几种状态,没有拆,拆?搞不懂,给我的感觉就是,建了很多的点和边,看那一坨push_back()
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

int n,m;
int dist[N];
bool vis[N];
vector<PII> G[N];
int Dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    memset(vis,false,sizeof vis);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    dist[1] = 0;
    heap.push({0,1});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                heap.push({dist[v],v});
            }
        }
    }

    return dist[n];
}
void solve()
{
    cin >> n >> m;
    for(int i=0;i<m;i++)
    {
        int a,b,c,d;
        cin >> a >> b >> c >> d;
        if(d == 1)
        {
            G[a].push_back({b+n,c});
            G[b].push_back({a+n,c});
            G[a+n].push_back({b+n+n,c});
            G[b+n].push_back({a+n+n,c});
        }
        else
        {
            G[a].push_back({b,c});
            G[b].push_back({a,c});
            G[a+n].push_back({b+n,c});
            G[b+n].push_back({a+n,c});
            G[a+n+n].push_back({b+n+n,c});
            G[b+n+n].push_back({a+n+n,c});
        }
    }

    Dijkstra();

    cout << dist[n] - min(dist[n+n+n],min(dist[n],dist[n+n]));
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
 *    created: 2025.02.09 21:13:23
 */
```

#### 题目2.[小鱼吃虾米](https://www.lanqiao.cn/problems/19849/learning/)
- **解题方法**：写完过了才看到标签有反图,我正向建图的也过了啊,从n~1倒着跑Dijkstra不也行嘛.写完之后我以为我会TLE嘞,这个时间复杂度我看着就害怕(代码黄色部分),结果还是过了,题目水啊,我也水~
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e4 + 10,M = 5 * 1e3 + 10;

int n,m,k;
int dist[N];
bool vis[N];
vector<PII> G[N];
int Dijkstra(int st)
{
    memset(dist,0x3f,sizeof dist); // [!code warning]
    memset(vis,false,sizeof vis); // [!code warning]
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    dist[st] = 0;
    heap.push({0,st});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                heap.push({dist[v],v});
            } 
        }
    }

    return dist[1];
}
void solve()
{
    cin >> n >> m >> k;
    vector<int> birth(k);
    for(int i=0;i<k;i++)
    {
        cin >> birth[i];
    }
    for(int i=1;i<=n;i++) G[i].clear(); // [!code warning]
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
    }
    int ans = INF;
    for(int bir : birth)
    {
        ans = min(ans,Dijkstra(bir)); // [!code warning]
    }
    if(ans == INF) cout << -1 << '\n';
    else cout << ans << '\n';
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
 *    created: 2025.02.09 20:44:15
 */
```

#### 题目3.[星际旅行](https://www.lanqiao.cn/problems/19726/learning/)
- **解题方法**：BFS,(真的需要时间复杂度那么高的Dijkstra嘛)
- **遇到的问题**：Dijkstra写不来啊,这标签给我一种这题必须就用Dijkstra,后来妥协了用BFS;后面又是在判断下一层能不能走的时候忘写判断了,导致答案大了🙂
- **解决方案**：跟染色一样,只不过规定了最大能染多少层
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

int n,m,q;
bool st[N];
vector<int> G[N];
int bfs(int s,int limt)
{
    memset(st,false,sizeof st);
    queue<PII> q;
    q.push({0,s});
    int cnt = 1;
    st[s] = 1;
    while(q.size())
    {
        auto [d,u] = q.front();
        q.pop();
        for(int v : G[u])
        {
            if(d  < limt && !st[v]) // [!code warning]
            {
                st[v] = 1;
                cnt ++;
                q.push({d+1,v});
            }
        }
    }
    return cnt;
}
void solve()
{
    cin >> n >> m >> q;
    for(int i=0;i<m;i++)
    {
        int u,v;
        cin >> u >> v;
        G[u].push_back(v);
        G[v].push_back(u);
    }
    double total = 0;
    for(int i=0;i<q;i++)
    {
        int x,y;
        cin >> x >> y;
        total += bfs(x,y);
    }
    printf("%.2lf\n",total / q * 1.0);
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
 *    created: 2025.02.09 19:37:27
 */
```
::: warning 以前错的地方:被访问过得你也加进去是吧?
```cpp
int bfs(int s, int limt) {
    memset(st, false, sizeof st);
    queue<PII> q;
    q.push({0, s});
    int cnt = 1;
    while (q.size()) {
        auto [d, u] = q.front();
        q.pop();
        if (st[u]) continue;
        st[u] = 1;
        for (int v : G[u]) { 
            if (d + 1 <= limt) { // [!code warning]
                cnt++;
                q.push({d + 1, v});
            }
        }
    }
    return cnt;
}

```
:::

#### 题目4.[蓝桥王国](https://www.lanqiao.cn/problems/1122/learning/)
- **解题方法**： 你不会不知道跑一次就可以把从起点到所有点的最短路求出来吧?
- **遇到的问题**: 低级问题,w给了10^9可能会爆int,我给dist数组赋值了1e18+10,后面判断有没有找到最短路还是dist[i] == INF,属实是有点入机了
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

int n,m;
bool st[N];
int dist[N];
vector<PII> G[N];
void dijkstra()
{
    fill(dist,dist+1+n,1e18 + 10);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    dist[1] = 0;
    heap.push({0,1});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(st[u]) continue;
        st[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v])
            {
                dist[v] = dist[u] + w;
                heap.push({dist[v],v});
            }
        }
    }

    for(int i=1;i<=n;i++)
    {
        if(dist[i] == 1e18 + 10) cout << -1 << ' '; // [!code warning]
        else cout << dist[i] << ' ';
    }
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

    dijkstra();
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
 *    created: 2025.02.09 15:57:37
 */
```
#### 题目5.[混境之地1](https://www.lanqiao.cn/problems/3816/learning/)
- **解题方法**：map存储坐标的一维起点对上一维终点和花费,就是int->pair<int,int>,分两种情况更新
- **遇到的问题**：走到传送门还会消耗一点能量,而不是直接上去直接就传走了而不收你费了,开始没加,还让我调了一会儿
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

typedef pair<int,PII> PIPii;
int n,m,k,E;
int sx,sy,ex,ey;
char g[M][M];
bool st[M][M];
int dist[M][M];
int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
unordered_map<int,PII> mp;
int dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PIPii,vector<PIPii>,greater<PIPii>> heap;
    heap.push({0,{sx,sy}});
    dist[sx][sy] = 0; 
    while(heap.size())
    {
        auto [d,p] = heap.top();
        heap.pop();
        auto [x,y] = p;
        if(st[x][y]) continue;
        st[x][y] = 1;
        for(int i=0;i<4;i++)
        {
            int nx = x + dir[i][0], ny = y + dir[i][1];
            if(nx > n || ny > m || nx <= 0 || ny <= 0) continue;
            if(g[nx][ny] == '#') continue;
            int one = (nx - 1) * m + ny;
            if(dist[x][y] + 1 < dist[nx][ny])
            {
                dist[nx][ny] = dist[x][y] + 1;
                heap.push({dist[nx][ny],{nx,ny}});
            }
            if(mp.count(one))
            {
                int w = mp[one].second + 1; // [!code warning]
                int cx = (mp[one].first - 1) / m + 1 , cy = (mp[one].first - 1) % m + 1;
                if(dist[x][y] + w < dist[cx][cy])
                {
                    dist[cx][cy] = dist[x][y] + w;
                    heap.push({dist[cx][cy],{cx,cy}});
                }
            }
        }
    }

    if(E - dist[ex][ey] < 0) return -1;
    return E - dist[ex][ey];
}
void solve()
{
    cin >> n >> m;
    cin >> sx >> sy >> ex >> ey;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            cin >> g[i][j];
    cin >> k;
    for(int i=0;i<k;i++)
    {
        int x1,y1,x2,y2,p;
        cin >> x1 >> y1 >> x2 >> y2 >> p;
        mp[(x1 - 1) * m + y1] = {(x2 - 1) * m + y2 , p};
    }
    cin >> E;
    
    cout << dijkstra() << '\n';
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
 *    created: 2025.02.09 14:24:31
 */
```
#### 题目6.[混境之地3](https://www.lanqiao.cn/problems/3818/learning/)
- **解题方法**：当DIjkstra遇到了迷宫类的题,也是让我结合起来了,不愧是我,一遍过(其实开始用了一次dfs,全TLE了😂)
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

typedef pair<int,PII> PIPii;
int n,m,E;
int sx,sy,ex,ey;
char g[M][M];
bool st[M][M];
int dist[M][M];
int dir[4][2] = {{1,0},{0,1},{-1,0},{0,-1}};
bool dijkstra()
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PIPii,vector<PIPii>,greater<PIPii>> heap;
    heap.push({0,{sx,sy}});
    dist[sx][sy] = 0; 
    while(heap.size())
    {
        auto [d,p] = heap.top();
        heap.pop();
        auto [x,y] = p;
        if(st[x][y]) continue;
        st[x][y] = 1;
        for(int i=0;i<4;i++)
        {
            int nx = x + dir[i][0], ny = y + dir[i][1];
            if(nx > n || ny > m || nx <= 0 || ny <= 0) continue;
            if(g[nx][ny] == '#') continue;
            int w = g[nx][ny] == '.' ? 0 : (g[nx][ny] - 'A' + 1);
            if(dist[x][y] + w < dist[nx][ny])
            {
                dist[nx][ny] = dist[x][y] + w;
                heap.push({dist[nx][ny],{nx,ny}});
            }
        }
    }

    return dist[ex][ey] <= E;
}
void solve()
{
    cin >> n >> m;
    cin >> sx >> sy >> ex >> ey;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++)
            cin >> g[i][j];
    cin >> E;
    
    if(dijkstra()) cout << "Yes";
    else cout << "No";
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
 *    created: 2025.02.09 14:24:31
 */
```

#### 题目7.[Dijkstra求最短路2](https://www.lanqiao.cn/problems/19840/learning/)
- **解题方法**：模版题,没啥好说的

#### 题目8.[不同角度【算法赛】](https://www.lanqiao.cn/problems/19949/learning/)
- **解题方法**：字符串比大小和数字比大小我又搞混了,纯纯加0就行(特判一种情况)
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
    string s,t;
    cin >> s;
    if(s == "0") cout << 1 << '\n';
    else cout << s + "0" << '\n';
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
 *    created: 2025.02.09 13:49:53
 */
```
这我开始写的,完全是数字比大小了😂,喜提全WA
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
    string s,t;
    cin >> s;
    int i = s.size()-1;
    bool f = false;
    for(i ; i >= 0; i--)
    {
        if(s[i] != '9')
        {
            t.push_back(s[i--] + 1);
            f = true;
            break;
        }
        t.push_back('0');
    }
    for(i ; i >= 0; i--)
    {
        t.push_back(s[i]);
    }
    reverse(all(t));
    if(!f) cout << s + "0" << '\n';
    else cout << t << '\n';
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
 *    created: 2025.02.09 13:49:53
 */
```
#### 额外收获:
- 感受到了农民工的辛苦了,整的我肩膀老疼了,人老了,不行了,附图
![](/posts/备战传智蓝桥DAY-3_2025-02-10-00-37-41.png)
![](/posts/备战传智蓝桥DAY-3_2025-02-10-00-37-18.png)
- 一维二维互相转化都会吧?,我不会啊~,我是说下标如果从1开始呢
![](/posts/备战传智蓝桥DAY-3_2025-02-10-00-45-08.png)
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：没复习拓扑排序,感觉问题不大,至少学会了Dijkstra解决一部分的题了
  - 📊 **刷题**：是不是变快了点??
  - ⏳ **时间管理**：又睡到中午,然后下午还被叫去干活,晚上只能默默补回来了,凌晨24点还在打文章
---

### 📖 **明日计划**
  - 💻 完成 7 道题目，学习多源最短路了,差一道完结,明天去把它解决了(看着是dp所以没写)
---

### 📝 **附注**
- 什么时候有时间让ai写一个脚本吧,就那种框架md写好的那种,复制粘贴还是太要操作了(问:ai,ai,复制粘贴还是太要操作了,有咩有什么简单不吃操作的方法呢? ai:有的兄弟,有的)
- 🐱 根本不好申请GItHub学生权益啊,太严格了,在家,等回学校再说吧
### 🍕封面图
![](/posts/备战传智蓝桥DAY-3_2025-02-10-01-16-34.png)
---
