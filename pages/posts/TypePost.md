---
layout: post
title: TypePost
date: 2025-01-30 15:46:28
tags: 
    - 标签
categories: 分类
top : 1 #置顶数值(越大越在前面)
draft: true #记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
nav: true
---

```markdown
tags: 
    - 标签
categories: 分类
#top : 1 #置顶数值(越大越在前面)
draft: false #true为草稿记得改false发布时
#time_warning: 30 #过多少天会警告
#color: red  #更改进入页面的标题颜色
#postTitleClass: "custom-title" #更改文章列表标题颜色,自定义的CSS在Style文件夹里index.scss
#sponsor: false #关闭赞助 
#copyright: false #关闭版权
```

::: tip

tip

:::

::: warning

warning

:::

::: danger

danger

:::

::: info

info

:::

::: details Click to expand

Details Content

:::

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```


这是一个脚注[^1-zh]。

这是一段脚注[^2-zh]。

[^1-zh]: 这是一个脚注。

[^2-zh]: 这是一段脚注。

  正确缩进的脚注段落会被自动附加。

使用 `^[content]` 可以创建方便的内联脚注^[比如这个！]。