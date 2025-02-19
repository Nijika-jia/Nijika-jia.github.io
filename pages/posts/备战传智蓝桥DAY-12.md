---
layout: post
title: 备战传智蓝桥DAY-12
date: 2025-02-20 02:29:32
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
cover : /posts/备战传智蓝桥DAY-12_2025-02-20-02-37-41.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 12:20-18:40   | 📝 刷Floyd的扩展应用题目 + 做图论工具         |
| 20:20-2:30   | 📝 刷Floyd的扩展应用题目 + 做图论工具         |
---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 7 道题目
  > 洛谷
  - [最短网络 Agri-Net](https://www.luogu.com.cn/problem/P1546) - 最小生成树[普及/提高−🟡]
  - [局域网](https://www.luogu.com.cn/problem/P2820) - 最小生成树[普及/提高−🟡]
  - [繁忙的都市](https://www.luogu.com.cn/problem/P2330) - kruskal求最小生成树的最大边权最小[普及/提高−🟡]
  - [联络员](https://www.luogu.com.cn/problem/U224107) - kruskal + 连通块[暂无评定🩶]
  >dotcpp
  - [连接格点(grid)](https://www.dotcpp.com/oj/problem3128.html) - 连通块 + 最小生成树[]
  - [新的开始](https://www.dotcpp.com/oj/problem2397.html) - 虚拟原点 + 最小生成树[]
  - [北极通讯网络](https://www.dotcpp.com/oj/problem2396.html) - DFS求连通块个数 + 二分答案[]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**


#### 题目1.[最短网络 Agri-Net](https://www.luogu.com.cn/problem/P1546)
- **解题方法**：kruskal
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n;
int p[M];
int g[M][M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n;
    for (int i = 0; i < n; i ++)
        for (int j = 0; j < n; j ++)
            cin >> g[i][j]; 

    vector<pair<int, PII>> nodes;
     for (int i = 0; i < n; i ++)
        for (int j = 0; j < n; j ++) {
            nodes.emplace_back(g[i][j], PII(i, j));
        }

    sort(all(nodes));
    for (int i = 0; i < n; i ++) p[i] = i;

    int res = 0;
    for (auto [w, node] : nodes) {
        auto [a,b] = node;
        a = find(a), b = find(b);
        if (a != b) {
            res += w;
            p[a] = b;
        }
    }

    cout << res << '\n';
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
 *    created: 2025.02.19 12:35:58
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```


#### 题目2.[局域网](https://www.luogu.com.cn/problem/P2820)
- **解题方法**：kruskal
- **遇到的问题**：
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n, k;
int p[M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n >> k;
    vector<pair<int, PII>> nodes;
    while (k --) {
        int i, j, m;
        cin >> i >> j >> m;
        if(!m) continue;
        nodes.emplace_back(m, make_pair(i, j));
    }

    sort(all(nodes));
    for (int i = 1; i <= n; i++) p[i] = i;

    int ans = 0;
    for (auto [w, node] : nodes) {
        auto [a,b] = node;
        a = find(a), b = find(b);
        if (a != b) p[a] = b;
        else ans += w;
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
 *    created: 2025.02.19 12:35:58
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目3.[繁忙的都市](https://www.luogu.com.cn/problem/P2330)
- **解题方法**：Kruskal
- **遇到的问题**：
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 300 + 10;

int n, m;
int p[M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n >> m;
    vector<pair<int, PII>> nodes;
    while (m --) {
        int u, v, c;
        cin >> u >> v >> c;
        nodes.emplace_back(c, make_pair(u, v));
    }

    sort(all(nodes));
    for (int i = 1; i <= n; i ++) p[i] = i;

    int ans;
    for (auto [w, node] : nodes) {
        int a = find(node.first), b = find(node.second);
        if (a != b) {
            p[a] = b;
            ans = w;
        }
    }

    cout << n - 1 << ' ' << ans << '\n';
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
 *    created: 2025.02.19 13:17:56
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目4.[联络员](https://www.luogu.com.cn/problem/U224107)
- **解题方法**：连通块 + Kruskal
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n, m;
int p[M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n >> m;

    for (int i = 1; i <= n; i ++) p[i] = i; 

    int ans = 0;
    vector<pair<int,PII>> nodes;
    while (m --) {
        int type, u, v, w;
        cin >> type >> u >> v >> w;
        if (type == 1) {
            u = find(u), v = find(v);
            p[u] = v;
            ans += w;
        }else {
            nodes.emplace_back(w, make_pair(u,v));
        }
    }

    sort(all(nodes));

    for (auto [w, node] : nodes) {
        int a = find(node.first), b = find(node.second);
        if (w {
            p[a] = b;
            ans += w;
        }
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
 *    created: 2025.02.19 14:06:21
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目5.[连接格点(grid)](https://www.dotcpp.com/oj/problem3128.html)
- **解题方法**：先跑横向再跑纵向
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 1 * 1e3 + 10;

int n, m;
int p[M*M], g[M][M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n >> m;
    
    for (int i = 1,t = 0; i <= n; i ++) 
        for (int j = 1; j <= m; j ++)
            g[i][j] = ++t;

    for (int i = 1; i <= n * m; i ++) p[i] = i;
    
    int x1, y1, x2, y2;
    while(cin >> x1 >> y1 >> x2 >> y2) {
        int a = g[x1][y1], b = g[x2][y2];
        a = find(a), b = find(b);
        p[a] = b;
    }

    int ans = 0;
    for (int i = 1; i < n; i++) {
        for (int j = 1; j <= m; j++) {
            int a = g[i][j], b = g[i + 1][j];
            a = find(a), b = find(b);
            if (a != b) {
                p[a] = b;
                ans ++;
            }
        }
    }

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j < m; j++) {
            int a = g[i][j], b = g[i][j + 1];
            a = find(a), b = find(b);
            if (a != b) {
                p[a] = b;
                ans += 2;
            }
        }
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
 *    created: 2025.02.19 14:30:02
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目6.[新的开始](https://www.dotcpp.com/oj/problem2397.html)
- **解题方法**：虚拟原点 + Kruskal
- **解决方案**：
```cpp:line-numbers
#include <bits/stdc++.h>
#define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 300 + 10;

int n;
int p[M];
int w[M],g[M][M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n;
    for (int i = 1; i <= n; i ++) cin >> w[i];
    for (int i = 1; i <= n; i ++)
        for (int j = 1; j <= n; j ++)
            cin >> g[i][j];

    vector<pair<int, PII>> nodes;
    for (int i = 1; i <= n; i ++)
        for (int j = 1; j <= n; j ++) 
            if (g[i][j]) nodes.emplace_back(g[i][j], make_pair(i ,j));
    for (int i = 1; i <= n; i++) nodes.emplace_back(w[i], make_pair(0, i));
    
    sort(all(nodes));
    for (int i = 1; i <= n; i ++) p[i] = i;

    int ans = 0;
    for (auto [w, node] : nodes) {
        int a = find(node.first), b = find(node.second);
        if (a != b) {
            p[a] = b;
            ans += w;
        }
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
 *    created: 2025.02.19 22:31:32
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目7.[北极通讯网络](https://www.dotcpp.com/oj/problem2396.html)
- **解题方法**：DFS求连通块个数 + 二分答案 或 Kruskal
- **解决方案**：
> DFS求连通块个数 + 二分答案
```cpp:line-numbers
#include <bits/stdc++.h>
// #define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e2 + 10;

int n, k;
int block[M];
vector<PII> axis;
vector<pair<int,double>> G[M];

void dfs(int id,int u,double d) {
    block[u] = id;
    for (auto [v, w] : G[u]) {
        if (!block[v] && w <= d) dfs(id, v, d);
    }
}
void build() {
    auto get_dist = [](const PII &a, const PII &b) {
        return sqrt(pow(a.first - b.first, 2) + pow(a.second - b.second, 2));
    };
    for (int i = 0; i < n; i ++) 
        for (int j = i + 1; j < n; j ++) 
            G[i].emplace_back(j, get_dist(axis[i], axis[j])), G[j].emplace_back(i, get_dist(axis[i], axis[j]));
}
bool check(double d) {
    memset(block, 0, sizeof block);
    int cnt = 0;
    for (int i = 0; i < n; i ++)
        if (!block[i]) dfs(++cnt ,i, d);

    return cnt <= k;
}
void solve() {
    cin >> n >> k;
    for (int i = 0; i < n; i ++) {
        int x, y;
        cin >> x >> y;
        axis.emplace_back(x, y);
    }

    build();

    double l = 0, r = 1e18;
    while (fabs(l - r) > 1e-6) {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }

    printf("%.2lf\n",l);
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
 *    created: 2025.02.19 22:58:01
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```
> Kruskal
```cpp:line-numbers
#include <bits/stdc++.h>
// #define int long long // 仅在需要大整数时使用，memset 数组为 0x3f 时去掉
#define INF 0x3f3f3f3f
#define PII pair<int, int>
#define ULL unsigned long long
#define PIII tuple<int, int, int>
#define all(v) v.begin(), v.end()
#define debug(a) cout << #a << " = " << a << endl;
using namespace std;
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e2 + 10;

int n,k;
int p[M];
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}
void solve() {
    cin >> n >> k;

    vector<PII> axis;
    for (int i = 0; i < n; i ++) {
        int x, y;
        cin >> x >> y;
        axis.emplace_back(x,y);
    } 

    vector<pair<double,PII>> nodes;
    auto get_dist = [](const PII &a, const PII &b) {
        return sqrt(pow(a.first - b.first, 2) + pow(a.second - b.second, 2));
    };
    for (int i = 0; i < n; i ++) 
        for (int j = i + 1; j < n; j ++) 
            nodes.emplace_back(get_dist(axis[i], axis[j]), make_pair(i, j));
    
    sort(all(nodes));
    for (int i = 0; i < n; i ++) p[i] = i;

    int cnt = n;
    double ans;
    for (auto [w, node] : nodes) {
        if(cnt <= k) break;

        int a = find(node.first), b = find(node.second);
        if (a != b) {
            cnt --;
            p[a] = b;
            ans = w;
        }
    }

    printf("%.2lf",ans);
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
 *    created: 2025.02.20 00:24:21
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```


#### 额外收获:

---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：复习了连通块DFS
  - 📊 **刷题**：最小生成树的题普遍不难
  - ⏳ **时间管理**：今天稍微早起了那么点
---

### 📖 **明日计划**
  - 💻 最小生成树
---

### 📝 **附注**
- 终于做完了图论用的工具网站了 - [传送门](https://graphtheorytools.nijikajia.top/)
![](/posts/备战传智蓝桥DAY-12_2025-02-20-02-30-33.png)
### 🍕封面图
![](/posts/备战传智蓝桥DAY-12_2025-02-20-02-37-41.png)
---