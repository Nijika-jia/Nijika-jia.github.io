---
layout: post
title: 使用 pyenv 管理多个 Python 版本
date: 2025-03-04 23:23:00
tags:
  - Python
  - 开发环境
categories: 爱记录
draft: false
cover: /posts/使用 pyenv 管理多个 Python 版本_2025-03-04-23-40-03.png
updated: 2026-10-29 16:34:00
top: 0
---
这篇记录我在 Windows 上用 pyenv-win 管理多个 Python 版本的流程，包括安装、切换以及项目内固定版本。

## 目录

- [前言](#前言)
- [为什么要使用 pyenv？](#为什么要使用-pyenv)
- [安装 pyenv-win](#安装-pyenv-win)
- [安装多个 Python 版本](#安装多个-Python-版本)
- [全局和局部版本切换](#全局和局部版本切换)
- [常见问题与解决方案](#常见问题与解决方案)
- [总结](#总结)

## 前言

不同项目经常需要不同的 Python 版本。手动安装、卸载和修改环境变量都很麻烦，而 pyenv 可以在同一台机器上安装、切换和管理多个版本，减少版本冲突。

## 为什么要使用 pyenv？

- **安装方便**：一条命令就能安装所需的 Python 版本。
- **切换方便**：既能设置全局默认版本，也能在项目目录中指定局部版本。
- **版本并存**：可以同时保留多个 Python 版本，不需要重装系统。

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
   如果安装失败，以 [pyenv-win 仓库](https://github.com/pyenv-win/pyenv-win) README 中的最新命令为准；AI 给出的命令不一定始终有效。\
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
   
   如果显示版本信息，说明安装成功。

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
   安装过程可能需要一些时间。
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

   如果输出 `Python 3.10.9`，说明全局版本切换成功。

### 设置项目局部版本

如果你只想在某个项目中使用特定的 Python 版本，请进入该项目目录，然后执行：

```powershell
pyenv local 3.10.9
```

   这会在当前目录下创建一个 `.python-version` 文件，指定该目录及其子目录使用这个版本。项目在不同环境中运行时，版本选择会更一致。

## 常见问题与解决方案

- **切换版本后环境不生效**  
   请关闭并重新打开终端，让新的环境变量生效。

- **虚拟环境管理**  
   虚拟环境基于创建它时使用的 Python 版本。切换版本后，建议重新创建虚拟环境：
  
  ```powershell
  python -m venv myenv
  ```
  
  然后激活：
  
  ```powershell
  .\myenv\Scripts\activate
  ```

- **与系统 PATH 冲突**  
   如果出现冲突，请检查系统环境变量中是否有其他 Python 路径，并确认 pyenv 的路径排在前面。

---

pyenv-win 能把多版本 Python 项目的环境切换收在一处，日常开发会省事不少。

---
