---
layout: post
title: 备战传智蓝桥DAY-9
date: 2025-02-16 02:43:47
tags: 
    - 算法
    - 图论
    - 最短路
    - 最短路计数
    - 次短路
    - 次短路计数
    - 求最小环
    - Dijkstra
    - SPFA
    - Floyd
    - K & R
    - BFS
    - DFS
    - 堆优化
    - Bellman-Ford
    - DP+最短路
    - A*
    - 竞赛
    - 蓝桥杯
    - 蓝桥云课
    - 洛谷
    - AcWing
    - Dotcpp
    - 题解
    - 代码模板
    - C++
    - 竞赛编程
    - 思维

categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-9_2025-02-16-02-44-54.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 13:00-16:00   | 📝 刷题最短路的综合应用  | 
| 22:00-02:40   | 📝 刷最短路综合题目         |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 7 道题目
  >蓝桥云课
  - [对联【算法赛】](https://www.lanqiao.cn/problems/20238/learning/) - 思维[中等🟠]
  >洛谷
  - [最短路计数](https://www.luogu.com.cn/problem/P1144) - 最短路计数[普及+/提高🟢]
  >acwing
  - [观光](https://www.acwing.com/problem/content/description/385/) - 最短路次短路计数[中等🟠]
  >dotcpp
  - [信息学奥赛一本通T1497-农场派对](https://www.dotcpp.com/oj/problem2406.html) - 最短路[]
  - [信息学奥赛一本通T1498-Roadblocks](https://www.dotcpp.com/oj/problem2407.html)] - 次短路问题[]
  - [信息学奥赛一本通T1502-汽车加油行驶问题](https://www.dotcpp.com/oj/problem2411.html) - 最短路问题[]
  - [信息学奥赛一本通T1494-Sightseeing Trip](https://www.dotcpp.com/oj/problem2403.html) - 无向图求最小环[]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**

#### 题目1.[对联【算法赛】](https://www.lanqiao.cn/problems/20238/learning/)
- **解题方法**：A中0和B中1最少的+A中1和B中0最少的 = 答案
- **遇到的问题**：
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;


void solve() {
    int n;
    cin >> n;
    string a,b;
    cin >> a >> b;
    PII A,B;
    for (auto c : a) 
        if (c == '0') A.first++; 
        else A.second++;
    for (auto c : b)
        if (c == '0') B.first++;
        else B.second++;
    
    cout << min(A.first, B.second) + min(A.second, B.first) << '\n';
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
 *    created: 2025.02.15 13:45:41
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```

#### 题目2.[最短路计数](https://www.luogu.com.cn/problem/P1144)
- **解题方法**：cnt数组记录到达每个点的最短路条数
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
constexpr int N = 1 * 1e6 + 10, M = 4 * 1e6 + 10 ,mod = 100003;

int n, m;
int dist[N], cnt[N];
vector<int> G[M];
void bfs() {
    memset(dist,0x3f,sizeof dist);
    queue<int> q;
    dist[1] = 0;
    cnt[1] = 1;
    q.emplace(1);
    while (q.size()) {
        int u = q.front();
        q.pop();
        for (int v : G[u]) {
            if (dist[u] + 1 < dist[v]) {
                dist[v] = dist[u] + 1;
                cnt[v] = cnt[u];
                q.emplace(v);
            }
            else if (dist[u] + 1 == dist[v]) {
                cnt[v] = (cnt[u] + cnt[v]) % mod;
            }
        }
    }
}
void solve() {
    cin >> n >> m;
    while (m--) {
        int a, b;
        cin >> a >> b;
        G[a].emplace_back(b);
        G[b].emplace_back(a);
    }

    bfs();

    for (int i = 1; i <= n; i++) cout << cnt[i] << '\n';
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
 *    created: 2025.02.15 15:07:37
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目3.[观光](https://www.acwing.com/problem/content/description/385/)
- **解题方法**：跟最短路计数差不多,多一维来记录次短路最后再验证就行
- **遇到的问题**：
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1000 + 10, M = 2 * 10000 + 10;

int n, m, S, F;
int dist[N][2], cnt[N][2];
bool vis[N][2];
vector<PII> G[M];
int Dijkstra() {
    memset(dist, 0x3f, sizeof dist);
    memset(vis, false, sizeof vis);
    memset(cnt, 0, sizeof cnt);
    priority_queue<PIII,vector<PIII>,greater<PIII>> pq;
    pq.emplace(0,S,0);
    dist[S][0] = 0;
    cnt[S][0] = 1;
    while (pq.size()) {
        auto [d, u, type] = pq.top();
        pq.pop();
        if (vis[u][type]) continue;
        vis[u][type] = 1;
        for (auto [v, w] : G[u]) {
            if (d + w < dist[v][0]) { //最短路能更新
                dist[v][1] = dist[v][0], cnt[v][1] = cnt[v][0];
                pq.emplace(dist[v][1],v,1);
                dist[v][0] = d + w, cnt[v][0] = cnt[u][type];
                pq.emplace(dist[v][0],v,0);
            }
            else if (dist[v][0] == d + w) { //最短路与当前状态相等
                cnt[v][0] += cnt[u][type];
            }
            else if (d + w < dist[v][1]) { //次短路能更新
                dist[v][1] = d + w, cnt[v][1] = cnt[u][type];
                pq.emplace(dist[v][1],v,1);
            }
            else if (dist[v][1] == d + w) { //次短路与当前状态相等
                cnt[v][1] += cnt[u][type];
            }
        }
    }

    int res = cnt[F][0];
    if (dist[F][0] + 1 == dist[F][1]) res += cnt[F][1]; //如果最短路加1刚好等于次短路的话
    return res;
}
void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) G[i].clear();
    while (m--) {
        int a ,b ,l;
        cin >> a >> b >> l;
        G[a].emplace_back(b,l);
    }
    cin >> S >> F;

    cout << Dijkstra() << '\n';
}

signed main() {
    ios::sync_with_stdio(0); cin.tie(nullptr), cout.tie(nullptr);
    int _ = 1;
    cin >> _;
    while (_--) {
        solve();
    }
    return 0;
}

/**
 *    author: Nijika_jia
 *    created: 2025.02.15 15:29:51
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目4.[信息学奥赛一本通T1497-农场派对](https://www.dotcpp.com/oj/problem2406.html)
- **解题方法**：求出终点到所有点的最短路,再从所有起点到终点的最短路相加更新最大值
- **遇到的问题**：
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
constexpr int N = 1 * 1000 + 10, M = 2 * 100000 + 10;

int n, m, X;
int dist[N],d[N];
bool vis[N];
vector<PII> G[M];
void Spfa(int st) {
    memset(dist, 0x3f, sizeof dist);
    queue<int> q;
    dist[st] = 0;
    q.emplace(st);
    while (q.size()) {
        int u = q.front();
        q.pop();
        vis[u] = 0;
        for (auto [v, w] : G[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (vis[v]) continue;
                vis[v] = 1;
                q.emplace(v);
            }
        }
    }
}
void solve() {
    cin >> n >> m >> X;
    while (m--) {
        int a, b, t;
        cin >> a >> b >> t;
        G[a].emplace_back(b, t);
    }

    for (int i = 1; i <= n; i++) G[0].emplace_back(i, 0);

    
    Spfa(X);
    memcpy(d, dist, sizeof dist);

    int ans = 0;
    for (int i = 1; i <= n; i++) {
        Spfa(i);
        ans = max(ans, dist[X] + d[i]);
    }

    cout << ans << '\n';
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
 *    created: 2025.02.15 23:22:14
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目5.[信息学奥赛一本通T1498-Roadblocks](https://www.dotcpp.com/oj/problem2407.html)
- **解题方法**：Dijkstra求次短路
- **遇到的问题**：
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
constexpr int N = 5000 + 10, M = 2 * 1e5 + 10;

int n, r;
int dist[N][2];
bool vis[N][2];
vector<PII> G[M];
void Dijkstra() {
    memset(dist, 0x3f, sizeof dist);
    priority_queue<PIII, vector<PIII>, greater<PIII>> pq;
    dist[1][0] = 0;
    pq.emplace(make_tuple(0, 1, 0));
    while (pq.size()) {
        auto [d, u, type] = pq.top();
        pq.pop();
        if(dist[u][type] < d) continue;
        if (vis[u][type]) continue;
        vis[u][type] = 1;
        for (auto [v, w] : G[u]) {
            if (d + w < dist[v][0]) {
                dist[v][1] = dist[v][0];
                pq.emplace(make_tuple(dist[v][1], v, 1));
                dist[v][0] = d + w;
                pq.emplace(make_tuple(dist[v][0], v, 0));
            }
            else if (d + w < dist[v][1]) {
                dist[v][1] = d + w;
                pq.emplace(make_tuple(dist[v][1], v, 1));
            }
        }
    }
}
void solve() {
    cin >> n >> r;
    while (r--) {
        int a, b, d;
        cin >> a >> b >> d;
        G[a].emplace_back(b,d);
        G[b].emplace_back(a,d);
    }

    Dijkstra();

    cout << dist[n][1] << '\n';
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
 *    created: 2025.02.15 23:45:28
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目6.[信息学奥赛一本通T1502-汽车加油行驶问题](https://www.dotcpp.com/oj/problem2411.html)
- **解题方法**：Dijkstra
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 100 + 10;

int n, k, A, B, C;
int g[M][M];
int dist[M][M][15];
int bfs() {
    memset(dist, 0x3f, sizeof dist);
    int dir[4][2] = {{1, 0}, {0, 1},{-1, 0}, {0, -1}};
    queue<PIII> q;
    q.emplace(1, 1, k);
    dist[1][1][k] = 0;
    while (q.size()) {
        auto [x, y, oil] = q.front();
        q.pop();
        if (g[x][y] == 1 && oil != k) {
            if (dist[x][y][oil] + A < dist[x][y][k]) {
                dist[x][y][k] = dist[x][y][oil] + A;
                q.emplace(x, y, k);
            }
            continue;
        }
        if (dist[x][y][oil] + A + C < dist[x][y][k]) {
            dist[x][y][k] = dist[x][y][oil] + A + C;
            q.emplace(x, y, k);
        }

        if(oil > 0) {
            for (int i = 0; i < 4; i++) {
                int nx = x + dir[i][0], ny = y + dir[i][1];
                if (nx <= 0 || ny <= 0 || nx > n || ny > n) continue;
                int w = (i == 2 || i == 3 ? B : 0);
                if (dist[x][y][oil] + w < dist[nx][ny][oil - 1]) {
                    dist[nx][ny][oil - 1] = dist[x][y][oil] + w;
                    q.emplace(nx, ny, oil - 1);
                }
            }
        }
        
    }

    int res = INF;
    for (int i = 0; i <= k; i++) {
        res = min(res,dist[n][n][i]);
    }

    return res;
}
void solve() {
    cin >> n >> k >> A >> B >> C;
    for(int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> g[i][j];
        }
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
 *    created: 2025.02.16 00:16:38
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```




#### 题目7.[信息学奥赛一本通T1494-Sightseeing Trip](https://www.dotcpp.com/oj/problem2403.html)
- **解题方法**：Floyd
- **遇到的问题**：会爆int
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 100 + 10;

int n, m;
int ans = INF;
int dist[M][M],path[M][M],g[M][M];
vector<int> hoop;
void getpath(int u, int v) {
    if (!path[u][v]) return;
    getpath(u, path[u][v]);
    hoop.emplace_back(path[u][v]);
    getpath(path[u][v], v);
}
void Floyd() {
    for (int k = 1; k <= n; k++) {

        for (int i = 1; i < k; i++) {
            for (int j = i + 1; j < k; j++) {
                if (ans > dist[i][j] + g[i][k] + g[k][j]) {
                    ans = dist[i][j] + g[i][k] + g[k][j];
                    hoop.clear();
                    hoop.emplace_back(i);
                    getpath(i,j);
                    hoop.emplace_back(j);
                    hoop.emplace_back(k);
                }
            }
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if(dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    path[i][j] = k;
                }
            }
        }
    }

}
void solve() {
    cin >> n >> m;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i == j) continue;
            dist[i][j] = g[i][j] = INF;
        }
    }

    while (m--) {
        int x, y, z;
        cin >> x >> y >> z;
        dist[x][y] = dist[y][x] = g[x][y] = g[y][x] = min(dist[x][y], z);
    }

    Floyd();

    if (ans == INF) cout << "No solution." << '\n';
    else {
        for (int x : hoop) cout << x << ' ';
    }
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
 *    created: 2025.02.16 01:49:53
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```






#### 额外收获:

---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：复习了一道以前写的题,[[CQOI2005] 新年好](https://www.luogu.com.cn/problem/P5764),数组开小了,找了好久都没找到哪错了
  - 📊 **刷题**：一本通的题刷着还是挺有收获的,都很有难度
  - ⏳ **时间管理**：寒假第一次睡过午饭
---

### 📖 **明日计划**
  - 💻 继续刷最短路,磕难题
---

### 📝 **附注**
- 👣正在调整自己的码风为 K&R 风格(每个逗号后面加空格也太阴间了吧)
- 🎸孤独摇滚第二季制作官宣了!!!期待
![](/posts/备战传智蓝桥DAY-9_2025-02-16-02-45-59.png)
### 🍕封面图
![](/posts/备战传智蓝桥DAY-9_2025-02-16-02-44-54.png)
---