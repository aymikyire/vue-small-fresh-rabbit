# directives/index.js 实现练习指南

> 目标：不看参考答案，自己补全 `src/directives/index.js` 中的 1 个 TODO，最终实现 **图片懒加载自定义指令**。
>
> **本练习核心知识点：自定义指令 `app.directive()`、`mounted` 钩子、`binding.value`、`useIntersectionObserver`。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/directives/index.js` —— 1 个 TODO 待补全 |
| 参考答案 | `src/directives/index.full.js` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是懒加载不生效 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 15~20 分钟 |

> ⚠️ **重要规则**：挖空版的 `mounted` 回调是空的，所以所有 `<img v-img-lazy>` 的图片都不会显示。这是正常的，补全后就会加载。

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，打开 `HomeHot.vue`，找到：

```vue
<img v-img-lazy="item.picture" alt="" />
```

问自己：
- `v-img-lazy` 是什么？（自定义指令）
- `binding.value` 代表什么？（等号后面的值，即 `item.picture`）

**验证**：能说出"自定义指令通过 `app.directive()` 注册，mounted 钩子在元素插入 DOM 后执行"就算过关。

---

### 步骤 1（TODO ①）：实现懒加载逻辑

**做什么**：在 `mounted(el, binding)` 中实现懒加载。

**提示**：
1. `useIntersectionObserver(el, callback)` —— 监听元素是否进入视口
2. 回调参数是 `([{ isIntersecting }])`，解构取得布尔值
3. `isIntersecting` 为 `true` 时，把 `el.src` 设置为 `binding.value`
4. 设置后调用 `stop()` 停止观察，避免重复触发

**验证**：🎯 **刷新页面，滚动到"人气推荐"区域，看到图片加载出来**。

---

## 三、练完后怎么办

- **删除参考答案**：`index.full.js` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/directives/index.js` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] `useIntersectionObserver` 正确调用
- [ ] 图片进入视口时 `el.src` 被设置
- [ ] 调用了 `stop()` 停止观察
- [ ] 滚动页面时图片能正常加载
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **自定义指令 + 懒加载** 核心技能！
