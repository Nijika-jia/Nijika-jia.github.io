# Pages CMS

这个仓库通过根目录的 `.pages.yml` 接入 Pages CMS。

## 首次连接

1. 打开 <https://app.pagescms.org>，使用 GitHub 登录。
2. 安装 Pages CMS GitHub App，只授权 `Nijika-jia/Nijika-jia.github.io` 仓库。
3. 选择 `main` 分支并打开仓库。
4. Pages CMS 会读取 `.pages.yml`，左侧应出现「文章」「友人帐」「站点配置」。

## 日常入口

- **文章**：管理 `pages/posts/**/*.md`，编辑正文、标题、日期、分类、标签和草稿状态。
- **独立页面**：关于我、关于站点、小项目、追番、我の推。
- **相册**：维护相册首页、封面和三组图集。
- **合集 / 合集定义（表单）**：新增合集、封面、标签和文章顺序。
- **合集 / 合集文章**：编辑自动生成的文章文件和正文。
- **小项目**：项目分类本身可以新增、删除和排序，每个分类下再维护项目卡片。
- **友人帐 / 友链列表**：以表单方式维护 `public/friends/links.json`。
- **友人帐 / 友人帐页面**：编辑 `pages/links/index.md` 的页面文字和配置。
- **站点配置 / 站点设置（表单）**：修改作者、社交链接、赞助、搜索、评论和页面数量。
- **站点配置 / 主题设置（表单）**：修改导航、首页横幅、背景、快捷页面、页脚和主题效果。
- **站点配置 / 站点信息**：高级模式，直接编辑 `site.config.ts`。
- **站点配置 / 主题与插件**：高级模式，直接编辑 `valaxy.config.ts` 和插件配置。
- **文案与样式**：编辑中英文文案、页面样式和颜色变量。

文章图片会上传到 `public/posts/`，相册图片会上传到 `public/albums/`，站点静态图片可从 `public/` 统一选择。

文章正文使用 Markdown 富文本编辑器，可以从编辑器工具栏插入图片，也可以直接把图片拖入正文或粘贴图片。上传完成后会写入 `/posts/...` 路径。

友链头像 URL 可以留空。页面会自动读取友链站点的 `favicon.ico`，失败后依次尝试 DuckDuckGo 和 Google 的 favicon 服务，最终使用默认头像。

新增合集时，在「合集定义」中添加合集和文章条目。每篇文章填写 `key` 或 `link`，二者只能选一个。保存后 GitHub Action 会运行 `npm run collections:generate`，自动生成：

- `pages/collections/<key>/index.ts`
- `pages/collections/<key>/index.md`
- 缺少的文章 Markdown 占位文件
- `pages/collections/index.md` 中的合集登记

不要在 Pages CMS 里手动新建合集目录；新文章先生成占位文件，再进入「合集文章」补充正文。

保存后 Pages CMS 会把改动提交到 GitHub；当前 GitHub Actions 会构建并发布 `main` 分支。

`settings.content.merge` 已开启，因此文章里未出现在表单中的 Frontmatter 字段不会被自动删除。
