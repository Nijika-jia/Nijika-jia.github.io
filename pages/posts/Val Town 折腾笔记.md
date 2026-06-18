---
layout: post
title: Val Town 折腾笔记
date: 2026-06-18 00:54:57
tags:
    - 随记
    - 开发工具
categories: 爱记录
#top: 1
draft: false
#time_warning: 30
#color: red
cover: 
codeHeightLimit: 300
---

## 这玩意儿到底是啥

说白了就是个**云端代码草稿本**。

以前想写个小脚本（比如抓个数据、转个 Webhook），脑子里第一反应是：开服务器？配环境？装依赖？搞域名？……然后想想算了，太麻烦了。Val Town 就是解决这个“算了”的。打开网页，写个函数，保存，立刻给你一个 HTTPS 链接，能直接调。没有 `package.json`，没有 `node_modules`，没有 Dockerfile，连服务器都不用碰。

它不是用来搞生产的，是用来**把脑子里的想法在 30 秒内变成能跑的东西**的。

---

## 几个让我觉得“真香”的点

### npm 包直接用，不用 install
```ts
import dayjs from "npm:dayjs";
```
就这么写，保存就能用。不用 `npm init`，不用 `tsc`，不用管版本冲突。对于临时起意的小脚本来说，这种零摩擦的体验太上头了。

### 自带数据库，真的自带
SQLite 和 KV Store 都是内置的，不需要去 RDS 开个实例，不需要配连接字符串。写个 TODO API、存个缓存、记个日志，几行代码搞定。对个人项目来说，这省掉的配置时间比写代码本身还长。

### Secrets 管理很省心
API Key、UID 这些东西扔进 Secrets 里，代码里 `Deno.env.get()` 一读就行。不用担心不小心把密钥提交到公开仓库——虽然 Val 默认就是公开的，但至少密钥是隔离的。

### Fork 别人的代码比自己写快
社区里有大量公开的 Val，遇到类似需求先搜一下，大概率有人写过。Fork 过来改改就能用，比自己从零琢磨 API 文档快太多。我那个追番聚合接口就是从一个开源组件里扒出来改的。

---

## 踩过的坑 & 要注意的事

-   **冷启动是真的有**：免费 Val 闲置后会休眠，第一次请求等个两三秒很正常。别拿它当生产 API 用，用户体验会崩。
-   **别硬编码敏感信息**：我一开始图省事把 UID 直接写在代码里，后来想起来 Val 默认公开，赶紧挪到 Secrets。虽然不是什么机密，但习惯要养好。
-   **第三方 API 限流**：代理 Bilibili / Bangumi 这类接口时，一定要加缓存。KV Store 设个 TTL，不然分分钟被 429。全量拉取排序那种操作更要小心，能分页就分页，能缓存就缓存。
-   **执行超时**：单次请求有时长限制，别在里面跑耗时任务。需要长时间处理的拆成 Cron + 异步队列的思路。
-   **`customData` 这种隐式引用**：之前抄的代码里有个 `customData` 没定义，访问 `/custom` 路径直接报错。Fork 别人的代码一定要通读一遍，别盲信。

---

## 我拿它干了什么

记录一下目前跑着的几个小东西，免得以后忘了：

