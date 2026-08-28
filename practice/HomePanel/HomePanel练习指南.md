# HomePanel.vue 实现练习指南

> 目标：不看参考答案，自己补全 `src/views/Home/components/HomePanel.vue` 中的 2 个 TODO，最终实现 **props 接收标题 + 插槽渲染内容**。
>
> **本练习核心知识点：defineProps、默认插槽 `<slot>`。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/views/Home/components/HomePanel.vue` —— 1 个 TODO 待补全 |
| 参考答案 | `src/views/Home/components/HomePanel.full.vue` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是功能未实现 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 10~15 分钟 |

> ⚠️ **重要规则**：挖空版在 IDE 里会有黄色波浪线（"已声明但从未使用"），这是**正常的**。

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，打开 `HomePanel.vue`，**只读 `<template>` 部分**。

问自己：
- 模板中使用了 `{{ title }}` 和 `{{ subTitle }}`，它们从哪里来？
- `<slot />` 出现在什么位置？父组件的内容会被渲染到哪里？

**验证**：能说出"title 从 props 来，slot 渲染标题下方的内容"就算过关。

---

### 步骤 1（TODO ①）：defineProps

**做什么**：用 `defineProps` 定义两个 String 类型的 prop。

**提示**：
- `defineProps` 是 Vue 3 `<script setup>` 中接收 props 的语法
- 写法：`defineProps({ title: { type: String }, subTitle: { type: String } })`

**验证**：🎯 **刷新页面，看到标题文字正确显示（如"人气推荐"、"人气推荐 好多商品"）**。

---

### 步骤 2（TODO ②）：理解插槽

**做什么**：打开 `HomeHot.vue`（使用 HomePanel 的组件），找到：

```vue
<HomePanel title="人气推荐" sub-title="人气推荐 好多商品">
    <ul class="goods-list">...</ul>
</HomePanel>
```

问自己：
- `<HomePanel>` 标签之间的 `<ul>` 内容，最终渲染到 HomePanel 的哪个位置？
- 如果把 `<slot />` 换成 `<div>这里是插槽</div>`，页面会怎样变化？

**验证**：能说出"slot 是一个占位符，父组件的内容会替换它"就算过关。

---

## 三、练完后怎么办

- **删除参考答案**：`HomePanel.full.vue` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/views/Home/components/HomePanel.vue` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] `defineProps` 正确定义了 title 和 subTitle
- [ ] 页面标题文字正确显示
- [ ] `<slot />` 位置能渲染父组件传入的内容
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **defineProps + 插槽** 核心技能！
