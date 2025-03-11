---
layout: post
title: 备战传智蓝桥DAY-13
date: 2025-02-23 07:07:06
tags:
    - 算法
    - 二分查找
    - 蓝桥杯
    - DP
    - 数据结构
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
sponsor: false 
copyright: false
cover : /posts/备战传智蓝桥DAY-13_2025-02-23-07-07-45.png
codeHeightLimit: 300
end: true
---
### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        |
|----------------|--------------------------------|
| 13:30-18:40   | 📝 复习二分         |
| 20:20-22:30   | 📝 复习二分         |
---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 11 道题目
  >dotcpp
  - [愤怒的牛](https://www.dotcpp.com/oj/problem2346.html) - 二分答案[]
  - [Best Cow Fences](https://www.dotcpp.com/oj/problem3289.html) - 二分答案 + 前缀和 + 数学[]
  - [数列分段II](https://www.dotcpp.com/oj/problem2348.html) - 二分答案[]
  >蓝桥云课
  - [M次方根](https://www.lanqiao.cn/problems/1542/learning/) - 浮点数二分[困难🔴]
  - [二分查找数组元素](https://www.lanqiao.cn/problems/1389/learning/) - 二分[中等🟠]
  - [工厂质检员](https://www.lanqiao.cn/problems/8208/learning/) - 二分答案[中等🟠]
  - [肖恩的n次根](https://www.lanqiao.cn/problems/3685/learning/) - 浮点数二分[中等🟠]
  - [01小游戏](https://www.lanqiao.cn/problems/3737/learning/) - STL[中等🟠]
  - [肖恩的苹果林](https://www.lanqiao.cn/problems/3683/learning/) - 二分答案[中等🟠]
  - [妮妮的月饼工厂 || 妮妮的月饼工厂v2](https://www.lanqiao.cn/problems/3990/learning/) - 二分答案[中等🟠]
  - [购买海鲜](https://www.lanqiao.cn/problems/8224/learning/) - 二分答案[中等🟠]
  - ❌ **未完成**：

---

### 💡 **解题思路与总结**

#### 题目1.[愤怒的牛](https://www.dotcpp.com/oj/problem2346.html)
- **解题方法**：二分对答案
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
 
int n, c;
vector<int> loc;
void solve() {
    cin >> n >> c;
    loc.resize(n);
    for (int i = 0; i < n; i ++) cin >> loc[i];
 
    sort(all(loc));
 
    auto check = [](int d) {
            int cnt = 1 , st = loc[0];
            for (int j = 1; j < loc.size(); j ++) {
                if (loc[j] - st >= d) {
                    cnt ++;
                    st = loc[j];
                    if(cnt >= c) return true;
                }
        }
        return false;
    };
 
    int l = 0, r = INF;
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
 
    cout << l;
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
 *    created: 2025.02.22 13:40:47
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```



#### 题目2.[Best Cow Fences](https://www.dotcpp.com/oj/problem3289.html)
- **解题方法**：二分答案 , 每个区间和都减去平均值,如果区间的和还大于0说明该区间的平均值大于当前平均值
- **遇到的问题**：用单调队列会超时
- **解决方案**：
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
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;

int n, len;
int ans;
int a[N];
double sum[N];
bool check(double avg) {
     for (int i = 1; i <= n; i ++) sum[i] = sum[i - 1] + a[i] - avg;
     double minn = 1e10;
     for (int i = 0 , j = len; j <= n; i ++, j++) {
        minn = min(minn, sum[i]);
        if (sum[j] >= minn) return true;
     }
     return false;
}
void solve() {
    cin >> n >> len;
    for (int i = 1; i <= n; i ++) cin >> a[i];

    double l = 0, r = 1e5;
    while (abs(l - r) > 1e-6) {
        double mid = (l + r) / 2;
        if (check(mid)) l = mid;
        else r = mid;
    }

    printf("%d",(int)(r*1000));
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
 *    created: 2025.02.22 14:03:36
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```

#### 题目3.[数列分段II](https://www.dotcpp.com/oj/problem2348.html)
- **解题方法**：二分答案
- **遇到的问题**：不知道为啥l和r的值不能设成常用的0和INF,必须l是数列最大值,r是数列和
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
int a[N];
bool check(int limt) {
    int cnt = 0, sum = 0;
    for (int i = 0; i < n; i ++) {
        if (sum + a[i] > limt) {
            sum = a[i];
            cnt ++;
        }else sum += a[i];
    }
    cnt ++;
    if (cnt > m) return false;
    return true;
}
void solve() {
    cin >> n >> m;
    int l = 0, r = 0;
    for (int i = 0; i < n; i ++) cin >> a[i],l = max(l,a[i]), r += a[i];

    while (l < r) {
        int mid = l + r >> 1;
        if (!check(mid)) l = mid + 1;
        else r = mid;
    }

    cout << l;
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
 *    created: 2025.02.22 15:44:06
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```

#### 题目4.[工厂质检员](https://www.lanqiao.cn/problems/8208/)
- **解题方法**：二分答案,这次是l+r+1>>1
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
int h[N];
bool check(int limt) {
    int cnt = 0;
    for (int i = 0; i < n; i ++) {
        cnt += h[i] / limt;
    }
    return cnt < k;
}
void solve() {
    cin >> n >> k;
    for (int i = 0; i < n; i ++) cin >> h[i];
    int l = 0, r = INF;
    while (l < r) {
        int mid = l + r + 1 >> 1;
        if (check(mid)) r = mid - 1;
        else l = mid;
    }
    cout << (l == 0 ? -1 : l) << '\n';
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
 *    created: 2025.02.22 16:59:33
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```


#### 题目5.[肖恩的n次根](https://www.lanqiao.cn/problems/3685/)
- **解题方法**：
- **遇到的问题**：
### **🔬 关键点：`int()` vs `cout`**
| 代码 | 计算结果（假设有浮点误差） | 实际输出 |
|------|-----------------|---------|
| `int(l * 1000)` | `int(293999.99999999)` | `293999` (直接截断) |
| `cout << (l * 1000);` | `294000.0` | `294000` (默认格式保留精度) |
- **解决方案**：
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
constexpr int N = 1 * 1e6 + 10, M = 5 * 1e3 + 10;


void solve() {
    int a, b;
    cin >> a >> b;
    if (b == 1) {
        cout << a * 1000;
        return;
    }
    double l = 0, r = 1e18;
    while (abs(l - r) > 1e-11) {
        double mid = (l + r) / 2;
        if(pow(mid, b) <= a) l = mid;
        else r = mid;
    }

    cout << int(l * 1000);
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
 *    created: 2025.02.22 20:26:30
 *    description: C++20 Algorithm Template for Competitive Programming
 */
```




#### 额外收获:

---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：复习二分感觉没啥难度
  - 📊 **刷题**：二分的题总体还是套路多
  - ⏳ **时间管理**：仍然是晚睡晚起
---

### 📖 **明日计划**
  - 💻 暂时不知道,大概是学新东西
---

### 📝 **附注**

### 🍕封面图
![](/posts/备战传智蓝桥DAY-13_2025-02-23-07-07-45.png)
---