-   **追番数据聚合 API**：把 B站和 Bangumi 的收藏列表统一格式，喂给个人主页组件。加了内存排序和 KV 缓存，够用。
```ts[Bangumi.ts]
/**
 * Val Town 部署的追番 API
 * 返回结果按日期降序排序
 */

const isMock = false;

// 工具函数：序列化参数
function serializeSearchParams(t) {
  return Object.entries(t)
    .filter(([, r]) => !!r)
    .map(([r, e]) => `${r}=${e}`)
    .join("&");
}

// 工具函数：解析 URL 参数
function parseSearchParams(t) {
  return Object.fromEntries(
    Array.from(t.searchParams.entries()).filter(([, r]) => !!r),
  );
}

// 工具函数：格式化播放量
function formatViewCount(t) {
  let r = t.toString();
  if (r.length < 5) return r;
  if (r.length < 9) {
    let s = r.slice(0, -3);
    let n = s.length;
    let i = s[n - 1] === "0" ? "" : `.${s[n - 1]}`;
    return `${s.slice(0, n - 1)}${i}万`;
  }
  let e = r.slice(0, -7);
  let o = e.length;
  let a = e[o - 1] === "0" ? "" : `.${e[o - 1]}`;
  return `${e.slice(0, o - 1)}${a}亿`;
}

// 工具函数：返回 JSON 响应
function jsonResponse(t) {
  return Response.json(t, { status: t.code });
}

// 类型映射
var subjectTypeMap = {
  1: "anime",
  2: "game",
  3: "book",
  4: "music",
  5: "real",
};

// 收藏状态映射
var collectionStatusMap = {
  1: "want",
  2: "doing",
  3: "done",
};

// ==================== Bangumi 数据处理 ====================

function handleCustomData(t, r) {
  let {
    subjectType: e = "1",
    collectionType: o = "0",
    pageNumber: a = 1,
    pageSize: s = 10,
  } = t;
  let n = r[subjectTypeMap[e]];
  if (!n) return emptyResponse(s);

  let i;
  if (o !== "0") {
    let l = n[collectionStatusMap[o]];
    if (!l || !l.length) return emptyResponse(s);
    i = l;
  } else {
    let l = Object.values(n).flat();
    if (!l.length) return emptyResponse(s);
    i = l;
  }

  // 按日期降序排序
  i.sort((a, b) => {
    let dateA = a.date || a.updated_at || "1970-01-01";
    let dateB = b.date || b.updated_at || "1970-01-01";
    return new Date(dateB) - new Date(dateA);
  });

  return jsonResponse({
    code: 200,
    message: "ok",
    data: {
      list: i.slice((a - 1) * s, a * s),
      pageNumber: a,
      pageSize: s,
      total: i.length,
      totalPages: Math.ceil(i.length / s),
    },
  });
}

function emptyResponse(t) {
  return jsonResponse({
    code: 200,
    message: "ok",
    data: { list: [], pageNumber: 1, pageSize: t, total: 0, totalPages: 1 },
  });
}

// ==================== Bilibili 数据处理 ====================

async function handleBilibili(t, r) {
  let {
    collectionType: e = "0",
    uid: o,
    pageNumber: a = "1",
    pageSize: s = "10",
  } = t;
  let n = o ?? r?.BILIBILI;

  if (!n) {
    return jsonResponse({ code: 400, message: "uid is required", data: {} });
  }

  let i = serializeSearchParams({
    type: 1,
    follow_status: e,
    pn: a,
    ps: s,
    vmid: n,
  });
  let l = await fetch(
    `https://api.bilibili.com/x/space/bangumi/follow/list?${i}`,
  );
  let u = await l.json();

  if (!l.ok || u?.code !== 0) {
    return jsonResponse({ code: 502, message: u.message, data: {} });
  }

  return jsonResponse({
    code: 200,
    message: "ok",
    data: formatBilibiliData(u.data),
  });
}

function formatBilibiliData(t) {
  let list = t?.list?.map((e) => {
    let labels = [
      { label: e?.new_ep?.index_show },
      { label: "评分", value: e?.rating?.score },
      { label: "播放量", value: e?.stat?.view && formatViewCount(e.stat.view) },
      {
        label: "追番数",
        value: e?.stat?.follow && formatViewCount(e.stat.follow),
      },
      { label: "投币数", value: e?.stat?.coin && formatViewCount(e.stat.coin) },
      {
        label: "弹幕数",
        value: e?.stat?.danmaku && formatViewCount(e.stat.danmaku),
      },
    ];
    let cover = e.cover;
    if (cover && cover.startsWith("http:")) {
      let s = new URL(cover);
      s.protocol = "https:";
      cover = s.toString();
    }
    return {
      nameCN: e.title,
      summary: e.summary,
      cover: cover,
      url: e.url,
      labels: labels.filter((s) => s.label),
      // 用于排序的日期字段
      _date: e?.new_ep?.index || "1970-01-01",
    };
  }) ?? [];

  // 按日期降序排序
  list.sort((a, b) => {
    let dateA = a._date || "1970-01-01";
    let dateB = b._date || "1970-01-01";
    return new Date(dateB) - new Date(dateA);
  });

  // 移除临时排序字段
  list = list.map(({ _date, ...rest }) => rest);

  return {
    list: list,
    pageNumber: t.pn,
    pageSize: t.ps,
    total: t.total,
    totalPages: Math.ceil(t.total / t.ps),
  };
}

// ==================== Bangumi 数据处理 ====================

var bgmSubjectTypeMap = {
  1: "2", // 动画
  2: "4", // 游戏
  3: "1", // 书籍
  4: "3", // 音乐
  5: "6", // 三次元
};

var bgmCollectionTypeMap = {
  0: null, // 全部
  1: "1", // 想看
  2: "3", // 在看
  3: "2", // 看过
  4: "4", // 搁置
  5: "5", // 抛弃
};

