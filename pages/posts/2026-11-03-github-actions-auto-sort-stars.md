---
title: 让 GitHub Actions 自动把新 star 的仓库分进列表
date: 2026-11-03 10:56:00
updated: 2026-11-03 10:56:00
draft: false
layout: post
top: 0
---
# 让 GitHub Actions 自动把新 star 的仓库分进列表

GitHub 的 star 列表（Lists）没有 REST API，也没有"你 star 了别人仓库"的 webhook。想要新 star 自动归类，只能自己搭个定时轮询。我把这套东西跑起来了，记录一下选型和踩过的坑。

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

**怎么分类。** 关键词规则还是 LLM？选了规则：可解释、免费、改个配置文件下个整点就生效。匹配不到的落默认组，不会卡住。

**怎么触发。** GitHub 不给 star 事件发 webhook，Lists 也没有 REST API（gh CLI 的相关 issue #13226 还开着），所以只能定时拉 star 列表，找出不在任何列表里的新仓库。

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

## 部署：三个坑

仓库是私有的 `Nijika-jia/star-sorter`，四个文件：workflow（每小时 :17 触发，也留了手动入口）、`sort.py`、`rules.json`、`README.md`。

**坑一：传上去的文件是坏的。** `sort.py` 到了 runner 上直接报 `SyntaxError: Non-UTF-8 code starting with '\x88'`，文件开头就是不可解码的字节。换一种方式从本地读取再上传就正常了。`rules.json` 恰好是另一条路径生成的，没受影响，所以第一次跑只挂在这一个文件上，排查起来反而容易。

**坑二：PAT 缺 `workflow` scope。** 往 `.github/workflows/` 路径传文件，contents API 返回 404（GitHub 对无权限的路径隐藏存在性）。不想再生成一轮 token，改走浏览器网页提交。新编辑器是 CodeMirror 6，没有普通 textarea，得往 contenteditable 里用 `execCommand("insertText")` 插文本；验证内容时还要把行内 lint 提示节点（`cm-inlay-hint`，cron 行旁边那句 "Runs at 17 minutes past the hour"）剥掉，否则比对长度永远对不上。

**坑三：secret 加密 API。** 设置 Actions secret 要用 libsodium 的 sealed box 加密。本机 PyNaCl 1.6.2 的 `SealedBox` 没有 `seal` 方法，实际要用 `nacl.bindings.crypto_box_seal(message, pubkey)`，GitHub 收密文，公钥从 `GET /repos/.../actions/secrets/public-key` 拿。

## 结果

手动触发跑了一次，日志：

```
viewer=Nijika-jia, lists=7: ...
starred repos: 150
repos currently in some list: 148
ADD deeplethe/solid-glass -> AI Agent 工具箱
ADD panel-ui/PanelUI -> AI Agent 工具箱
done: added=2 already-grouped=148 failed=0
```

这期间新 star 的 2 个仓库自动进了对应列表，148 个已分组的全部跳过，零失败。之后每小时自动扫，想调分类规则就改 `rules.json` 提交，下个整点生效。
