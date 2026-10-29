---
layout: post
title: 给你的GitHubpage用上Cloudflare(只有域名即可)
date: 2025-02-04 20:16:00
tags:
  - Cloudflare
  - GitHub
categories: 爱分享
draft: false
updated: 2026-10-29 16:34:00
top: 0
---
## 给你的 GitHub Pages 用上 Cloudflare（有域名即可）

GitHub Pages 可以配合自定义域名使用。把域名交给 Cloudflare 管理后，可以同时使用它的 CDN、DNS 和 HTTPS 设置。下面是从添加域名到 GitHub Pages 绑定完成的流程。

---

### 为什么选择 Cloudflare？

Cloudflare 提供免费 CDN、DNS、攻击防护和 SSL/TLS 配置。对 GitHub Pages 来说，比较直接的好处是可以用自己的域名，并集中管理 DNS 和 HTTPS。

---

### 准备工作：注册 Cloudflare 账户

先准备一个 Cloudflare 账户。没有账户的话，可以在 [Cloudflare 官网](https://www.cloudflare.com) 免费注册。

注册并登录后，就可以添加域名了。

---

![域名经过 DNS 和 HTTPS 指向 GitHub Pages](/posts/2025-02-04-cloudflare-domain-route.webp)

### 步骤 1：添加你的域名到 Cloudflare

1. **添加站点**  
   登录 Cloudflare 后，点击仪表盘右上角的 **“Add a domain”**，输入要绑定的域名，例如 `yourdomain.com`。
   
   ![1](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-19-11.png)  
   ![1](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-19-38.png)

2. **选择计划**  
   Cloudflare 会让你选择套餐。普通个人站点通常选 **Free（免费计划）** 就够了。

   ![2](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-20-15.png)

3. **DNS 配置**  
   Cloudflare 会自动扫描并列出域名当前的 DNS 记录。第一次使用时，先检查这些记录是否正确。

4. **查看 Cloudflare 提供的名称服务器**  
   进入域名的 **DNS** 设置页面，Cloudflare 会提供一对 **名称服务器（Nameservers）**，通常形如 `ns1.cloudflare.com` 和 `ns2.cloudflare.com`。

   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-59-43.png)

5. **复制 Cloudflare 提供的名称服务器地址**  
   复制这两条名称服务器地址，下一步要在域名注册商那里替换原有设置。

6. **登录到域名注册商**（例如，阿里云、GoDaddy、Namecheap 等）  
   登录购买和管理域名的注册商平台。以 **阿里云** 为例：

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
   修改名称服务器后保存设置。DNS 更新通常需要几分钟到几小时，具体取决于 DNS 传播速度。

---

### 步骤 2：配置 DNS 记录

在 GitHub Pages 上使用自定义域名时，需要配置 DNS 记录。GitHub Pages 常用的 IPv4 地址是：

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
   使用 `www` 等子域名时，也可以设置 CNAME 记录：
   - 类型选择 **CNAME**。
    - 在 **Name** 一栏填入子域名，例如 `www` 或 `blog`。如果你的 DNS 服务商支持裸域名 CNAME，`@` 也可以作为名称。
   - 在 **Target** 一栏填入 `yourusername.github.io`，这是你 GitHub Pages 网站的地址。

   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-45-58.png)  
   ![4](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-46-14.png)

---

### 步骤 3：配置 GitHub Pages

DNS 记录设置好后，接下来配置 GitHub 仓库：

1. 打开你的 GitHub 仓库，点击 **Settings**。
2. 滚动到 **Pages** 部分。
3. 在 **Custom domain** 输入框中填入刚配置好的域名，例如 `www.yourdomain.com`。如果出现 **DNS check successful!**，说明 DNS 检查通过。

   ![3](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-21-51-37.png)

4. 点击 **Save** 保存设置。

GitHub Pages 随后会为域名配置 HTTPS。

---

### 步骤 4：在 Cloudflare 启用 SSL/TLS

DNS 记录设置好、GitHub 也绑定自定义域名之后，回到 Cloudflare：

1. 选择你的域名，点击 **SSL/TLS** 标签。
2. 在 SSL 设置中选择 **Full (Strict)**。
3. 启用 **Always Use HTTPS**，让 `http://` 请求自动跳转到 HTTPS。

   ![3](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-02-15.png)

---

### 步骤 5：等待生效

DNS 更改通常需要几分钟到几小时生效。可以用 [dnschecker.org](https://dnschecker.org/) 这类工具检查域名是否已经指向 GitHub Pages。

---

### 完成

到这里，GitHub Pages、Cloudflare 和自定义域名已经连起来了。

![网络速度截图](/posts/给你的GitHubpage用上Cloudflare(只有域名即可)_2025-02-04-22-15-59.png)

如果这是博客、作品集或个人项目页面，绑定自定义域名后访问地址会更固定。

后续可以定期检查 Cloudflare 和 GitHub Pages 的设置，避免域名或证书过期。遇到问题时，两家服务的文档和社区通常都能找到对应说明。

---

这套配置完成后，后续只要在 Cloudflare 管理 DNS，在 GitHub 管理 Pages 源即可。

---