async function handleBangumi(t, r) {
  let {
    subjectType: e = "1",
    uid: o,
    collectionType: a = "0",
    pageNumber: s = 1,
    pageSize: n = 10,
  } = t;
  let i = o ?? r?.BGM;

  if (!i) {
    return jsonResponse({ code: 400, message: "uid is required", data: {} });
  }

  let l = serializeSearchParams({
    subject_type: bgmSubjectTypeMap[e],
    type: bgmCollectionTypeMap[a],
    limit: n,
    offset: (Number(s) - 1) * Number(n),
  });

  let u = await fetch(`https://api.bgm.tv/v0/users/${i}/collections?${l}`, {
    headers: {
      "User-Agent":
        "yixiaojiu/bilibili-bangumi-component (https://github.com/yixiaojiu/bilibili-bangumi-component)",
    },
  });

  let g = await u.json();

  if (u.ok) {
    return jsonResponse({
      code: 200,
      message: "ok",
      data: formatBangumiData(g, {
        pageNumber: Number(s),
        pageSize: Number(n),
      }),
    });
  } else {
    return jsonResponse({ code: 502, message: g.description, data: {} });
  }
}

function formatBangumiData(t, r) {
  let list = t?.data?.map((o) => {
    let subject = o?.subject;
    let labels = [
      { label: subject?.eps && `${subject.eps}话` },
      { label: "评分", value: subject?.score },
      { label: "排名", value: subject?.rank },
      { label: "时间", value: subject?.date },
    ];

    return {
      name: subject?.name,
      nameCN: subject?.name_cn,
      summary: subject?.short_summary,
      cover: subject?.images?.large,
      url: subject?.id
        ? `https://bgm.tv/subject/${subject?.id}`
        : "https://bgm.tv/",
      labels: labels.filter((n) => "value" in n ? n.value : n.label),
      // 用于排序的日期字段
      _date: subject?.date || o?.updated_at || "1970-01-01",
    };
  }) ?? [];

  // 按日期降序排序（新番在前）
  list.sort((a, b) => {
    let dateA = a._date || "1970-01-01";
    let dateB = b._date || "1970-01-01";
    return new Date(dateB) - new Date(dateA);
  });

  // 移除临时排序字段
  list = list.map(({ _date, ...rest }) => rest);

  return {
    ...r,
    list: list,
    total: t.total,
    totalPages: Math.ceil(t.total / r.pageSize),
  };
}

// ==================== 主入口 ====================

function parseRequestParams(t) {
  let { pageNumber: r = 1, pageSize: e = 10 } = t;
  return { ...t, pageNumber: Number(r), pageSize: Number(e) };
}

async function handler(request) {
  let url = new URL(request.url);
  let params = parseRequestParams(parseSearchParams(url));

  // Val Town 用 Deno 运行时，用 Deno.env.get() 读取环境变量
  let env = {
    BILIBILI: Deno.env.get("BILIBILI"),
    BGM: Deno.env.get("BGM"),
  };

  let customData = {};
  try {
    customData = window.customData || {};
  } catch {}

  if (url.pathname.endsWith("bilibili")) {
    return await handleBilibili(params, env);
  } else if (url.pathname.endsWith("bgm")) {
    return await handleBangumi(params, env);
  } else if (url.pathname.endsWith("custom")) {
    return handleCustomData(params, customData);
  } else {
    return Response.json({ code: 404, message: "not found", data: {} }, {
      status: 404,
    });
  }
}

