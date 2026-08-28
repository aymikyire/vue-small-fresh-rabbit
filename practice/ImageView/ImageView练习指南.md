# ImageView/index.vue 实现练习指南

> 目标：不看参考答案，自己补全 `src/components/ImageView/index.vue` 中的 1 个 TODO，最终实现 **图片放大镜滑块跟随鼠标移动**。
>
> **本练习核心知识点：watch 监听器、模板 ref、`:style` 动态样式。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/components/ImageView/index.vue` —— 1 个 TODO 待补全 |
| 参考答案 | `src/components/ImageView/index.full.vue` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是放大镜不跟随鼠标 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 25~30 分钟 |

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，进入商品详情页，找到图片区域。

问自己：
- 模板中的 `ref="target"` 绑定了什么？（`target` ref，指向 div DOM 元素）
- `useMouseInElement(target)` 返回什么？（elementX, elementY, isOutside）
- `:style="{ left: \`${left}px\` }"` 中的 `left` 是什么？（控制滑块位置的 ref）

**验证**：能说出"鼠标在图片区域内移动时，滑块需要跟随移动"就算过关。

---

### 步骤 1（TODO ①）：实现 watch 监听

**做什么**：用 `watch` 监听 `[elementX, elementY]`，控制滑块位置。

**提示**：
1. `watch([elementX, elementY], () => { ... })` —— 监听两个源
2. 先判断 `if (isOutside.value) return` —— 鼠标不在图片内就不处理
3. 横向：`elementX` 在 100~300 之间时，`left = elementX - 100`
4. 纵向：`elementY` 在 100~300 之间时，`top = elementY - 100`
5. 边界处理：超出范围固定为 0 或 200
6. 大图偏移：`positionX = -left * 2`（放大 2 倍）

**验证**：🎯 **鼠标在图片上移动，灰色滑块跟随鼠标移动；鼠标移出后滑块消失，放大镜大图也消失**。

---

## 三、练完后怎么办

- **删除参考答案**：`index.full.vue` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/components/ImageView/index.vue` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] `watch` 正确监听 `[elementX, elementY]`
- [ ] 鼠标在图片内时滑块跟随移动
- [ ] 边界处理正确（不超出图片范围）
- [ ] 放大镜大图背景偏移正确
- [ ] 鼠标移出后滑块和大图都隐藏
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **watch 监听器 + 动态样式** 核心技能！
