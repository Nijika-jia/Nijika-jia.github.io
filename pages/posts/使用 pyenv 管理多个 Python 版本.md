---
layout: post
title: 使用 pyenv 管理多个 Python 版本
date: 2025-03-04 23:23:54
tags: 
  - Python
  - pyenv
  - 版本管理
  - 开发环境
  - Windows
  - 命令行工具
  - Python工具
  - 编程技巧
  - 开发效率
categories: 爱记录
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
cover: /posts/使用%20pyenv%20管理多个%20Python%20版本_2025-03-04-23-40-03.png
---

我是伊地知佳，虽然生活坎坷，但在技术上我还是有些心得。今天就给大家详细讲讲如何利用 pyenv（在 Windows 下使用的是 pyenv-win）来管理多个 Python 版本，以及如何在项目中快捷切换不同版本，让开发环境更灵活高效。

## 目录

- [前言](#前言)
- [为什么要使用 pyenv？](#为什么要使用-pyenv)
- [安装 pyenv-win](#安装-pyenv-win)
- [安装多个 Python 版本](#安装多个-Python-版本)
- [全局和局部版本切换](#全局和局部版本切换)
- [常见问题与解决方案](#常见问题与解决方案)
- [总结](#总结)

## 前言

在开发过程中，不同项目可能需要不同版本的 Python。为了避免手动安装和卸载带来的麻烦，我们可以使用 pyenv 来管理多个 Python 版本。pyenv 可以让你在同一台机器上轻松安装、切换和管理多个版本，不仅提高了开发效率，还能避免版本冲突问题。

## 为什么要使用 pyenv？

- **便捷安装**：只需一条命令就能安装所需的 Python 版本。
- **快速切换**：可以设置全局默认版本，也可以在项目目录下设置局部版本，满足项目的特定需求。
- **灵活管理**：你可以同时保留多个 Python 版本，并根据需要随时切换，无需重装系统或繁琐配置。

## 安装 pyenv-win

在 Windows 下，建议使用 [pyenv-win](https://github.com/pyenv-win/pyenv-win) 来管理 Python 版本。下面是安装步骤：

1. **打开 PowerShell**  
   请以管理员身份运行 PowerShell（在“开始菜单”中搜索“PowerShell”，右键选择“以管理员身份运行”）。
![](/posts/使用%20pyenv%20管理多个%20Python%20版本_2025-03-04-23-25-11.png)
2. **执行安装命令**  
   由于官方脚本地址可能有更新，目前推荐使用以下命令安装 pyenv-win：
   
   ```powershell
   Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
   ```
   
   这条命令会下载并执行安装脚本。安装完成后，建议重启 PowerShell。
   (如果不能安装就得去[github-pyenv-win](https://github.com/pyenv-win/pyenv-win) 去看看READEME运行最新的命令,AI给的不一定就行)\
   失败案例:
   ```cmd
   Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install.ps1" -OutFile "./install.ps1"
    Invoke-WebRequest : 404: Not Found
    所在位置 行:1 字符: 1
    + Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubuserconten ...
    + ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-WebRequest]，WebExce
    ption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeWebRequestCommand
   ```

3. **验证安装**  
   重启 PowerShell 后，运行以下命令检查是否安装成功：
   
   ```powershell
   pyenv --version
   ```
   
   如果显示版本信息，则说明安装成功。ヾ(≧▽≦*)o

## 安装多个 Python 版本

安装完成 pyenv-win 后，你可以使用它来安装任意你需要的 Python 版本。例如，安装 Python 3.10.9 的命令如下：

1. **查看可用版本列表**  
   ```powershell
   pyenv install --list
   ```
   在输出的列表中找到你需要的版本（例如 `3.10.9`）。

2. **安装指定版本**  
   ```powershell
   pyenv install 3.10.9
   ```
   安装过程可能需要一些时间，请耐心等待。(真的特别久)
![](/posts/使用%20pyenv%20管理多个%20Python%20版本_2025-03-04-23-32-56.png)
## 全局和局部版本切换

### 设置全局默认版本

如果你希望所有终端默认使用某个 Python 版本（例如 3.10.9），可以使用以下命令：

```powershell
pyenv global 3.10.9
```

之后在新的终端中执行：

```powershell
python --version
```

应输出 `Python 3.10.9`。切换成功啦～(＾▽＾)

### 设置项目局部版本

如果你只想在某个项目中使用特定的 Python 版本，请进入该项目目录，然后执行：

```powershell
pyenv local 3.10.9
```

这会在当前目录下创建一个 `.python-version` 文件，指定该目录及其子目录使用指定版本。这样就能确保项目在不同环境中运行一致。

## 常见问题与解决方案

- **切换版本后环境不生效**  
  请确保关闭并重启终端，使新的环境变量生效。

- **虚拟环境管理**  
  注意：虚拟环境是基于当前全局 Python 版本创建的。如果你切换了版本，建议重新创建虚拟环境：
  
  ```powershell
  python -m venv myenv
  ```
  
  然后激活：
  
  ```powershell
  .\myenv\Scripts\activate
  ```

- **与系统 PATH 冲突**  
  如果出现冲突，请检查系统环境变量中是否有其他 Python 路径，确保 pyenv 路径在前。

---

别忘了，技术的道路上，总会遇到各种坎坷，但只要肯钻研，必能突破困境。跌丝袜！我们下期再见～(=ↀωↀ=)✧

---