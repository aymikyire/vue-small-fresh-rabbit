# cartStore.js 实现练习指南

> 目标：不看参考答案，自己补全 `src/stores/cartStore.js` 中的 2 个 TODO，最终实现 **Pinia 购物车的加入和全选逻辑**。
>
> **本练习核心知识点：Pinia setup 写法、computed 派生计算、购物车业务逻辑。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/stores/cartStore.js` —— 2 个 TODO 待补全 |
| 参考答案 | `src/stores/cartStore.full.js` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是加入购物车和全选不工作 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 35~40 分钟 |

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，进入商品详情页。

问自己：
- `addCart` 被谁调用？（详情页的"加入购物车"按钮）
- `checkAllCart` 被谁调用？（购物车页面的全选 checkbox）
- `persist: true` 是什么？（pinia-plugin-persistedstate，自动持久化到 localStorage）

**验证**：能说出"Pinia setup 写法：ref 是 state，computed 是 getters，函数是 actions"就算过关。

---

### 步骤 1（TODO ①）：实现 addCart

**做什么**：实现加入购物车逻辑。

**提示**：
1. 用 `find` 在 `cartList` 中查找是否已有相同 `skuId` 的商品
2. 如果找到了：`item.count += goods.count`（数量累加）
3. 如果没找到：`cartList.value.push({ ...goods, selected: true })`（新增，selected 默认 true）

**验证**：🎯 **在商品详情页点击"加入购物车"，购物车数量增加；再次点击同一商品，数量累加而不是新增**。

---

### 步骤 2（TODO ②）：实现 checkAllCart

**做什么**：实现全选/取消全选逻辑。

**提示**：遍历 `cartList`，把每一项的 `selected` 设置为传入的 `selected` 值。

**验证**：🎯 **在购物车页面点击全选 checkbox，所有商品都被选中/取消选中**。

---

## 三、练完后怎么办

- **删除参考答案**：`cartStore.full.js` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/stores/cartStore.js` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] `addCart` 正确判断有无再决定 push 还是累加
- [ ] 加入购物车后数量正确
- [ ] `checkAllCart` 正确遍历设置 selected
- [ ] 全选/取消全选功能正常
- [ ] 刷新页面后购物车数据还在（persist 生效）
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **Pinia setup + 购物车逻辑** 核心技能！
