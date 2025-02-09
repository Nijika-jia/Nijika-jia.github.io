---
layout: post
title: 备战传智蓝桥DAY-2
date: 2025-02-08 14:33:22
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
cover : /posts/备战传智蓝桥DAY-2_2025-02-08-20-15-49.png
codeHeightLimit: 300
---

### 🎯 **今日目标**
- [ ] 💻 **目标1**：完成 7 道 题目。
- [ ] 📚 **目标2**：复习算法知识点（拓扑排序,最短路）。
---

### 🕒 **学习与练习计划**
| ⏰ 时间段      | 📘 内容                        | 🎯 目标                  |
|----------------|--------------------------------|--------------------------|
| 13:40-17:40   | 📝 复习拓扑排序并刷最短路(Dijkstra)题目         | 学    |

---

### ✅ **完成情况**
- **今日目标完成情况**：
  - ✅ **完成**：完成 6 道题目。
  >蓝桥云课
  - [神经网络](https://www.lanqiao.cn/problems/748/learning/) - 拓扑排序[中等🟠]
  - [Dijkstra求最短路1](https://www.lanqiao.cn/problems/19839/learning/) - Dijkstra[中等🟠]
  - [旅行的截止日期](https://www.lanqiao.cn/problems/18333/learning/) - 有限制的Dijkstra[中等🟠]
  - [欧涛最短路](https://www.lanqiao.cn/problems/3284/learning/) - Dijkstra(一遍过)[困难🔴]
  > 洛谷
  - [神经网络](https://www.luogu.com.cn/problem/P1038) - 拓扑排序[普及+/提高🟢]
  - [营救](https://www.luogu.com.cn/problem/P1396) - Dijkstra + 读题[普及/提高−🟡]
---

### 💡 **解题思路与总结**

#### 题目1.[神经网络](https://www.lanqiao.cn/problems/748/learning/)
- **解题方法**：拓扑排序
- **遇到的问题**：我以为非输入层就是输出层,在输入数据时就判了,非活动层的权值*阈值也加上了
- **解决方案**：非输入层!=输出层,节点后没有子节点的才是输出层
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-25-53.png)
```cpp:line-numbers
#include<bits/stdc++.h>
#define int long long
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10,inf = 0x3f3f3f3f;

int n,p;
int U[N],in[N],C[N];
bool isout[N];
struct edge
{
    int to,w;
};
vector<edge> G[M];
void solve()
{
    cin >> n >> p;
    queue<int> q;
    for(int i=1;i<=n;i++)
    {
        cin >> C[i] >> U[i];
    }
    for(int i=1;i<=p;i++)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
        in[v] ++;
    }
    for(int i=1;i<=n;i++)
    {
        if(!in[i])
        {
            q.push(i);
            U[i] = 0;
        }
        if(G[i].size() == 0) isout[i] = true;
    }
    while(q.size())
    {
        int u = q.front();
        q.pop();
        for(auto [v,w] : G[u])
        {
            if(C[u] > 0)
            C[v] += w * C[u];
            if(--in[v] == 0)
            {
                C[v] -= U[v];
                q.push(v);
            }
        }
    }
    bool f = false;
    for(int i=1;i<=n;i++)
    {
        if(C[i] > 0 && isout[i]) {
            cout << i << ' ' << C[i] << '\n';
            f = true;
        }
    }
    if(!f) cout << "NULL";
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
 *    created: 2025.02.08 13:50:04
 */
```
#### 题目2.[Dijkstra求最短路1](https://www.lanqiao.cn/problems/19839/learning/)
- **解题方法**：Dijkstra
- **遇到的问题**：本来是很简单的一个板子题,但总是错一个,没想到是memset配合#define int long long的问题
- **解决方案**：给数组memset值为0x3f的时候求你们一定要去掉#define int long long,下面是来自ai的解答
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-32-23.png)
吓得我感觉给我的代码片段加上了这个
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-33-08.png)
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m;
vector<PII> G[M];
int dist[N];
bool st[N];
int dj()
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,1});
    dist[1] = 0;
    while(heap.size())
    {
        auto [_,u] = heap.top();
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

    if(dist[n] == INF) return -1;
    return dist[n];
}
void solve()
{
    cin >> n >> m;
    while(m--)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
    }

    cout << dj() << '\n';
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
 *    created: 2025.02.08 15:40:25
 */
```
#### 题目3.[旅行的截止日期](https://www.lanqiao.cn/problems/18333/learning/)
- **解题方法**：Dijkstra + 特判(限制了扩展最短的路的策略)
 **太简单了,一遍过**
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  1 * 1e5 + 10,M = 5 * 1e3 + 10;

int n,m;
struct edge
{
    int to,k,w;
};
vector<edge> G[N];
int dist[N];
bool st[N];
string dj(int s,int t,int limt)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,s});
    dist[s] = 0;
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(st[u]) continue;
        st[u] = 1;
        for(auto [v,k,w] : G[u])
        {
            if(dist[u] + w < dist[v] && d % k == 0)
            {
                dist[v] = dist[u] + w;
                heap.push({dist[v],v});
            }
        }
    }

    return dist[t] > limt ? "NO" : "YES";
}
void solve()
{
    int x,y,z;
    cin >> n >> m >> x >> y >> z;
    while(m--)
    {
        int u,v,k,w;
        cin >> u >> v >> k >> w;
        G[u].push_back({v,k,w});
    }

    cout << dj(x,y,z) << '\n';
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
 *    created: 2025.02.08 15:40:25
 */
```
 #### 题目4.[欧涛最短路](https://www.lanqiao.cn/problems/3284/learning/)
- **解题方法**：预处理一下点与点之间的权值,连接每一个点(稠密图还在用堆优化Dijkstra竟然还能过)就是后面就是纯纯的Dijkstra,虽然还是有限制条件,而且还需要记录路径,用到了前驱数组倒推出路径\
 **太简单了,一遍过** 顺便推荐个网站,我做的时候稍微用了一下这个\
 [3D Calculator](https://www.geogebra.org/3d?lang=zh_CN)
 ![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-43-00.png)
 三维图一目了然,而且还可以算出点与点之间的距离(目前我只用到了这两个功能)
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

typedef pair<double,int> PDI;

int n;
double m;
double dist[N];
bool st[N];
int path[N];
struct node
{
    double x,y,z;
};
vector<pair<int,double>> G[N];
void Dijkstra()
{
    fill(dist , dist+ n + 10 , 1e18);
    memset(path,-1,sizeof path);
    priority_queue<PDI,vector<PDI>,greater<PDI>> heap;
    dist[0] = 0;
    heap.push({0,0});
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(st[u]) continue;
        st[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[u] + w < dist[v] && w <= m)
            {
                dist[v] = dist[u] + w;
                path[v] = u;
                heap.push({dist[v],v});
            }
        }
    }
    if(dist[n+1] == 1e18) printf("-1\n");
    else
    {
        auto getpath = [](){
            vector<int> t;
            for(int i=n+1;~i;i=path[i]){
                t.push_back(i);
            }
            reverse(all(t));
            return t;
        };
        auto p = getpath();
        printf("%.3lf\n",dist[n+1]);
        for(auto x : p)
        {
            if(x == 0) printf("Start ");
            else if(x == n+1) printf("End");
            else printf("%d ",x);
        }
    }
}
void solve()
{
    double x1,y1,z1,x2,y2,z2;
    cin >> n >> m;
    cin >> x1 >> y1 >> z1 >> x2 >> y2 >> z2;
    vector<node> point;
    point.push_back({x1,y1,z1});
    for(int i=1;i<=n;i++)
    {
        double a,b,c;
        cin >> a >> b >> c;
        point.push_back({a,b,c});
    }
    point.push_back({x2,y2,z2});
    auto dis = [](double x1,double x2,double y1,double y2,double z1,double z2){
        return sqrt(pow(x1-x2,2) + pow(y1-y2,2) + pow(z1-z2,2));
    };
    for(int i=0;i<point.size();i++)
    {
        for(int j=0;j<point.size();j++)
        {
            if(i == j) continue;
            auto [x1,y1,z1] = point[i];
            auto [x2,y2,z2] = point[j];
            G[i].push_back({j,dis(x1,x2,y1,y2,z1,z2)});
        }
    }

    Dijkstra();
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
 *    created: 2025.02.08 16:37:43
 */
```
  #### 题目5.[营救](https://www.luogu.com.cn/problem/P1396)
- **解题方法**：读懂题再做
- **遇到的问题**：是路径上遇到的每个权值的最小的最大的权值,而不是所有路径相加的最小值
- **解决方案**： 节点与节点的松弛策略改一下就行
```cpp:line-numbers
#include<bits/stdc++.h>
// #define int long long
#define INF 0x3f3f3f3f
#define PII pair<int,int>
#define ULL unsigned long long
#define all(v) v.begin(), v.end()
#define debug(a) cout<<#a<<"="<<a<<endl;
using namespace std;
constexpr int N =  2 * 1e6 + 10,M = 5 * 1e3 + 10;

int n,m;
vector<PII> G[N];
int dist[N];
bool st[N];
int dj(int s,int t)
{
    memset(dist,0x3f,sizeof dist);
    priority_queue<PII,vector<PII>,greater<PII>> heap;
    heap.push({0,s});
    dist[s] = 0;
    while(heap.size())
    {
        auto [d,u] = heap.top();
        heap.pop();
        if(st[u]) continue;
        st[u] = 1;
        for(auto [v,w] : G[u])
        {
            if(dist[v] > max(w,dist[u]))
            {
                dist[v] = max(w,dist[u]);
                heap.push({dist[v],v});
            }
        }
    }
    return dist[t];
}
void solve()
{
    int s,t;
    cin >> n >> m >> s >> t;
    while(m--)
    {
        int u,v,w;
        cin >> u >> v >> w;
        G[u].push_back({v,w});
        G[v].push_back({u,w});
    }
    cout << dj(s,t) << '\n';
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
 *    created: 2025.02.08 15:40:25
 */
```
#### 额外收获:
- 能把抽象问题转化成图结构就能做这种类型的题
- 还可以用fill(arr,arr+n,1e18)来预处理数组,学到了
---

### 🔧 **改进计划**
- 针对今日问题：
  - 📖 **复习**：使用了lamda表达式函数(个人感觉帅的一批)。
  - 📊 **刷题**：是慢了,会快的
  - ⏳ **时间管理**：我要是一觉不睡到中午就好了,每天只要一下午的时间,但晚上就是止不住熬夜
---

### 📖 **明日计划**
  - 💻 完成 7 道题目，重点攻克 单源最短路(带负权) 类型题。
---

### 📝 **附注**
- ✏️ 晚点再让ai给我的小项目增加点功能(点击增加或者删除节点或者线,自定义点(背景,描边)线的颜色,自定义点的名字)
- 🐱 再去看看能不能申请个GitHub的学生证明,听说免费用GPT4o等那些高级模型
### 🍕封面图
![](/posts/备战传智蓝桥DAY-2_2025-02-08-20-15-49.png)
---
