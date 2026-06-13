import { defineCollection } from 'valaxy'

export default defineCollection({
  key: 'lanqiao',
  title: '备战传智蓝桥',
  cover: '/posts/图论可视化工具：一个轻量级的在线图形编辑与分析平台_2025-02-27-17-21-46.png',
  description: '传智杯 & 蓝桥杯备战日记，从图论到二分查找，13 天刷题记录与解题思路总结。',
  tags: ['算法', '蓝桥杯', '传智杯', '图论', 'DP'],
  items: [
    { title: 'DAY-1 拓扑排序与 DP', key: '1' },
    { title: 'DAY-2 最短路专题', key: '2' },
    { title: 'DAY-3 最小生成树', key: '3' },
    { title: 'DAY-4 并查集与 LCA', key: '4' },
    { title: 'DAY-5 树状数组与线段树', key: '5' },
    { title: 'DAY-6 字符串与哈希', key: '6' },
    { title: 'DAY-7 数论基础', key: '7' },
    { title: 'DAY-8 博弈论入门', key: '8' },
    { title: 'DAY-9 计算几何', key: '9' },
    { title: 'DAY-10 福利局', key: '10' },
    { title: 'DAY-11 动态规划进阶', key: '11' },
    { title: 'DAY-12 图论综合', key: '12' },
    { title: 'DAY-13 二分查找', key: '13' },
  ],
})
