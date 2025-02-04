---
layout: post
title: git命令更新Github仓库笔记
date: 2025-01-21 15:14:30
tags: 
    - Git
categories: 爱记录
time_warning: 0
end : true
---
---
## 完整命令

```sh
pnpm build
cd yourname.github.io
rm -rf ./*
cp -r ../dist/* .
git add .
git commit -m "Update blog content"
git push origin main
```
---
## 详细注解

```sh
# 1️⃣  构建博客
pnpm build  
```
> 运行 `pnpm build` 命令，使用 **pnpm** 构建静态文件，生成 `dist/` 目录（包含最终的 HTML、CSS、JS）。  

---

```sh
# 2️⃣  进入 GitHub Pages 仓库
cd yourname.github.io  
```
> 进入你的 **GitHub Pages** 仓库（`yourname.github.io`），这个仓库用于部署你的博客。  

---

```sh
# 3️⃣  清空旧的 GitHub Pages 站点内容
rm -rf ./*  
```
> **删除当前目录下的所有文件**，确保不会有旧文件残留（`-rf` 表示递归删除，不会有确认提示，请小心使用！）。  

---

```sh
# 4️⃣  复制新的构建文件到 GitHub Pages 目录
cp -r ../dist/* .  
```
> **将 `dist/` 目录下的所有新文件复制到当前目录**，用于替换原来的博客内容。  

---

```sh
# 5️⃣  添加更改到 Git 暂存区
git add .  
```
> **将所有更改（新增、删除、修改的文件）添加到 Git 暂存区**，准备提交。  

---

```sh
# 6️⃣  提交更新
git commit -m "Update blog content"  
```
> **提交更新，并附带 commit 信息**（"Update blog content" 说明此次提交的内容）。  

---

```sh
# 7️⃣  推送更新到 GitHub 仓库
git push origin main  
```
> **将本地的 main 分支推送到远程仓库的 `main` 分支**，GitHub Pages 会自动部署。  

---