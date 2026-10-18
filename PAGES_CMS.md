# Pages CMS

这个仓库通过根目录的 `.pages.yml` 接入 Pages CMS。

## 首次连接

1. 打开 <https://app.pagescms.org>，使用 GitHub 登录。
2. 安装 Pages CMS GitHub App，只授权 `Nijika-jia/Nijika-jia.github.io` 仓库。
3. 选择 `main` 分支并打开仓库。
4. Pages CMS 会读取 `.pages.yml`，左侧应出现「文章」「友人帐」「站点配置」。

## 日常入口

- **文章**：管理 `pages/posts/**/*.md`，编辑正文、标题、日期、分类、标签和草稿状态。
- **友人帐 / 友链列表**：以表单方式维护 `public/friends/links.json`。
- **友人帐 / 友人帐页面**：编辑 `pages/links/index.md` 的页面文字和配置。
- **站点配置 / 站点信息**：编辑 `site.config.ts`。
- **站点配置 / 主题与插件**：编辑 `valaxy.config.ts`。

文章图片会上传到 `public/posts/`，写入文章时使用 `/posts/...` 路径。

保存后 Pages CMS 会把改动提交到 GitHub；当前 GitHub Actions 会构建并发布 `main` 分支。

`settings.content.merge` 已开启，因此文章里未出现在表单中的 Frontmatter 字段不会被自动删除。
