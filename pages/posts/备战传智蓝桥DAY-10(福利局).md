---
layout: post
title: 备战传智蓝桥DAY-10(福利局)
date: 2025-02-17 00:25:06
tags: 
    - 算法
    - 最短路
    - 图论
    - Dijkstra
    - SPFA优化
    - SLF优化
    - LLL优化
    - SPFA的SLF,LLL,SLF+LLL,DFS优化
    - Dijkstra变种
    - 竞赛模板
    - 负环检测
    - Python脚本
    - Python爬虫
    - json数据处理
    - 图床加速
    - Update girls
    - 蓝桥云课
    - 算法赛
    - 时间管理

categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-10(福利局)_2025-02-17-00-30-43.png
codeHeightLimit: 300
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 21:00-00:30   | 📝 刷最短路综合题目 + 混时间         |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 1 道题目(今天睡+玩嗨了)
  >蓝桥云课
  - [曲率驱动【算法赛】](https://www.lanqiao.cn/problems/20052/) - 最短路[中等🟠]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**

#### 题目1.[曲率驱动【算法赛】](https://www.lanqiao.cn/problems/20052/)
- **解题方法**：跑k+1次Dijkstra
- **遇到的问题**：试了一下二维dist数组,第二维表示用了几次xor操作,但这样写出来又不对,不知道这个方法能不能行
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
constexpr int N = 1 * 1e3 + 10, M = 5 * 1e3 + 10;

int n, m, k;
int C[N];
int dist[N];
vector<PII> G[2*N];
void Dijkstra(int xxor) {
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    for (int i = 1; i <= n; i++) {
        if (dist[i] != INF) {
            heap.emplace(dist[i], i);
        }
    }
    while (heap.size()) {
        auto [d, u] = heap.top();
        heap.pop();
        if (dist[u] < d) continue;
        for (auto [v, w] : G[u]) {
            if (d + (w ^ xxor) < dist[v]) {
                dist[v] = d + (w ^ xxor);
                heap.emplace(dist[v], v);
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
    cin >> k;
    for (int i = 1; i <= k; i++) cin >> C[i];

    memset(dist, 0x3f, sizeof dist);
    int xxor = 0;
    dist[1] = 0;
    for (int i = 0; i <= k; i++) {
        xxor ^= C[i];
        Dijkstra(xxor);
    }

    for (int i = 1; i <= n; i++) cout << (dist[i] > INF / 2 ? -1 : dist[i]) << ' ';
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
 *    created: 2025.02.16 20:54:44
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```




#### 额外收获:
##### SPFA的各种优化

- SLF(Small Label First)优化
```cpp:line-numbers
void spfa() {
    memset(dist, 0x3f, sizeof dist);
    deque<int> q;
    q.push_back(s);
    dist[s] = 0;
    vis[s] = 1;
    while (q.size()) {
        int u = q.front();
        q.pop_front();
        vis[u] = false;
        for (auto [v, w] : G[u]) {
            if(dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (vis[v]) continue;
                vis[v] = 1;
                if (q.size() && dist[v] > dist[q.front()]) q.push_back(v);
                else q.push_front(v);
            } 
        }
    }
}
```

- LLL(Large Label Last)优化(这个不常用,应该说经常跟SLF组合起来用)
- SLF + LLL优化
```cpp:line-numbers
void spfa() {
    memset(dist, 0x3f, sizeof dist);
    deque<int> q;
    q.push_back(s);
    dist[s] = 0;
    vis[s] = 1;
    int sum = dist[s], num = 1;
    while (q.size()) {
        int u = q.front();
        while (dist[u] * num > sum) {
            q.pop_front();
            q.push_back(u);
            u = q.front();
        }
        q.pop_front();
        sum -= dist[u];
        num --;
        vis[u] = false;
        for (auto [v, w] : G[u]) {
            if(dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (vis[v]) continue;
                vis[v] = 1;
                sum += dist[v];
                num ++;
                if (q.size() && dist[v] > dist[q.front()]) q.push_back(v);
                else q.push_front(v);
            } 
        }
    }
}
```

- md

在实际使用 SPFA（Shortest Path Faster Algorithm）时，优化策略的选择取决于图的性质。常见的优化策略包括 **SLF（Small Label First）**、**LLL（Large Label Last）**、**SLF+LLL 组合** 和 **DFS 优化**。让我们看看哪种最常用以及它们的适用情况。

---

###### **1️⃣ SLF（Small Label First）**
- **核心思想**：每次将新松弛的点插入队列的最前面（类似 **优先队列** 的效果），这样更小的距离优先出队，提高松弛效率。
- **实现方式**：
  ```cpp
  if (!in_queue[v]) {
      if (!q.empty() && dist[v] < dist[q.front()]) {
          q.push_front(v);  // 插入队首
      } else {
          q.push_back(v);   // 插入队尾
      }
      in_queue[v] = true;
  }
  ```
- **适用情况**：
  - 适用于 **较稀疏的图**，特别是 **随机图** 或者 **单调递增的边权图**，可以减少不必要的更新操作。
- **常用程度**：✅ **常用**，很多情况下都会加上。

---

###### **2️⃣ LLL（Large Label Last）**
- **核心思想**：如果队首元素的 `dist[u]` 大于队列的平均值，则把它放到队尾，防止过大的点反复出队影响效率。
- **实现方式**：
  ```cpp
  if (dist[q.front()] > avg_dist) {
      q.push_back(q.front());
      q.pop_front();
  }
  ```
- **适用情况**：
  - 适用于 **边权变化较大，容易产生异常值** 的情况。
  - 可以减少 **负环检测时的错误路径**。
- **常用程度**：⭕ **较少单独使用**，但会和 SLF 结合使用。

---

###### **3️⃣ SLF + LLL 组合**
- **核心思想**：结合 SLF 和 LLL，两者互补，让松弛更快且避免异常数据干扰。
- **实现方式**：
  - **先使用 SLF 插入队列**（优先小的 `dist[v]`）。
  - **如果队首的 `dist[u]` 过大（高于队列均值），则放队尾**，避免极端情况影响计算。

- **适用情况**：
  - 适用于 **稀疏图 + 复杂边权** 的情况。
  - 适用于 **可能有负权边的图**，但不能处理负环。
- **常用程度**：✅ **最常用**，很多竞赛代码中会看到这个优化。

---

###### **4️⃣ DFS 优化（可看作 SPFA 的递归版本）**
- **核心思想**：用 **递归的方式** 代替队列，使松弛顺序更接近深度搜索，减少无效松弛次数。
- **实现方式**：
  ```cpp
  void spfa_dfs(int u) {
      in_stack[u] = true;
      for (auto [v, w] : G[u]) {
          if (dist[v] > dist[u] + w) {
              dist[v] = dist[u] + w;
              if (!in_stack[v]) {
                  spfa_dfs(v);
              }
          }
      }
      in_stack[u] = false;
  }
  ```
- **适用情况**：
  - **稀疏图 + DAG（无环有向图）** 时效果好。
  - **递归优化可能带来栈溢出风险**，不适用于大规模图。
- **常用程度**：❌ **较少使用**，因递归深度问题不如 SLF/LLL 组合稳妥。

---

###### **💡 总结：哪种最常用？**
| 优化方法 | 适用场景 | 常用程度 |
|----------|----------|---------|
| **SLF（Small Label First）** | 较稀疏图，随机图 | ✅ 很常用 |
| **LLL（Large Label Last）** | 复杂边权，减少异常影响 | ⭕ 较少单独使用 |
| **SLF + LLL 组合** | 较稀疏图 + 复杂边权 | ✅ 最常用 |
| **DFS 优化** | DAG，稀疏图 | ❌ 不常用 |

**结论：**
- **SLF + LLL** 组合是最常用的优化方式，适用于大多数 **竞赛 & 工程** 场景。
- **SLF 单独使用** 也很常见，能提高收敛速度。
- **LLL 单独用得少**，但能防止极端情况影响计算。
- **DFS 优化版本** 用得很少，因为递归深度问题。

如果你在比赛中写 SPFA，一般默认 **SLF + LLL** 最优解！🚀

---

##### 用python脚本改了一下**我の推**的图片外链,用jsDelivr 加速,博客girls页面的图片显示问题终于修复了,唉
- 从以前bing外链下载图片到images文件夹
```py
import os
import json
import requests

# JSON 文件名
json_file = "data.json"  # 确保 data.json 和这个脚本在同一个文件夹

# 目标文件夹
save_dir = "images"
os.makedirs(save_dir, exist_ok=True)  # 创建 images 文件夹（如果不存在）

# 读取 JSON 数据
with open(json_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# 遍历 JSON 数据并下载图片
for index, item in enumerate(data):
    image_url = item.get("avatar", "")  # 获取图片 URL
    name = item.get("name", f"image_{index}")  # 获取名字（用于命名文件）

    if image_url:
        try:
            # 发送 HTTP 请求下载图片
            response = requests.get(image_url, stream=True, timeout=10)
            if response.status_code == 200:
                # 确保文件名安全
                safe_name = "".join(c if c.isalnum() else "_" for c in name)
                image_path = os.path.join(save_dir, f"{safe_name}.jpg")

                # 写入文件
                with open(image_path, "wb") as img_file:
                    for chunk in response.iter_content(1024):
                        img_file.write(chunk)

                print(f"✅ 成功下载: {image_path}")
            else:
                print(f"❌ 下载失败: {image_url} (状态码: {response.status_code})")
        except Exception as e:
            print(f"⚠️ 发生错误: {image_url} ({e})")

print("🎉 所有图片下载完成！")

```

- 再更换json里avatar的字段内容
```py
import json

# JSON 文件路径
json_file = "data.json"

# 你的新 GitHub 图床地址
base_url = "https://cdn.jsdelivr.net/gh/Nijika-jia/Nijika-jia.github.io@main/public/girls/avatar/"

# 读取 JSON 文件
with open(json_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# 遍历数据并修改 avatar 字段
for item in data:
    name = item.get("name", "").strip()  # 获取 name 字段
    if name:
        # 确保文件名安全（防止特殊字符导致 URL 失效）
        safe_name = "".join(c if c.isalnum() else "_" for c in name)
        item["avatar"] = f"{base_url}{safe_name}.jpg"  # 更新 avatar 字段

# 保存修改后的 JSON 文件
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print("🎉 JSON 文件更新完成！")

```
### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：没复习
  - 📊 **刷题**：没刷多少
  - ⏳ **时间管理**：玩爽了,但也付出了相应的代价(指晚上做题做睡着了)
---

### 📖 **明日计划**
  - 💻 磕小组作业
---

### 📝 **附注**
- 明天更没时间刷了,得做小组作业了
### 🍕封面图
![](/posts/备战传智蓝桥DAY-10(福利局)_2025-02-17-00-30-43.png)
---