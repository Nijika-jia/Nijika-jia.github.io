---
title: 让 GitHub Actions 自动把新 star 的仓库分进列表
date: 2026-11-03 10:56:00
updated: 2026-11-09 17:34:48
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

具体做法是让 LLM 顺带给一个 `confidence`，低于阈值（默认 0.7）就不采纳它的判断，退回正则；正则也不匹配就跳过。

还有个细节：`rules` 里的 `.*` 兜底规则不能算作"匹配上了"。否则每个仓库都能匹配规则，LLM 那一档就永远轮不到。代码里要把这条规则单独摘出来。

## 喂什么给模型：README 比描述管用

第一版只喂仓库名、描述和 topics，跑出来的一批结果挺准，但**只要描述是空的，模型就只能猜**。

描述空的仓库置信度普遍落在 0.2–0.3，正好卡在 0.7 的闸门下面，等于全都跳过。原因不复杂，很多仓库的描述就一句话甚至没有，光靠这一句话确实判断不出来。

解法是加 README。README 平均 1.7 万字符（最长的 5 万多），直接塞进 prompt 会把免费额度撑爆，所以先压缩一遍：

- 剥掉 badge、HTML 块（`<table>` / `<div>` / `<img>`，很多是跨行的）、代码块、目录
- **只保留开头那段散文**——第一个标题之后的内容是目录、预览图、安装说明，对判断用途没帮助
- 结果控制在 600 字符以内

效果很明显，同样是那几个没描述的仓库，置信度从 0.2–0.3 直接涨到 0.8–0.9，跨过了闸门。164 个仓库全部分类成功，没有一个批次失败。

不过有个反直觉的教训：**光加 README 还不够。** README 里技术细节会带偏模型——一个 VS Code 主题插件，README 里"VS Code"指向开发环境，"《孤独摇滚！》动画"才指向 ACG，模型抓了前者判错了。提示词里得补一条原则：**按项目的主题和领域分类，不要按它用的技术栈分类**。

## 分类组要写边界，不能只写名字

改完之后还剩一个硬伤，AI 判出来的结果和我的实际分组只有 49% 一致。

一开始以为是模型不行，后来发现是**我只给了 7 个组名，没说清每组管什么**。模型看着"AI Agent 工具箱"和"AI Coding & 开发环境"，根本不知道一个 agent skill 该放哪边，只能靠名字的字面意思猜。

于是给每个组补了**「属于」和「不属于」两行**：

```
【AI Agent 工具箱】
  属于：AI Agent 的运行时、框架、编排平台，以及 Agent Skill 技能包。
        核心是「给 AI agent 用的东西」。
  不属于：给人用的 AI 编程 IDE/编辑器（那是开发环境）。
        RAG 引擎和向量库（那是应用项目参考）。
        API 中转网关（那是应用项目参考）。
```

**「不属于」那一行比「属于」有用得多。** 它写的是最容易混淆的邻居——命中了就说明该去别的组。

改完重跑，一致率从 49% 涨到 **60%**。而且两次独立运行的**自一致率 95%**（155/164），说明随机波动只有 3 个百分点，远小于 8 个百分点的提升，这确实是边界定义带来的。

分布的变化也印证了问题所在：

| 分组 | 只给名字 | 加边界后 | 实际 |
|------|---------|---------|------|
| AI Agent 工具箱 | 54 | 43 | 39 |
| 应用项目参考 | 16 | 35 | 28 |
| 我的项目 | 2 | 12 | 8 |

"AI Agent 工具箱"本来是**伪装成真分类的兜底桶**——它同时装着 agent 框架、skill 包、RAG 库和 API 网关，四种东西。只要没写清楚边界，它就会一直膨胀。

同理，"应用项目参考"涨到 35 也是因为我在定义里写了"这是兜底组，什么都不像的放这儿"，模型就照做了。**兜底组必须明说是兜底组**，不然它会悄悄变成第二个垃圾桶。

最后还是给它减了负：从"应用项目参考"里分出 11 个纯资料类（教程、指南、题库、Awesome 清单、模板集）到新的「资料 & 教程」组。这一组判断标准最清楚，也不会无限膨胀——教程和清单是有限的，不会天天新增。

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

**坑四：reasoning 模型的 token 预算。** SenseNova 的 `deepseek-v4-flash` 是 reasoning 模型，回答前会先思考，而思考用的是 `max_tokens` 里的额度。给 1000，模型思考完就没预算输出正文了，content 是空的；给 3000，又超过免费额度的 TPM 上限直接被拒。

顺带一个反直觉的发现：`max_tokens` 太小导致的失败**不会返回 429，而是 200 OK + 空 content**。只看状态码会以为成功了。

我一开始把这个当成"免费额度太小"，在 1600–2000 这个窄区间里来回试。后来翻 API 文档才发现有个 `thinking` 参数可以**关掉思考模式**（`thinking: {"type": "disabled"}`）。关掉之后 `max_tokens` 全留给输出，同样的 prompt 稳定出结果，而且快得多。**问题从来不是额度，是模型在偷偷思考。**

**坑五：限流要换模型，不是换时间。** 不同模型的 RPM 限额是分开的——同一个 key 下 `deepseek-v4-flash` 打满了，`sensenova-6.8-flash` 可能还很空。所以撞限流时不用原地等，换下一个模型更快也更稳。代码里维护了一个候选模型列表，429 就自动往下切。

**坑六：批量调用必须能容错。** 同一个批次偶尔会返回截断的 JSON。代码现在对三类失败分别处理：content 为空就加预算重来、JSON 坏就重试、真的 429 就换模型。**每个批次都可能失败需要重试**，不能一次成败定生死。

## 结果

改成每月一次 + AI 分类之后，手动触发跑了一次，日志：

```
viewer=Nijika-jia, lists=8: ...
starred repos: 164
repos currently in some list: 163
repos in no list: 1
  asking LLM for 1 repo(s)
  readme summaries attached: 1/1
  classify batch 1/1 (meta/astryx)
SKIP meta/astryx -> skipped-unsure-llm(0.60)
done: added=0 already-grouped=163 skipped-unsure=1 failed=0
```

唯一的新 star 是 `meta/astryx`（Meta 的开源设计系统），LLM 给了 0.60 的置信度——没到 0.7 的闸门，正则也没匹配上，所以**跳过了，没写进任何列表**。这是我想要的行为：等我自己看过之后，往 `overrides` 里加一条指定分组。

分组从 7 个加到 8 个，加了「资料 & 教程」。现在的分布是：

```
AI Agent 工具箱 38 · AI Coding & 开发环境 36 · 效率桌面工具 22
应用项目参考 21 · 内容创作 & ACG 18 · 资料 & 教程 11
QQ & 机器人 9 · 我的项目 8
```

163 个仓库，每个恰好在一个组里。

**每月一次意味着错过的月份不会自动补跑**，GitHub 的 cron 只在那个时刻触发一次。补跑靠 `workflow_dispatch` 手动入口。

另外 AI 的判断每月会重新给一遍，**同一个仓库下个月可能得到不同结果**。想固定结果，就把它写进 `overrides` —— 这条人工 override 通道还是得留着。
