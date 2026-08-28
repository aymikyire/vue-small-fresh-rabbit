# useCountDown.js 实现练习指南

> 目标：不看参考答案，自己补全 `src/composables/useCountDown.js` 中的 3 个 TODO，最终实现 **倒计时 composable 函数**。
>
> **本练习核心知识点：composable 模式、ref、computed、setInterval、onUnmounted。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/composables/useCountDown.js` —— 3 个 TODO 待补全 |
| 参考答案 | `src/composables/useCountDown.full.js` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是倒计时不工作 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 15~20 分钟 |

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，找到 `Pay/index.vue`，看到：

```vue
<script setup>
import { useCountDown } from '@/composables/useCountDown'
const { formatTime, start } = useCountDown()
</script>
<template>
  <span>付款剩余时间：{{ formatTime }}</span>
</template>
```

问自己：
- `useCountDown()` 返回了什么？（formatTime 和 start）
- 组件销毁时需要做什么？（清除定时器，防止内存泄漏）

**验证**：能说出"useCountDown 是 composable 函数，返回响应式数据和操作函数"就算过关。

---

### 步骤 1（TODO ①）：创建 ref

**做什么**：把 `const time = undefined` 替换为 `const time = ref(0)`。

**提示**：`const time = ref(0)`

**验证**：🎯 无直接视觉效果，但后续步骤依赖它。

---

### 步骤 2（TODO ②）：创建 formatTime 计算属性

**做什么**：用 `computed` + `dayjs` 把秒数格式化为 "xx分xx秒"。

**提示**：
- `dayjs.unix(time.value)` —— 把 Unix 时间戳转成 dayjs 对象
- `.format('mm分ss秒')` —— 格式化为分钟和秒

**验证**：🎯 刷新页面，看到"00分00秒"（初始值）。

---

### 步骤 3（TODO ③ + TODO ④）：实现 start 函数 + 清理定时器

**做什么**：
1. `start(currentTime)` 中设置 `time.value = currentTime`，然后 `setInterval` 每秒减 1
2. `onUnmounted` 中清除定时器

**提示**：
- `timer = setInterval(() => { time.value-- }, 1000)`
- `onUnmounted(() => { timer && clearInterval(timer) })`

**验证**：🎯 **进入支付页面，看到倒计时从 "xx分xx秒" 开始递减**。

---

## 三、练完后怎么办

- **删除参考答案**：`useCountDown.full.js` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/composables/useCountDown.js` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] `time` ref 正确创建（初始值 0）
- [ ] `formatTime` 计算属性正确格式化时间
- [ ] `start` 函数正确设置初始值并开启定时器
- [ ] `onUnmounted` 清除了定时器
- [ ] 进入支付页面看到倒计时递减
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **composable + 生命周期清理** 核心技能！
