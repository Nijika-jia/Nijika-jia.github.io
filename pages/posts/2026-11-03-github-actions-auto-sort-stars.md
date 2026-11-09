---
title: 让 GitHub Actions 自动把新 star 的仓库分进列表
date: 2026-11-03 10:56:00
updated: 2026-11-09 15:50:00
draft: false
layout: post
top: 0
cover: /posts/0c773e3e13b2ea868a73c4eb4bb730a4.jpg
categories: 爱制作
tags:
  - GitHub
  - Python
  - GitHub Actions
  - 自动化
---
# 让 GitHub Actions 自动把新 star 的仓库分进列表

GitHub 的 star 列表（Lists）没有 REST API，也没有"你 star 了别人仓库"的 webhook。想要新 star 自动归类，只能自己搭个定时轮询。我把这套东西跑起来了，记录一下选型和踩过的坑。

![148 个散着的 star，被规则分进 7 个抽屉](/posts/2026-11-03-star-sorter-drawers.webp)

## 存量：148 个 star，7 个列表

先把已有的 148 个 star 分好：

- 我的项目
- 内容创作 & ACG
- QQ & 机器人
- 效率桌面工具
- 应用项目参考
- AI Coding & 开发环境
- AI Agent 工具箱

分组靠关键词规则：按仓库全名、描述、topics 匹配正则，数组按顺序命中，末尾 `.*` 兜底到默认组；另有 72 条 override 按仓库名精确指定，优先级最高，用来修规则误判。

148 个里 145 个靠规则搞定，3 个失败：2 个仓库已经删了（404），FlowiseAI/Flowise 的访问被挡。

## 选型：三件事

**在哪跑。** GitHub Actions 定时任务、本地 Windows 计划任务、浏览器扩展（star 的瞬间实时分类）三个选项里选了 Actions：不依赖本机开机，工程量也最小。代价是实时性——cron 每小时跑一次，而且 GitHub 的 schedule 有延迟，仓库不活跃时还会降频。

**怎么分类。** 关键词规则还是 LLM？**这个选择我改了两次**，最后落在"LLM 为主、规则兜底"。

一开始选了纯规则，理由是可解释、免费、改个配置文件下个整点就生效。跑了一个月才发现真正的瓶颈是**维护成本**：规则误判了要人工加一条 override 修一遍，那 72 条 override 就是这么攒出来的。一个月才新增十来个 star，也就是说**每月为了处理十来个仓库，要维护几十条正则**——性价比是反的。

规则还有个绕不开的短板，新仓库长什么样事先不知道，规则只能事后补。LLM 恰好擅长这个，看一遍名字、描述、topics 就能判断个大概。

**怎么触发。** GitHub 不给 star 事件发 webhook，Lists 也没有 REST API（gh CLI 的相关 issue #13226 还开着），所以只能定时拉 star 列表，找出不在任何列表里的新仓库。

![listIds 是全量替换，不是追加](/posts/2026-11-03-star-sorter-full-replace.webp)

## 分类：四级优先级

改完之后分类按可信度排了四档，从最可信到最不可信：

| 级别 | 依据 | 说明 |
|------|------|------|
| 1 | `overrides` 精确匹配 | 人工指定过，最高优先级，LLM 不参与 |
| 2 | **LLM 分类**（SenseNova） | 只处理 overrides 没覆盖的仓库 |
| 3 | `rules` 正则 | LLM 不确定时的确定性兜底 |
| 4 | **跳过** | 正则也不匹配 → **不写入** |

**为什么要有第 4 档。** `updateUserListsForItem` 的 `listIds` 是全量替换语义——仓库会从其他列表里被挤掉。写错一次的代价是"把本来放对的仓库踢出去了"，不只是"多了个错标签"。所以宁可不写，留给我自己手动处理。

具体做法是让 LLM 顺带给一个 `confidence`，低于阈值（默认 0.7）就不采纳它的判断，退回正则；正则也不匹配就跳过。实测无描述的仓库（只有名字没有简介）基本都落在 0.2–0.3，正好被这道闸门挡住。

还有个细节：`rules` 里的 `.*` 兜底规则不能算作"匹配上了"。否则每个仓库都能匹配规则，LLM 那一档就永远轮不到。代码里要把这条规则单独摘出来。

## 写入列表：GraphQL mutation

官方 API 里唯一能用的入口是 GraphQL：

