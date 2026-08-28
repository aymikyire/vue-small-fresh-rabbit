# XtxSku/index.vue 实现练习指南

> 目标：不看参考答案，自己补全 `src/components/XtxSku/index.vue` 中的 1 个 TODO，最终实现 **SKU 规格选择 + emit 通知父组件**。
>
> **本练习核心知识点：emits 子传父、Options API（setup 函数）、watchEffect。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/components/XtxSku/index.vue` —— 1 个 TODO 待补全 |
| 参考答案 | `src/components/XtxSku/index.full.vue` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是点击规格无反应 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 30~35 分钟 |

> ⚠️ **注意**：这个文件使用 **Options API**（`<script>` 不带 `setup`），是项目中唯一一个这样写的文件。对比学习很重要。

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，进入商品详情页，找到 SKU 选择区域。

问自己：
- 模板中的 `@click="clickSpecs(item, val)"` 是什么？（点击规格按钮触发的函数）
- `emits: ['change']` 是什么？（子组件向父组件发出的事件名）
- `emit('change', { skuId, price, ... })` 是什么？（把选中的 SKU 信息传给父组件）

**验证**：能说出"点击规格按钮 → 更新选中状态 → emit 通知父组件"就算过关。

---

### 步骤 1（TODO ①）：实现 clickSpecs

**做什么**：实现点击规格按钮的完整逻辑。

**提示**：
1. `if (val.disabled) return` —— 不可点的规格直接返回
2. 选中/取消选中：如果 `val.selected` 已选中 → 取消；否则先清除同组其他选中，再选中当前
3. `updateDisabledStatus` —— 更新禁用状态
4. 检查是否全选：`getSelectedArr(specs)` 获取选中数组，`filter(value => value)` 去掉 undefined
5. 全选了：从 `pathMap` 取 skuId，找到对应 sku，`emit('change', { skuId, price, ... })`
6. 未全选：`emit('change', {})`

**验证**：🎯 **点击不同规格按钮，选中状态正确切换；选中所有规格后，控制台能看到 emit 的数据**。

---

## 三、练完后怎么办

- **删除参考答案**：`index.full.vue` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/components/XtxSku/index.vue` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] 点击规格按钮正确切换选中状态
- [ ] 不可选的规格点击无反应（disabled）
- [ ] 选中一个规格后，其他不可组合的规格变灰（disabled）
- [ ] 所有规格选中后，emit 正确传出 skuId、price 等信息
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **emits 子传父 + Options API 对比** 核心技能！
