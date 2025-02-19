/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/404': RouteRecordInfo<'/404', '/404', Record<never, never>, Record<never, never>>,
    '/ablums/': RouteRecordInfo<'/ablums/', '/ablums', Record<never, never>, Record<never, never>>,
    '/ablums/game': RouteRecordInfo<'/ablums/game', '/ablums/game', Record<never, never>, Record<never, never>>,
    '/ablums/life': RouteRecordInfo<'/ablums/life', '/ablums/life', Record<never, never>, Record<never, never>>,
    '/about/': RouteRecordInfo<'/about/', '/about', Record<never, never>, Record<never, never>>,
    '/about/site': RouteRecordInfo<'/about/site', '/about/site', Record<never, never>, Record<never, never>>,
    '/archives/': RouteRecordInfo<'/archives/', '/archives', Record<never, never>, Record<never, never>>,
    '/categories/': RouteRecordInfo<'/categories/', '/categories', Record<never, never>, Record<never, never>>,
    '/girls/': RouteRecordInfo<'/girls/', '/girls', Record<never, never>, Record<never, never>>,
    '/links/': RouteRecordInfo<'/links/', '/links', Record<never, never>, Record<never, never>>,
    '/page/[page]': RouteRecordInfo<'/page/[page]', '/page/:page', { page: ParamValue<true> }, { page: ParamValue<false> }>,
    '/posts/': RouteRecordInfo<'/posts/', '/posts', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-1': RouteRecordInfo<'/posts/备战传智蓝桥DAY-1', '/posts/备战传智蓝桥DAY-1', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-10(福利局)': RouteRecordInfo<'/posts/备战传智蓝桥DAY-10(福利局)', '/posts/备战传智蓝桥DAY-10(福利局)', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-11': RouteRecordInfo<'/posts/备战传智蓝桥DAY-11', '/posts/备战传智蓝桥DAY-11', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-12': RouteRecordInfo<'/posts/备战传智蓝桥DAY-12', '/posts/备战传智蓝桥DAY-12', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-2': RouteRecordInfo<'/posts/备战传智蓝桥DAY-2', '/posts/备战传智蓝桥DAY-2', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-3': RouteRecordInfo<'/posts/备战传智蓝桥DAY-3', '/posts/备战传智蓝桥DAY-3', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-4': RouteRecordInfo<'/posts/备战传智蓝桥DAY-4', '/posts/备战传智蓝桥DAY-4', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-5': RouteRecordInfo<'/posts/备战传智蓝桥DAY-5', '/posts/备战传智蓝桥DAY-5', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-6': RouteRecordInfo<'/posts/备战传智蓝桥DAY-6', '/posts/备战传智蓝桥DAY-6', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-7': RouteRecordInfo<'/posts/备战传智蓝桥DAY-7', '/posts/备战传智蓝桥DAY-7', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-8': RouteRecordInfo<'/posts/备战传智蓝桥DAY-8', '/posts/备战传智蓝桥DAY-8', Record<never, never>, Record<never, never>>,
    '/posts/备战传智蓝桥DAY-9': RouteRecordInfo<'/posts/备战传智蓝桥DAY-9', '/posts/备战传智蓝桥DAY-9', Record<never, never>, Record<never, never>>,
    '/posts/崩溃了,AI': RouteRecordInfo<'/posts/崩溃了,AI', '/posts/崩溃了,AI', Record<never, never>, Record<never, never>>,
    '/posts/给你的GitHubpage用上Cloudflare(只有域名即可)': RouteRecordInfo<'/posts/给你的GitHubpage用上Cloudflare(只有域名即可)', '/posts/给你的GitHubpage用上Cloudflare(只有域名即可)', Record<never, never>, Record<never, never>>,
    '/posts/更好的在.md文件粘贴图片-Paste image VScode插件推荐': RouteRecordInfo<'/posts/更好的在.md文件粘贴图片-Paste image VScode插件推荐', '/posts/更好的在/md文件粘贴图片-Paste image VScode插件推荐', Record<never, never>, Record<never, never>>,
    '/posts/新年快乐': RouteRecordInfo<'/posts/新年快乐', '/posts/新年快乐', Record<never, never>, Record<never, never>>,
    '/posts/优先队列自定义排序': RouteRecordInfo<'/posts/优先队列自定义排序', '/posts/优先队列自定义排序', Record<never, never>, Record<never, never>>,
    '/posts/C++容器操作优化': RouteRecordInfo<'/posts/C++容器操作优化', '/posts/C++容器操作优化', Record<never, never>, Record<never, never>>,
    '/posts/hello': RouteRecordInfo<'/posts/hello', '/posts/hello', Record<never, never>, Record<never, never>>,
    '/posts/TypePost': RouteRecordInfo<'/posts/TypePost', '/posts/TypePost', Record<never, never>, Record<never, never>>,
    '/projects/': RouteRecordInfo<'/projects/', '/projects', Record<never, never>, Record<never, never>>,
    '/tags/': RouteRecordInfo<'/tags/', '/tags', Record<never, never>, Record<never, never>>,
  }
}