```graphql
mutation($itemId: ID!, $listIds: [ID!]!) {
  updateUserListsForItem(input: {itemId: $itemId, listIds: $listIds}) {
    lists { id name }
  }
}
```

两个坑：

1. **认证必须是 classic PAT 并勾选整个 `user` scope。** fine-grained PAT 不支持 GraphQL。
2. **`listIds` 是全量替换，不是追加。** 直接传目标列表 ID，仓库会从其他列表里被挤掉。得先读现有成员再合并：`viewer { lists }` 拿全部列表，`node(id: ...) { ... on UserList { items } }` 分页读每个列表的成员，取并集后写回。

star 列表本身走 REST `/user/starred`（分页），因为规则匹配需要 description 和 topics，GraphQL 的 starred 字段给不全。这套查询结构参考了开源项目 petarov/starghlist。

## 部署：五个坑

仓库是私有的 `Nijika-jia/star-sorter`，四个文件：workflow（现在改成每月 1 日 UTC 03:17，也留了手动入口）、`sort.py`、`ai_classify.py`、`rules.json`。

**坑一：传上去的文件是坏的。** `sort.py` 到了 runner 上直接报 `SyntaxError: Non-UTF-8 code starting with '\x88'`，文件开头就是不可解码的字节。换一种方式从本地读取再上传就正常了。`rules.json` 恰好是另一条路径生成的，没受影响，所以第一次跑只挂在这一个文件上，排查起来反而容易。

**坑二：PAT 缺 `workflow` scope。** 往 `.github/workflows/` 路径传文件，contents API 返回 404（GitHub 对无权限的路径隐藏存在性）。不想再生成一轮 token，改走浏览器网页提交。新编辑器是 CodeMirror 6，没有普通 textarea，得往 contenteditable 里用 `execCommand("insertText")` 插文本。

**坑三：secret 加密 API。** 设置 Actions secret 要用 libsodium 的 sealed box 加密。本机 PyNaCl 1.6.2 的 `SealedBox` 没有 `seal` 方法，实际要用 `nacl.bindings.crypto_box_seal(message, pubkey)`，GitHub 收密文，公钥从 `GET /repos/.../actions/secrets/public-key` 拿。

改用 LLM 之后又踩了两个新坑，都跟"免费额度"和"模型类型"有关。

**坑四：reasoning 模型的 token 预算。** SenseNova 的 `deepseek-v4-flash` 是 reasoning 模型，回答前会先思考，而思考用的是 `max_tokens` 里的额度。给 1000，模型思考完就没预算输出正文了，content 是空的；给 3000，又超过免费额度的 TPM 上限直接被拒。**可用区间很窄**，我最后把起点定在 1600，内容为空时自动加预算重试。批量大小限制在 6，再多就容易被判超限。

顺带一个反直觉的发现：`max_tokens` 太小导致的失败**不会返回 429，而是 200 OK + 空 content**。只看状态码会以为成功了。

**坑五：批量调用必须能容错。** 同一个批次偶尔会返回截断的 JSON。代码现在对三类失败分别处理：content 为空就加预算重来、JSON 坏就重试、真的 429 就退避等待。**每个批次都可能失败需要重试**，不能一次成败定生死。

## 结果

改成每月一次 + AI 分类之后，手动触发跑了一次，日志：

```
viewer=Nijika-jia, lists=7: ...
starred repos: 164
repos currently in some list: 163
repos in no list: 1
  asking LLM for 1 repo(s)
  classify batch 1/1 (meta/astryx)
SKIP meta/astryx -> skipped-unsure-llm(0.55)
done: added=0 already-grouped=163 skipped-unsure=1 failed=0
```

唯一的新 star 是 `meta/astryx`（Meta 的开源设计系统），LLM 给了 0.55 的置信度——没到 0.7 的闸门，正则也没匹配上，所以**跳过了，没写进任何列表**。这是我想要的行为：等我自己看过之后，往 `overrides` 里加一条指定分组。

**每月一次意味着错过的月份不会自动补跑**，GitHub 的 cron 只在那个时刻触发一次。补跑靠 `workflow_dispatch` 手动入口。

另外 AI 的判断每月会重新给一遍，**同一个仓库下个月可能得到不同结果**。想固定结果，就把它写进 `overrides` —— 这条人工 override 通道还是得留着。