export { handler as default };
```
-   **Webhook 中转**：GitHub的push事件转发到微信，顺便做格式转换。省了一个 Nginx + Node 服务。
```ts
export default async function(req: Request): Promise<Response> {
  // 1. 验证 GitHub Webhook Secret (防止伪造请求)
  const secret = Deno.env.get("GITHUB_WEBHOOK_SECRET");
  if (secret) {
    const rawBody = await req.text();
    const signature = req.headers.get("X-Hub-Signature-256");
    if (!await verifySignature(secret, rawBody, signature)) {
      return new Response("Invalid signature", { status: 403 });
    }
    // 重新解析 body（因为上面已经消费了 stream）
    var payload = JSON.parse(rawBody);
  } else {
    var payload = await req.json();
  }

  // 2. 忽略 GitHub 首次配置时的 ping 事件
  if (req.headers.get("X-GitHub-Event") === "ping") {
    return new Response(JSON.stringify({ msg: "pong" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // 3. 提取关键信息并格式化 Markdown
  const repo = payload.repository?.full_name || "Unknown Repo";
  const pusher = payload.pusher?.name || "Unknown User";
  const branch = (payload.ref || "").replace("refs/heads/", "");
  const commits = payload.commits || [];

  const title = `[${repo}] ${pusher} pushed to ${branch}`;
  
  // 构建 Server酱支持的 Markdown 描述
  let desp = `## 🔔 Push Event\n\n`;
  desp += `- **Repo:** ${repo}\n`;
  desp += `- **Branch:** \`${branch}\`\n`;
  desp += `- **Pusher:** ${pusher}\n`;
  desp += `- **Commits:** ${commits.length} 个提交\n\n`;
  
  if (commits.length > 0) {
    desp += `### 📝 Commit Details\n`;
    for (const c of commits.slice(0, 5)) { // 最多显示5条，避免超长
      desp += `- [\`${c.id.substring(0, 7)}\`](${c.url}) ${c.message.split('\n')[0]} (@${c.author?.username})\n`;
    }
    if (commits.length > 5) desp += `\n_...还有 ${commits.length - 5} 个提交_\n`;
  }

  // 4. 发送给 Server酱
  const sendKey = Deno.env.get("SERVERCHAN_SENDKEY")!;
  const scRes = await fetch(`https://sctapi.ftqq.com/${sendKey}.send`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ title, desp }).toString(),
  });

  const scResult = await scRes.json();
  return new Response(JSON.stringify(scResult), {
    headers: { "Content-Type": "application/json" },
  });
}

// HMAC-SHA256 验签函数
async function verifySignature(secret: string, body: string, sig?: string | null): Promise<boolean> {
  if (!sig) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expected = `sha256=${Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, "0")).join("")}`;
  return expected === sig;
}
```
-   **每日天气+校友邦签到签退推送**：Cron Val，每天早上 9 点,18点抓天气随便提醒我签到签退推到微信。
![](/posts/Val%20Town_2026-06-18-10-33-17.png)
```ts
// ⏰ Cron 表达式：每天北京时间早上 9:00 执行
// Val Town 默认 UTC，北京是 UTC+8，所以 UTC 1:00 = 北京 9:00
export default async function cron() {
  // 1. 获取天气数据 (Open-Meteo 免费免Key)
  const weatherRes = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=29.618&longitude=105.095&current_weather=true&timezone=Asia/Shanghai",
  );
  const weather = await weatherRes.json();

  const temp = weather.current_weather.temperature;
  const desc = getWeatherDesc(weather.current_weather.weathercode);

  // 2. 构造推送内容
  const title = `☀️ 今日内江天气`;
  const content =
    `当前温度: ${temp}°C\n天气状况: ${desc}\n\n早安！今天也要加油哦~ 记得校友邦签到哦`;

  // 3. 推送到微信 (使用 Server酱)
  const sendkey = Deno.env.get("SSERVERCHAN_SENDKEY"); // 在 Settings > Environment Variables 中配置
  await fetch(`https://sctapi.ftqq.com/${sendkey}.send`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ title, content }), // Server酱推荐用表单格式，兼容性最好
  });

  return { success: true, temp, desc };
}

// 简单的天气码映射
function getWeatherDesc(code: number): string {
  const map: Record<number, string> = {
    0: "晴",
    1: "大部晴朗",
    2: "多云",
    3: "阴天",
    45: "雾",
    48: "雾凇",
    51: "小毛毛雨",
    61: "小雨",
    71: "小雪",
    80: "阵雨",
    95: "雷暴",
  };
  return map[code] || `未知(code:${code})`;
}
```
-   **各种一次性脚本**：数据清洗、格式转换、批量重命名……用完就删，零心理负担。

---

## 什么时候不该用它

给自己提个醒，别上头：

-   有高并发需求的 → Cloudflare Workers / Vercel
-   要团队协作、CI/CD、Code Review 的 → GitHub + 正经部署平台
-   存用户隐私数据的 → 专业云厂商 + 合规审计
-   需要 SLA 保障的 → 付费服务 + 监控告警
-   单次执行超过几十秒的 → 考虑拆分或换平台

**一句话判断标准**：如果你在为一个小脚本纠结“要不要开个 AWS EC2”，那就是 Val Town 的最佳使用时机。如果已经不纠结了，说明你该迁移了。

---

## 备忘链接

-   官网：[val.town](https://val.town)
-   文档：[docs.val.town](https://docs.val.town)
-   逛社区：[val.town/explore](https://www.val.town/explore)
-   SDK：[@valtown/sdk](https://jsr.io/@valtown/sdk)

> *下次折腾方向：试试用 Val Town + SQLite 做个轻量级 RSS 阅读器后端*