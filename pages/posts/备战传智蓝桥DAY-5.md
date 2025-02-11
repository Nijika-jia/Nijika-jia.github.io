---
layout: post
title: 备战传智蓝桥DAY-5
date: 2025-02-12 01:07:48
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
cover : /posts/备战传智蓝桥DAY-5_2025-02-12-02-31-15.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 14:00-18:00   | 📝 刷最短路题目         | 练    |
| 20:00-01:00   | 📝 刷最短路题目         | 练    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 17 道题目(写爽了)
  >蓝桥云课
  - [仓库的添加](https://www.lanqiao.cn/problems/4470/learning/) - 最短路问题[简单🟢]
  - [地铁最短路径与最少换乘](https://www.lanqiao.cn/problems/4556/learning/) - 最短路+最短路径[简单🟢]
  - [最优修改](https://www.lanqiao.cn/problems/3801/learning/) - 最短路问题,贪心[简单🟢]
  - [出差](https://www.lanqiao.cn/problems/2194/learning/) - 最短路问题[困难🔴]
  - [路径](https://www.lanqiao.cn/problems/1460/learning/) - 最短路问题[中等🟠]
  - [字母阶梯游戏](https://www.lanqiao.cn/problems/3903/learning/) - 最短路问题[简单🟢]
  - [小怂的黄牛派对](https://www.lanqiao.cn/problems/5031/learning/) - 最短路问题[简单🟢]
  - [慈善晚会](https://www.lanqiao.cn/problems/3035/learning/) - 最短路问题,贪心[中等🟠]
  - [保存体力](https://www.lanqiao.cn/problems/3007/learning/) - 最短路问题[中等🟠]
  - [迷宫](https://www.lanqiao.cn/problems/4200/learning/) - dp[简单🟢]
  - [运输粮草](https://www.lanqiao.cn/problems/4478/learning/) - 最短路问题[简单🟢]
  - [城市间的交易](https://www.lanqiao.cn/problems/8336/learning/) - 图论,Floyd[简单🟢]
  - [环境治理](https://www.lanqiao.cn/problems/2178/learning/) - 最短路问题,二分[困难🔴]
  - [小蓝组网](https://www.lanqiao.cn/problems/3138/learning/) - 最短路问题[困难🔴]
  - [指数移动](https://www.lanqiao.cn/problems/1657/learning/) - Floyd[困难🔴]
  - [最短路问题](https://www.lanqiao.cn/problems/3828/learning/) - Floyd,数学[简单🟢]
  - [打印路径](https://www.lanqiao.cn/problems/1656/learning/) - Floyd[中等🟠]
  - ❌ **未完成**：
  - [地牢探险](https://www.lanqiao.cn/problems/3274/learning/) - 01-Tire[中等]
---

### 💡 **解题思路与总结**

#### 题目1.[仓库的添加](https://www.lanqiao.cn/problems/4470/learning/)
- **解题方法**：floyd
- **遇到的问题**：出题人把样例都写错了,明明是输出除了主仓库自己,到其他仓库的最短路,包括新仓库,它让我输出啥啊,覆盖最短路也是直接覆盖,不是更新最小值,阴成啥样了🙂
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
int dist[210][210];
void floyd()
{
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}
void solve()
{
    cin >> n;
    memset(dist,0x3f,sizeof dist);
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            cin >> dist[i][j];
    cin >> m;
    n++;
    for(int i=0;i<m;i++)
    {
        int a,b;
        cin >> a >> b;
        dist[n][a] = b;// 直接覆盖,不是更新 // [!code warning] 
        dist[a][n] = b;// [!code warning]
    }
    floyd();
    for(int i=2;i<=n;i++) cout << dist[1][i] << ' ';
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
 *    created: 2025.02.12 00:34:55
 */
```

#### 题目2.[地铁最短路径与最少换乘](https://www.lanqiao.cn/problems/4556/learning/)
- **解题方法**：DIjkstra + BFS
- **遇到的问题**：最短路径都忘了要用BFS了,DFS调了半天,才记起还有BFS
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
constexpr int N =  1 * 1e5 + 10,M = 2 * 1e5 + 10;

int n,m;
int ans = INF;
int dist[N];
bool vis[N];
vector<PII> G[M];
int Dijkstra(int st,int ed)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,st});
    dist[st] = 0;
    while(heap.size())
    {
        auto [_,u] = heap.top();
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
    return dist[ed] == INF ? -1 : dist[ed];
}
int bfs(int st,int ed)
{
    queue<PII> q;
    q.push({st,0});
    vis[st] = 1;
    while(q.size())
    {
        auto [u,d] = q.front();
        q.pop();
        if(u == ed) return d;
        for(auto [v,_] : G[u])
        {
            if(vis[v]) continue;
            vis[v] = 1;
            q.push({v,d+1});
        }
    }
    return -1;
}
void solve()
{
    cin >> n >> m;
    for(int i=0;i<m;i++)
    {
        int a,b,t;
        cin >> a >> b >> t;
        G[a].push_back({b,t});
        G[b].push_back({a,t});
    }
    int s,d;
    cin >> s >> d;
    cout << Dijkstra(s,d) << '\n';
    memset(vis,false,sizeof vis);
    cout << bfs(s,d) << '\n';
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
 *    created: 2025.02.12 00:06:58
 */
```

#### 题目3.[最优修改](https://www.lanqiao.cn/problems/3801/learning/)
- **解题方法**：floyd
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
constexpr int N =  30,M = 1 * 1e4 + 10;

int n;
int dist[N][N];
void floyd()
{
    for(int k=1;k<=26;k++)
        for(int i=1;i<=26;i++)
            for(int j=1;j<=26;j++)
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
}
void solve()
{
    cin >> n;
    string st,ed;
    cin >> st >> ed;
    for(int i=1;i<=26;i++)
        for(int j=1;j<=26;j++)
            cin >> dist[i][j];

    floyd();
    int ans = 0;
    for(int i=0;i<n;i++)
    {
        ans += dist[st[i] - 'a' + 1][ed[i] - 'a' + 1];
    }
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
 *    created: 2025.02.11 23:51:10
 */
```

#### 题目4.[出差](https://www.lanqiao.cn/problems/2194/learning/)
- **解题方法**：floyd,就变化了一点点,一点点
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
constexpr int N =  1 * 1e3 + 10,M = 1 * 1e4 + 10;

int n,m;
int dist[N][N],c[N];
void floyd()
{
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j] + c[k]); // [!code ++]
}
void solve()
{
    cin >> n >> m;
    for(int i=1;i<=n;i++) cin >> c[i];
    memset(dist,0x3f,sizeof dist);
    for(int i=1;i<=n;i++) dist[i][i] = 0;
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
        dist[v][u] = min(dist[v][u],w);
    }
    floyd();
    cout << dist[1][n] << '\n';
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
 *    created: 2025.02.11 23:51:10
 */
```

#### 题目5.[路径](https://www.lanqiao.cn/problems/1460/learning/)
- **解题方法**：建图后Dijkstra
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

vector<PII> G[M];
int dist[M];
bool vis[M];
int Dijkstra(int st,int ed)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,st});
    dist[st] = 0;
    while(heap.size())
    {
        auto [_,u] = heap.top();
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

    return dist[ed];
}
void solve()
{
    for(int i=1;i<=2021;i++)
        for(int j=1;j<=2021;j++){
            if(abs(i-j) > 21) continue;
            int lcm = i * j / __gcd(i,j);
            G[i].push_back({j,lcm});
            G[j].push_back({i,lcm});
        }
    cout << Dijkstra(1,2021) << '\n';
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
 *    created: 2025.02.11 23:17:26
 */
```

#### 题目6.[字母阶梯游戏](https://www.lanqiao.cn/problems/3903/learning/)
- **解题方法**：Dijkstra,考你的恐怕就是建图了
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

int n,len;
unordered_map<string,int> mp;
vector<int> G[M];
int dist[M];
bool vis[M];
int Dijkstra(int st,int ed)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,st});
    dist[st] = 0;
    while(heap.size())
    {
        auto [_,u] = heap.top();
        heap.pop();
        if(vis[u]) continue;
        vis[u] = 1;
        for(int v : G[u])
        {
            if(dist[u] + 1 < dist[v])
            {
                dist[v] = dist[u] + 1;
                heap.push({dist[v],v});
            }
        }
    }

    return dist[ed];
}
void solve()
{
    cin >> n;
    vector<string> word;
    for(int i=1;i<=n;i++)
    {
        string t;
        cin >> t;
        mp[t] = i;
        word.push_back(t);
    }
    len = word[0].size();
    auto check = [](string a,string b){
        int cnt = 0;
        for(int i=0;i<len;i++)
        {
            if(a[i] == b[i]) cnt++;
        }
        return cnt == len - 1;
    };
    for(string a : word)
    {
        for(string b : word)
        {
            if(check(a,b)) G[mp[a]].push_back(mp[b]);
        }
    }
    string st,ed;
    cin >> st >> ed;
    cout << Dijkstra(mp[st],mp[ed]) << '\n';
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
 *    created: 2025.02.11 23:17:26
 */
```

#### 题目7.[小怂的黄牛派对](https://www.lanqiao.cn/problems/5031/learning/)
- **解题方法**：floyd
- **解决方案**：跟[慈善晚会](https://www.lanqiao.cn/problems/3035/learning/)差不多,应该说大差不差
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 1 * 1e3 + 10;

int n,m,p;
int dist[M][M];
void floyd()
{
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
}
void solve()
{
    cin >> n >> m >> p;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            if(i == j) dist[i][j] = 0;
            else dist[i][j] = INF; 
    
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
    }
    floyd();
    int ans = 0;
    for(int i=1;i<=n;i++)
    {
        ans = max(ans,dist[i][p]+dist[p][i]);
    }

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
 *    created: 2025.02.11 22:53:49
 */
```

#### 题目8.[慈善晚会](https://www.lanqiao.cn/problems/3035/learning/)
- **解题方法**：floyd
- **遇到的问题**：要算来回的消费,你请的别人来肯定还是要请别人回去嘛
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
constexpr int N =  1 * 1e6 + 10,M = 1 * 1e3 + 10;

int n,m,p;
int dist[M][M];
void floyd()
{
    for(int k=1;k<=n;k++)
        for(int i=1;i<=n;i++)
            for(int j=1;j<=n;j++)
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
}
void solve()
{
    cin >> n >> m >> p;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            if(i == j) dist[i][j] = 0;
            else dist[i][j] = INF; 
    
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
    }
    floyd();
    int ans = 0;
    for(int i=1;i<=n;i++)
    {
        if(dist[i][p] == INF) ans = max(ans,61109567*2);
        ans = max(ans,dist[i][p]+dist[p][i]);
    }

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
 *    created: 2025.02.11 22:53:49
 */
```

#### 题目9.[保存体力](https://www.lanqiao.cn/problems/3007/learning/)
- **解题方法**：DIjkstra 或 SPFA 初始加入-1的边会如何呢,当然还是求最短乘积的路,但他却帮我们求出来最大的了,负数倒过来就是最大的
- **遇到的问题**：不是要求最大累乘的答案嘛,开始想着求最长路,走w大的路线,发现好像有自环SPFA,DIjkstra都不行了(越转越大嘛,肯定没个最大的)
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
constexpr int N =  1 * 1e4 + 10,M = 1 * 1e5 + 10;

typedef pair<double,int> PDI;
int n,m,t;
vector<PDI> G[M];
double dist[N];
bool vis[N];
void spfa()
{
    fill(dist+1,dist+1+n,1e18);
    queue<int> q;
    dist[1] = -1;
    q.push(1);
    vis[1] = 1;
    while(q.size())
    {
        int u = q.front();
        q.pop();
        vis[u] = 0;
        for(auto [w,v] : G[u])
        {
            if(dist[u] * w < dist[v])
            {
                dist[v] = dist[u] * w;
                if(vis[v]) continue;
                vis[v] = 1;
                q.push(v);
            }
        }
    }
}
void solve()
{
    cin >> n >> m >> t;
    for(int i=0;i<m;i++)
    {
        int u,v;
        double w;
        cin >> u >> v >> w;
        G[u].push_back({w,v});
        G[v].push_back({w,u});
    }
    spfa();
    if(dist[n] != 1e18) printf("%.8lf\n",t * -dist[n]);
    else cout << -1 << '\n'; 
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
 *    created: 2025.02.11 21:57:08
 */
```

#### 题目10.[迷宫](https://www.lanqiao.cn/problems/4200/learning/)
- **解题方法**：标签说的floyd,我兴致勃勃的点进来,结果是dp
- **遇到的问题**：dp转移不会写
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
int g[M][M],dp[M][M];
char trap[M][M];
void solve()
{
    int k,p;
    cin >> n >> m >> k >> p;
    for(int i=1;i<=n;i++)
        for(int j=1;j<=m;j++){
            cin >> g[i][j];
        }
    for(int i=0;i<k;i++){
        int x,y,c;
        cin >> x >> y >> c;
        g[x][y] += c;
    }
    for(int i=0;i<p;i++){
        int x,y;
        char c;
        cin >> x >> y >> c;
        trap[x][y] = c;
    }
    memset(dp,0x3f,sizeof dp);
    dp[1][1] = g[1][1];
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=m;j++)
        {
            if(i == 1 && j == 1) continue;
            dp[i][j] = min(dp[i][j-1],dp[i-1][j]) + g[i][j];

            if(i > 2 && trap[i-2][j] == 'D')
            dp[i][j] = min(g[i-1][j] + dp[i-2][j] + g[i][j],dp[i][j]);

            if(j > 2 && trap[i][j-2] == 'R')
            dp[i][j] = min(g[i][j-1] + dp[i][j-2] + g[i][j],dp[i][j]);
        }
    }

    cout << dp[n][m] << '\n';
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
 *    created: 2025.02.11 20:36:07
 */
```

#### 题目11.[运输粮草](https://www.lanqiao.cn/problems/4478/learning/)
- **解题方法**：分步的floyd
- **遇到的问题**：想着跑一遍floyd就行了,但这样会导致一部分路打通,没有占领的地方也会更新
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

int n;
int dist[M][M];
void floyd(int k)
{
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            dist[i][j] = min(dist[i][j] , dist[i][k] + dist[k][j]);
}
void solve()
{
    int x,k,T;
    cin >> n >> k;
    vector<int> city;
    for(int i=0;i<k;i++)
    {
        cin >> x;
        city.push_back(x);
    }
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++){
            cin >> dist[i][j];
            if(dist[i][j] == -1) dist[i][j] = INF;
        }
    for(int u : city) floyd(u);
    cin >> T;
    int total = 0;
    for(int i=1;i<=T;i++)
    {
        while(1)
        {
            cin >> x;
            if(x == 0) break;
            city.push_back(x);
            floyd(x);
        }
        
        for(int u : city)
            for(int v : city){
                if(dist[u][v] == INF) continue;
                total += dist[u][v];
            }
    }

    cout << total << '\n';
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
 *    created: 2025.02.11 20:36:07
 */
```

#### 题目12.[城市间的交易](https://www.lanqiao.cn/problems/8336/learning/)
- **解题方法**：Floyd后枚举更新当前城市到其他城市的利润最大值
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

int n,m;
int dist[M][M],s[M],a[M],p[M];
void floyd()
{
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
            }
        }
    }
}
void init()
{
    for(int i=1;i<=n;i++)
        for(int j=1;j<=n;j++)
            if(i==j) dist[i][j] = 0;
            else dist[i][j] = INF;
}
void solve()
{
    cin >> n >> m;
    init();
    for(int i=1;i<=n;i++) cin >> a[i] >> p[i] >> s[i];
    for(int i=0;i<m;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        dist[u][v] = min(dist[u][v],w);
        dist[v][u] = min(dist[v][u],w);
    }
    floyd();
    int total = 0;
    for(int i=1;i<=n;i++)
    {
        int money = 0;
        for(int j=1;j<=n;j++)
        {
            money = max(money,a[i] * (s[j] - p[i]) - a[i] * dist[i][j]);
        }
        total += money;
    }
    
    cout << total << '\n';
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
 *    created: 2025.02.11 17:24:43
 */
```

#### 题目13.[环境治理](https://www.lanqiao.cn/problems/2178/learning/)
- **解题方法**：可以二分答案天数,处理图之后然后用Floyd检验
- **遇到的问题**：代码写成屎山了,唉,反正过了
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
constexpr int N =  1 * 1e6 + 10,M = 150;

int n,Q;
int dist[M][M],limit[M][M],backup[M][M],backup2[M][M];
void floyd()
{
    for(int k=0;k<n;k++)
    {
        for(int i=0;i<n;i++)
        {
            for(int j=0;j<n;j++)
            {
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
            }
        }
    }
}
void solve()
{
    cin >> n >> Q;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            cin >> dist[i][j];
        }
    }
    memcpy(backup,dist,sizeof dist);
    floyd();
    int t;t = 0;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            t += dist[i][j];
        }
    }
    if(t <= Q)
    {
        cout << 0;
        return;
    }
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            cin >> limit[i][j];
        }
    }
    memcpy(backup2,limit,sizeof limit);
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                limit[i][j] = min(limit[i][j],limit[i][k] + limit[k][j]);
            }
        }
    }
    t = 0;
    for(int i=0;i<n;i++)
    {
        for(int j=0;j<n;j++)
        {
            t += limit[i][j];
        }
    }
    if(t > Q)
    {
        cout << -1;
        return;
    }
    memcpy(limit,backup2,sizeof backup2);
    int l = 0, r = 1e7 + 1;
    while(l < r)
    {
        memcpy(dist,backup,sizeof backup);
        int mid = l + r>> 1;
        int i = 1,cnt = 1;
        while(cnt <= mid)
        {
            if(i == n + 1) i = 1;
            for(int j=0;j<n;j++)
            {
                if(dist[i-1][j] - 1 < limit[i-1][j]) continue;
                dist[i-1][j] --;
                dist[j][i-1] --;
            }
            cnt ++;i++;
        }
        floyd();
        int total = 0;
        for(int i=0;i<n;i++)
        {
            for(int j=0;j<n;j++)
            {
                total += dist[i][j];
            }
        }
        if(total <= Q) r = mid;
        else l = mid + 1;
    }

    cout << l << '\n';
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
 *    created: 2025.02.11 13:57:14
 */
```

#### 题目14.[小蓝组网](https://www.lanqiao.cn/problems/3138/learning/)
- **解题方法**：Floyd,dist[i][j]为INF的时候就是不连通
- **遇到的问题**：NO我以为就不输出答案了
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
constexpr int N =  1 * 1e6 + 10,M = 550;

int n,m;
int dist[M][M];
void floyd()
{
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
            }
        }
    }
}
void solve()
{
    cin >> n >> m;
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {
            if(i == j) dist[i][j] = 0;
            else dist[i][j] = INF;
        }
    }
    for(int i=0;i<m;i++)
    {
        int a,b;
        cin >> a >> b;
        dist[a][b] = 1;
        dist[b][a] = 1;
    }
    floyd();
    int ans = -INF;
    bool f = false;
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {
            // cout << dist[i][j] << ' ';
            if(dist[i][j] == INF)
            {
                f = true;
                continue;
            }
            ans = max(ans,dist[i][j]);
        }
        // cout << '\n';
    }
    if(f) cout << "NO\n";
    else cout << "YES\n";
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
 *    created: 2025.02.11 13:57:14
 */
```

#### 题目15.[指数移动](https://www.lanqiao.cn/problems/1657/learning/)
- **解题方法**：Floyd(有点抽象,位运算有关的)
- **遇到的问题**：我勒个三维数组
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
constexpr int N =  1 * 1e6 + 10,M = 55;

int n,m;
int dist[M][M];
bool p[M][M][33];
void solve()
{
    cin >> n >> m;
    memset(dist,0x3f,sizeof dist);
    for(int i=0;i<m;i++)
    {
        int a,b;
        cin >> a >> b;
        dist[a][b] = 1;
        p[a][b][0] = true;
    }
    for(int t=1;t<=32;t++)
    {
        for(int k=1;k<=n;k++)
        {
            for(int i=1;i<=n;i++)
            {
                for(int j=1;j<=n;j++)
                {
                    if(p[i][k][t-1] && p[k][j][t-1])
                    {
                        p[i][j][t] = true;
                        dist[i][j] = 1;
                    }
                }
            }
        }
    }
    
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
            }
        }
    }
    cout << dist[1][n] << '\n';
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
 *    created: 2025.02.11 13:57:14
 */
```

#### 题目16.[最短路问题](https://www.lanqiao.cn/problems/3828/learning/)
- **解题方法**：看到数学以为又是啥高级的,结果,判断是不是质数,不过也学到了判断两者有且仅有一个怎么写了,int类函数给两个数用,两个函数相加==1就是满足了
- **遇到的问题**：恐怕就是判断两者有且仅有一个
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

int n,q;
int dist[M][M];
int isprime(int x)
{
    if(x < 2) return 0;
    for(int i=2;i<=x/i;i++)
    {
        if(x % i == 0) return 0;
    }
    return 1;
}
void floyd()
{
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                dist[i][j] = min(dist[i][j],dist[i][k] + dist[k][j]);
            }
        }
    }
}
void solve()
{
    cin >> n >> q;
    for(int i=1;i<=n;i++)
    {
        for(int j=1;j<=n;j++)
        {
            if(i == j) dist[i][j] = 0;
            if(i < j && isprime(i) + isprime(j) == 1)
            {
                dist[i][j] = i / __gcd(i,j) * j;
            }
            else dist[i][j] = INF;
        }
    }
    floyd();
    while(q--)
    {
        int a,b;
        cin >> a >> b;
        cout << (dist[a][b] == INF ? -1 : dist[a][b]) << '\n';
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
 *    created: 2025.02.11 13:57:14
 */
```

#### 题目17.[打印路径](https://www.lanqiao.cn/problems/1656/learning/)
- **解题方法**：考的就是你会不会记录这个最短路是那个路径来的,path[i][j] = k;
- **解决方案**：
```cpp:line-numbers{62,63,64,65,66}
#include<bits/stdc++.h>
// #define int long long //memset数组为0x3f时自觉去掉
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n;
int dist[M][M],tax[N],path[M][M];
void floyd()
{
    for(int k=1;k<=n;k++)
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                int w = dist[i][k] + dist[k][j] + tax[k];
                if(w < dist[i][j])
                {
                    dist[i][j] = w;
                    path[i][j] = k;
                }
                else if(w == dist[i][j] && path[i][k] < path[i][j]) path[i][j] = path[i][k];
            }
        }
    }
}
void solve()
{
    while(1)
    {
        cin >> n;
        if(n == 0) break;
        
        for(int i=1;i<=n;i++)
        {
            for(int j=1;j<=n;j++)
            {
                cin >> dist[i][j];
                if(dist[i][j] == -1) dist[i][j] = INF;
                path[i][j] = j;
            }
            
        }
        for(int i=1;i<=n;i++) cin >> tax[i];
        
        floyd();

        int st,ed;
        while(1)
        {
            cin >> st >> ed;
            if(st == -1 && ed == -1) break;
            printf("From %d to %d :\n",st,ed);
            printf("Path: ");
            int p = st;
            printf("%d",p);
            while(p != ed)
            {
                printf("-->%d",path[p][ed]);
                p = path[p][ed];
            }
            printf("\nTotal cost : %d\n\n",dist[st][ed]);
        }
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
 *    created: 2025.02.11 13:57:14
 */
```

#### 额外收获:
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：复习应该到位了
  - 📊 **刷题**：看似很多,其实还没刷爽
  - ⏳ **时间管理**：闹钟闹醒我了,但我还是睡到中午了
---

### 📖 **明日计划**
  - 💻 回顾一下最小生成树,刷点相关的题,晚点再复习最短路(就是再刷点这类题)
---

### 📝 **附注**

### 🍕封面图
![](/posts/备战传智蓝桥DAY-5_2025-02-12-02-31-15.png)
---