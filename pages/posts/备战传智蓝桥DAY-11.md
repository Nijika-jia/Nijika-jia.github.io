---
layout: post
title: 备战传智蓝桥DAY-11
date: 2025-02-19 01:26:52
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
cover : /posts/备战传智蓝桥DAY-11_2025-02-19-01-29-01.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 19:20-01:10   | 📝 刷Floyd的扩展应用题目         |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 4 道题目
  > 洛谷![](/posts/备战传智蓝桥DAY-11_2025-02-19-01-27-22.png)
  - [[USACO2.4] 牛的旅行 Cow Tours](https://www.luogu.com.cn/problem/P1522) - 最短路,枚举,连通块[普及+/提高🟢]
  - [排序](https://www.luogu.com.cn/problem/P1347) - Floyd求闭包[普及+/提高🟢]
  - [无向图的最小环问题](https://www.luogu.com.cn/problem/P6175) - Floyd求最小坏[普及/提高−🟡]
  - [[USACO07NOV] Cow Relays G](https://www.luogu.com.cn/problem/P2886) - 矩阵乘法求恰好进过k条边的最短路[提高+/省选−🔵]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**

#### 题目1.[[USACO2.4] 牛的旅行 Cow Tours](https://www.luogu.com.cn/problem/P1522)
- **解题方法**：Floyd+连通块+枚举(不用连通块会被hack一个点)
- **遇到的问题**：输入问题,以后再也不这样处理输入了,找了半天都不知道哪里错了
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 自觉去掉，当需要 memset 数组为 0x3f 时使用
#define INF 1e20
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n;
int block[M];
PII node[M];
char g[M][M];
double dist[M][M],maxd[M],blockd[M];
void Floyd() {
    for (int k = 1; k <= n; k++) 
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                dist[i][j] = min(dist[i][j],dist[i][k]+dist[k][j]);
}
void dfs(int u,int id) {
    block[u] = id;
    for (int i = 1; i <= n; i++) {
        if (!block[i] && dist[u][i] < INF) {
            dfs(i,id);
        }
    }
}
void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x, y;
        cin >> x >> y;
        node[i] = {x,y};
    }
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cin >> g[i][j];
        }
    }

    auto getdist = [](const PII &a, const PII &b) {
        auto [x1, y1] = a; auto [x2, y2] = b;
        return sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));
    };
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (i != j) {
                if (g[i][j] == '1') dist[i][j] = getdist(node[i], node[j]);
                else dist[i][j] = INF;
            }else dist[i][j] = 0;
        }
    }

    Floyd();

    int id = 0;
    for (int i = 1; i <= n; i++) {
        if(!block[i]) dfs(i,++id);
    }
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (dist[i][j] < INF) {
                maxd[i] = max(maxd[i],dist[i][j]);
            }
        }
    }

    for (int i = 1; i <= id; i++) {
        double maxx = -INF;
        for (int j = 1; j <= n; j++) {
            if (block[j] == i) {
                maxx = max(maxx,maxd[j]);
            }
        }
        blockd[i] = maxx;
    }

    double res = INF;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            if (block[i] != block[j]) {
                res = min(res, max(getdist(node[i], node[j]) + maxd[i] + maxd[j], max(blockd[block[i]], blockd[block[j]]))) ;
            }
        }
    }

    printf("%lf",res);
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
 *    created: 2025.02.18 19:56:12
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```




#### 题目2.[排序](https://www.luogu.com.cn/problem/P1347)
- **解题方法**：Floyd 或者 拓扑排序
- **解决方案**：
>Floyd
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


int n, m;
bool g[M][M], d[M][M];
bool st[M];
void Floyd() {
    memcpy(d,g,sizeof g);
    for (int k = 0; k < n; k ++) 
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                d[i][j] = d[i][j] | (d[i][k] && d[k][j]);
}
int check() {
    for (int i = 0; i < n; i++) {
        if(d[i][i]) return 2;
    }

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (!d[i][j] && !d[j][i]) return 0;
        }
    }

    return 1;
}
char getmin() {
    for (int i = 0; i < n; i++) {
        if(st[i]) continue;
        bool f = 1;
        for (int j = 0; j < n; j++) {
            if (!st[j] && d[j][i]) {
                f = 0;
                break;
            }
        }
        if (f) {st[i] = 1; return i + 'A';}
    }
}
void solve() {
    cin >> n >> m;
    int x,type = 0;
    for (int i = 1; i <= m; i++) {
        string s;
        cin >> s;
        if(type) continue;
        g[s[0] - 'A'][s[2] - 'A'] = 1;
        Floyd();
        type = check();
        if (type) x = i;
    }    

    if (type == 0) printf("Sorted sequence cannot be determined.\n");
    else if (type == 2) printf("Inconsistency found after %d relations.\n",x);
    else {
        printf("Sorted sequence determined after %d relations: ",x);
        for (int i = 0; i < n; i++) printf("%c",getmin());
        printf(".\n");
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
 *    created: 2025.02.18 21:05:15
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```
>拓扑排序
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
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n, m, ass;
int in[30];
set<int> st;
bool vis[30];
map<PII,int> mp;
vector<int> G[M];
vector<char> ans;
int topsort() {
    queue<PII> q;
    ans.clear();
    int tin[30];
    memcpy(tin,in,sizeof in);
    int cnt = 0;
    for (int i = 0; i < n; i++) 
        if (!tin[i] && vis[i]) q.emplace(i,1), cnt++ , ans.push_back(i + 'A');
    while (q.size()) {
        auto [u,val] = q.front();
        q.pop();
        for (int v : G[u]) {
            if (-- tin[v] == 0) {
                cnt ++;
                ans.push_back(v + 'A');
                q.emplace(v,val+1);
                ass = max(ass,val+1);
            }
        }
    }
    
    if (ass == n) return 1;
    else if (cnt != st.size()) return 2;
    return 0;
}
void solve() {
    cin >> n >> m;
    int type = 0, x;
    for (int i = 1; i <= m; i++) {
        string s;
        cin >> s;
        int a = s[0] - 'A' , b = s[2] - 'A';
        vis[a] = vis[b] = 1;
        st.insert(a), st.insert(b);
        if(!mp.count({a,b})) G[a].emplace_back(b);
        else mp[{a,b}] = 1;
        in[b] ++;
        if (!type) {
            type = topsort();
            if (type) x = i;
        }
    }

    if (type == 2) printf("Inconsistency found after %d relations.",x);
    else if (type == 0) printf("Sorted sequence cannot be determined.");
    else {
        printf("Sorted sequence determined after %d relations: ",x);
        for (auto c : ans) printf("%c",c);
        printf(".");
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
 *    created: 2025.02.18 22:17:53
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目3.[无向图的最小环问题](https://www.luogu.com.cn/problem/P6175)
- **解题方法**：Floyd
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
constexpr int N = 1 * 1e6 + 10, M = 100 + 10;

int n, m;
int ans = INF;
int dist[M][M], g[M][M], path[M][M];
vector<int> pos;
void get_path(int u, int v) {
    if (path[u][v] == 0) return;
    int k = path[u][v];
    get_path(u, k);
    pos.push_back(k);
    get_path(k, v);
}
void Floyd() {
    for (int k = 1; k <= n; k ++) {
        for (int i = 1; i < k; i ++) 
            for (int j = i + 1; j < k; j ++) 
                if((long long)dist[i][j] + g[i][k] + g[k][j] < ans) {
                    ans = dist[i][j] + g[i][k] + g[k][j];
                    pos.clear();
                    pos.push_back(k);
                    pos.push_back(i);
                    get_path(i,j);
                    pos.push_back(j);
                }

        for (int i = 1; i <= n; i ++) 
            for (int j = 1; j <= n; j ++) 
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    path[i][j] = k;
                }
            
    }
}
void solve() {
    cin >> n >> m;

    memset(g, 0x3f, sizeof g);
    for (int i = 1; i <= n; i++) g[i][i] = 0;

    while (m--) {
        int u, v, d;
        cin >> u >> v >> d;
        g[u][v] = g[v][u] = min(g[u][v],d);
    }

    memcpy(dist, g, sizeof g);
    Floyd();

    if (ans == INF) cout << "No solution.";
    else {
        cout << ans << '\n';
        // for (int x : pos) cout << x << ' ';
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
 *    created: 2025.02.18 23:55:26
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```




#### 题目4.[[USACO07NOV] Cow Relays G](https://www.luogu.com.cn/problem/P2886)
- **解题方法**：矩阵乘法 + DP(Floyd)
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
constexpr int N = 1 * 1e6 + 10, M = 200 + 10;

int k, n, T, S, E;
int g[M][M], res[M][M];
unordered_map<int, int> mp;
void mul(int c[][M],int a[][M],int b[][M]) {
    static int temp[M][M];
    memset(temp, 0x3f, sizeof temp);

    for (int k = 1; k <= n; k ++) 
        for (int i = 1; i <= n; i ++) 
            for (int j = 1; j <= n; j ++) 
                temp[i][j] = min(temp[i][j], a[i][k] + b[k][j]);
        
    memcpy(c, temp, sizeof temp);
}
void qmi() {
    memset(res, 0x3f, sizeof res);
    for (int i = 1; i <= n; i++) res[i][i] = 0;

    while(k) {
        if (k & 1) mul(res, res, g);
        mul(g, g, g);
        k >>= 1;
    }
}
void solve() {
    cin >> k >> T >> S >> E;

    memset(g, 0x3f, sizeof g);

    mp[S] = ++ n;
    mp[E] = ++ n;
    S = mp[S], E = mp[E];

    while (T--) {
        int w, u, v;
        cin >> w >> u >> v;
        if (!mp.count(u)) mp[u] = ++ n;
        if (!mp.count(v)) mp[v] = ++ n;
        u = mp[u], v = mp[v];
        g[u][v] = g[v][u] = min(g[u][v], w);
    }

    qmi();

    cout << res[S][E] << '\n';
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
 *    created: 2025.02.19 00:52:58
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```

#### 额外收获:


---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：复习了一下拓扑排序
  - 📊 **刷题**：高难度的题,没办法快
  - ⏳ **时间管理**：仍然是晚睡晚起
---

### 📖 **明日计划**
  - 💻 去看点最小生成树的扩展应用,去刷点题
---

### 📝 **附注**
### 🍕封面图
![](/posts/备战传智蓝桥DAY-11_2025-02-19-01-29-01.png)
---