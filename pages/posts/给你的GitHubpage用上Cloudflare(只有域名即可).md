---
layout: post
title: 给你的GitHubpage用上Cloudflare(只有域名即可)
date: 2025-02-04 20:16:42
tags: 
    - DNS解析
    - GithubPages加速
    - Cloudflare
    - 自定义域名
    - SSL加密
    - 网站加速
    - 网站安全
    - HTTPS
    - CDN
    - 网络优化
    - GitHub配置
    - 域名绑定
categories: 爱分享
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
---
## 🚀 给你的 GitHub Page 用上 Cloudflare（只要有域名即可！）

如果你有自己的 GitHub Pages 网站，可能已经体验过它的简洁和便捷。但如果你想让它看起来更专业、更加快速、并且具备更强的安全性，那么使用自定义域名并将其通过 Cloudflare 进行加速和保护，是一个非常值得尝试的方案！今天我就带你走一遍简单的设置流程，让你的 GitHub Pages 变得更炫酷！✨

---

### 🌟 为什么选择 Cloudflare？

Cloudflare 不仅能提供免费的 **CDN（内容分发网络）**，还可以帮助你保护网站免受恶意攻击，还能优化网页加载速度。对于 GitHub Pages 网站来说，使用 Cloudflare 的最大好处是能够轻松设置自己的自定义域名，并且提供 **SSL/TLS 加密保护**，让你的网站在访问时更安全🔒。

---

### 🛠️ 准备工作：注册 Cloudflare 账户

在开始之前，你需要先有一个 Cloudflare 账户。如果你还没有的话，可以去 [Cloudflare 官网](https://www.cloudflare.com) 免费注册一个。

注册后，登录到你的 Cloudflare 仪表盘，准备开始设置！👨‍💻

---

### 🔧 步骤 1: 添加你的域名到 Cloudflare

1. **添加站点**  
   登录 Cloudflare 后，点击仪表盘右上角的 **“Add a domain”**，输入你想要绑定的域名。比如说，`yourdomain.com`。
   
   ![1](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-19-11.png)  
   ![1](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-19-38.png)

2. **选择计划**  
   Cloudflare 会询问你选择哪个计划。对于大部分用户来说，选择 **Free（免费计划）** 就足够了，它提供了相当丰富的功能，免费也能用。

   ![2](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-20-15.png)

3. **DNS 配置**  
   Cloudflare 会自动扫描并列出你的域名当前的 DNS 记录。如果是第一次使用 Cloudflare，它会显示一些默认的记录。你需要检查这些记录，确保它们是正确的。

4. **查看 Cloudflare 提供的名称服务器**  
   在 Cloudflare 中，找到你的域名，进入 **DNS** 设置页面，Cloudflare 会为你的域名提供一对 **名称服务器（Nameservers）**。它们通常是像 `ns1.cloudflare.com` 和 `ns2.cloudflare.com` 这样的形式。

   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-59-43.png)

5. **复制 Cloudflare 提供的名称服务器地址**  
   Cloudflare 会提供两条名称服务器的地址。复制这两条地址，接下来需要在你域名的注册商那里设置它们。

6. **登录到域名注册商**（例如，阿里云、GoDaddy、Namecheap 等）  
   登录到你购买并管理域名的注册商平台。以 **阿里云** 为例：

   - 进入阿里云控制台，选择 **域名与网站** > **域名**。
   - 在域名列表中选择你要配置的域名。
   - 进入 **域名管理** 页面，找到 **DNS 设置** 或 **名称服务器设置**。

   ![6](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-58-10.png)

7. **修改域名的名称服务器**  
   - 在 **名称服务器** 设置中，选择自定义名称服务器，替换掉当前的默认名称服务器。
   - 将你从 Cloudflare 获取到的两条名称服务器地址填入：
     - **ns1.cloudflare.com**
     - **ns2.cloudflare.com**

   ![7](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-58-59.png)

   如果你使用的是其他注册商，过程类似，只需要找到名称服务器设置，然后输入 Cloudflare 提供的两条名称服务器地址。

8. **保存设置并等待生效**  
   修改名称服务器后，保存设置。DNS 更新可能会在 **几分钟到几小时之间生效**，具体时间取决于 DNS 传播的速度。

---

### 🌐 步骤 2: 配置 DNS 记录

在 GitHub Pages 上使用自定义域名时，关键的一步是配置 DNS 记录。GitHub Pages 会提供你需要的 IP 地址，通常是：

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

你需要在 Cloudflare 的 DNS 设置中添加这些记录：

1. **进入 Cloudflare 仪表盘**，选择你的域名。
2. 点击 **DNS** 标签页。
3. **添加新的 A 记录**，为你的域名配置 GitHub Pages 的 IP 地址。
   - 类型选择 **A**。
   - 在 **Name** 一栏填入你希望使用的子域名，比如 `www`。
   - 在 **IPv4 address** 一栏填入上述提供的 IP 地址。

4. **设置 CNAME 记录（推荐）**  
   如果你不想使用 `www`，你也可以设置一个 CNAME 记录：
   - 类型选择 **CNAME**。
   - 在 **Name** 一栏填入 `@`（代表裸域名）。如果你使用的是其他子域名（例如 `blog`），则可以填入 `blog`。
   - 在 **Target** 一栏填入 `yourusername.github.io`，这是你 GitHub Pages 网站的地址。

   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-45-58.png)  
   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-46-14.png)

---

### 🖥️ 步骤 3: 配置 GitHub Pages

现在你的 DNS 记录已经设置好了，接下来需要配置 GitHub 上的仓库：

1. 打开你的 GitHub 仓库，点击 **Settings**。
2. 滚动到 **Pages** 部分。
3. 在 **Custom domain** 输入框中填入你刚刚配置的自定义域名（例如 `www.yourdomain.com`）。如果出现 **DNS check successful!**，说明就成功了。

   ![3](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-51-37.png)

4. 点击 **Save** 保存设置。

GitHub 会自动为你启用 HTTPS，保证访问的安全性。

---

### 🔒 步骤 4: 在 Cloudflare 启用 SSL/TLS

一旦你设置好 DNS 记录并在 GitHub 上绑定了自定义域名，回到 Cloudflare 仪表盘：

1. 选择你的域名，点击 **SSL/TLS** 标签。
2. 在 SSL 设置中，选择 **Full (Strict)**，这样 Cloudflare 会为你提供加密保护。
3. 确保 **Always Use HTTPS** 选项被启用，这样无论访问者输入的是 `http://` 还是 `https://`，都会自动跳转到安全的 HTTPS 版本。

   ![3](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-02-15.png)

---

### ⏳ 步骤 5: 等待生效

DNS 更改通常需要一些时间才能生效，可能是几分钟到几小时。你可以耐心等待，也可以使用一些 DNS 查询工具（例如 [dnschecker.org](https://dnschecker.org/)）来检查域名是否已经指向 GitHub Pages。

---

### 🎉 完成！

现在，恭喜你！你的 GitHub Pages 网站已经成功配置了 Cloudflare 和自定义域名。你的网站应该加载速度更快了，🔧

![网络速度截图](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-15-59.png)

同时还具备了更高的安全性。如果你使用的是博客、作品集或者个人项目页面，给它一个自定义域名会让它看起来更加专业✨。

记得定期检查 Cloudflare 和 GitHub Pages 的设置，保持它们的最新状态。如果你遇到任何问题，Cloudflare 和 GitHub

 上都有大量的帮助文档和社区讨论，能帮你解决大部分问题。🔍

---

希望这篇文章能帮助你顺利地给 GitHub Pages 配上 Cloudflare！🚀

---