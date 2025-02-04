# create-valaxy

Example: [valaxy.site](https://valaxy.site)

## Usage

```bash
# install
npm i
# or pnpm i

# start
npm run dev
# or pnpm dev
```

See `http://localhost:4859/`, have fun!

### Config

Modify `valaxy.config.ts` to custom your blog.

English & Chinese Docs is coming!

> Wait a minute.

### Docker

```bash
docker build . -t your-valaxy-blog-name:latest
```

## Structure

In most cases, you only need to work in the `pages` folder.

### Main folders

- `pages`: your all pages
  - `posts`: write your posts here, will be counted as posts
- `styles`: override theme styles, `index.scss`/`vars.csss`/`index.css` will be loaded automatically
- `components`: custom your vue components (will be loaded automatically)
- `layouts`: custom layouts (use it by `layout: xxx` in md)
- `locales`: custom i18n

### Other

- `.vscode`: recommend some useful plugins & settings, you can preview icon/i18n/class...
- `.github`: GitHub Actions to auto build & deploy to GitHub Pages
- `netlify.toml`: for [netlify](https://www.netlify.com/)
- `vercel.json`: for [vercel](https://vercel.com/)

```
 Nijikajia
├─ .dockerignore
├─ .editorconfig
├─ .github
│  └─ workflows
│     └─ gh-pages.yml
├─ .gitignore
├─ .npmrc
├─ .valaxy
│  └─ typed-router.d.ts
├─ .vscode
│  ├─ extensions.json
│  └─ settings.json
├─ components
│  ├─ README.md
│  ├─ YunFooter.vue
│  └─ YunPostMeta.vue
├─ Dockerfile
├─ layouts
│  └─ README.md
├─ locales
│  ├─ en.yml
│  ├─ README.md
│  └─ zh-CN.yml
├─ netlify.toml
├─ nginx.conf
├─ package.json
├─ pages
│  ├─ 404.md
│  ├─ ablums
│  │  ├─ gallery1.md
│  │  ├─ gallery2.md
│  │  └─ index.md
│  ├─ about
│  │  ├─ index.md
│  │  └─ site.md
│  ├─ archives
│  │  └─ index.md
│  ├─ categories
│  │  └─ index.md
│  ├─ girls
│  │  └─ index.md
│  ├─ links
│  │  └─ index.md
│  ├─ posts
│  │  ├─ hello-valaxy.md
│  │  └─ test.md
│  └─ tags
│     └─ index.md
├─ pnpm-lock.yaml
├─ public
│  ├─ albums
│  │  └─ albums.json
│  ├─ avatar
│  │  └─ avatar.jpg
│  ├─ bg
│  │  ├─ bg1.jpg
│  │  └─ bg2.jpg
│  ├─ cur
│  │  └─ NormalSelect.cur
│  ├─ favicon.svg
│  ├─ friends
│  │  └─ links.json
│  ├─ girls
│  │  ├─ HeavyLove.json
│  │  └─ PastLove.json
│  ├─ ico
│  │  └─ icon.jpg
│  ├─ pwa-192x192.png
│  ├─ pwa-512x512.png
│  ├─ safari-pinned-tab.svg
│  └─ _headers
├─ README.md
├─ site.config.ts
├─ styles
│  ├─ css-vars.scss
│  ├─ index.scss
│  └─ README.md
├─ tsconfig.json
├─ valaxy.config.ts
└─ vercel.json

```# Nijika-jia.github.io
# Nijika-jia.github.io
# Nijika-jia.github.io
