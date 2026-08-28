# XtxSku 组件完全解析

## 一、为什么需要 SKU？

### 什么是 SKU？

SKU = Stock Keeping Unit（库存量单位），就是**商品的具体规格组合**。

### 举个例子

一件衣服有多种规格：

```
颜色：红色、蓝色、绿色
尺码：S、M、L
```

这些规格的**组合**就是 SKU：

| SKU | 颜色 | 尺码 | 库存 | 价格 |
|-----|------|------|------|------|
| SKU-1 | 红色 | S | 10件 | ¥99 |
| SKU-2 | 红色 | M | 5件 | ¥99 |
| SKU-3 | 蓝色 | S | 0件（缺货） | ¥99 |
| SKU-4 | 蓝色 | M | 8件 | ¥109 |
| SKU-5 | 绿色 | L | 3件 | ¥89 |

### 用户选购流程

```
用户打开商品详情页
    │
    ├── 看到"颜色"行：[红色] [蓝色] [绿色]
    ├── 看到"尺码"行：[S] [M] [L]
    │
    ├── 点击"红色" → 点击"M" → 选中了 SKU-2
    │   └── 显示：价格 ¥99，库存 5件
    │
    └── 点击"蓝色" → 点击"S" → 选中了 SKU-3
        └── 显示：库存 0件（缺货），按钮变灰不可点
```

### XtxSku 的作用

**让用户点选规格，自动判断哪个组合有货、哪个缺货，最终告诉父组件"用户选了哪个 SKU"。**

---

## 二、数据从哪里来？

### 父组件传入的数据

```vue
<!-- Detail/index.vue -->
<XtxSku :goods="goods" @change="skuChange"/>
```

`goods` 对象包含两个关键字段：

```js
goods = {
  specs: [...],   // 规格信息（颜色、尺码等有哪些选项）
  skus: [...]     // SKU 组合（每个组合的库存、价格）
}
```

### specs 的结构（规格选项）

```js
goods.specs = [
  {
    id: 1,
    name: '颜色',           // 规格名称
    values: [
      { name: '红色', picture: 'red.png' },   // 选项值（有图用图，没图用文字）
      { name: '蓝色', picture: 'blue.png' },
      { name: '绿色' }                         // 没有 picture 字段
    ]
  },
  {
    id: 2,
    name: '尺码',
    values: [
      { name: 'S' },
      { name: 'M' },
      { name: 'L' }
    ]
  }
]
```

### skus 的结构（SKU 组合）

```js
goods.skus = [
  {
    id: 101,
    inventory: 10,          // 库存（0 = 缺货）
    price: 99,              // 价格
    oldPrice: 129,          // 原价
    specs: [                // 这个 SKU 包含的规格
      { name: '颜色', valueName: '红色' },
      { name: '尺码', valueName: 'S' }
    ]
  },
  {
    id: 102,
    inventory: 5,
    price: 99,
    oldPrice: 129,
    specs: [
      { name: '颜色', valueName: '红色' },
      { name: '尺码', valueName: 'M' }
    ]
  },
  // ...更多 SKU
]
```

---

## 三、模板在做什么？

```vue
<dl v-for="item in goods.specs" :key="item.id">
  <dt>{{ item.name }}</dt>           <!-- 规格名称：颜色、尺码 -->
  <dd>
    <template v-for="val in item.values" :key="val.name">
      <!-- 有图片用图片（如颜色） -->
      <img v-if="val.picture" :src="val.picture"
           :class="{ selected: val.selected, disabled: val.disabled }"
           @click="clickSpecs(item, val)" />
      <!-- 没图片用文字（如尺码） -->
      <span v-else :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)">
        {{ val.name }}
      </span>
    </template>
  </dd>
</dl>
```

渲染效果：

```
颜色  [红色图片] [蓝色图片] [绿色图片]
尺码  [S] [M] [L]
```

---

## 四、每个函数详解

### 函数 1：`getPathMap(skus)` — 建立路径字典

**作用**：把所有有库存的 SKU 组合，转换成一个"字典"，方便后续快速查找。

**输入**：`skus` 数组（后端返回的 SKU 列表）

**输出**：`pathMap` 对象

```js
// 输入：skus（只有 inventory > 0 的才算）
skus = [
  { id: 101, inventory: 10, specs: [{valueName:'红色'}, {valueName:'S'}] },
  { id: 102, inventory: 5,  specs: [{valueName:'红色'}, {valueName:'M'}] },
  { id: 103, inventory: 0,  specs: [{valueName:'蓝色'}, {valueName:'S'}] },  // 缺货，跳过
  { id: 104, inventory: 8,  specs: [{valueName:'蓝色'}, {valueName:'M'}] }
]

// 输出：pathMap
pathMap = {
  '红色': [101, 102],           // 选红色能匹配到 SKU 101、102
  '红色★S': [101],              // 选红色+S 能匹配到 SKU 101
  '红色★M': [102],              // 选红色+M 能匹配到 SKU 102
  '蓝色': [104],                // 选蓝色能匹配到 SKU 104
  '蓝色★M': [104],              // 选蓝色+M 能匹配到 SKU 104
  // 注意：没有 '蓝色★S'，因为 SKU-3 库存为 0，被跳过了
}
```

**为什么要用幂集 `getPowerSet`？**

因为用户可能只选了一个规格（如只选了"红色"），也可能选了多个（如"红色+S"），字典需要覆盖所有可能的组合。

```
红色+S 的子集：['红色']、['S']、['红色','S']
→ 对应 key：'红色'、'S'、'红色★S'
→ 这三个 key 都能找到 SKU-101
```

**`spliter = '★'` 的作用**：分隔多个规格值，避免歧义（如"红色★S"不会和"红★色S"混淆）。

---

### 函数 2：`initDisabledStatus(specs, pathMap)` — 初始化禁用状态

**作用**：组件加载时，把**没有对应 SKU 的选项**设为灰色不可点。

**逻辑**：

```js
specs.forEach(spec => {
  spec.values.forEach(val => {
    val.disabled = !pathMap[val.name]
    // 如果 pathMap 里没有 '绿色' → disabled = true（灰色不可点）
    // 如果 pathMap 里有 '红色' → disabled = false（可点）
  })
})
```

**效果**：

```
颜色  [红色] [蓝色] [绿色]    ← 绿色变灰（没有绿色的 SKU）
尺码  [S] [M] [L]            ← L 变灰（没有 L 的 SKU）
```

---

### 函数 3：`getSelectedArr(specs)` — 获取当前选中状态

**作用**：遍历所有规格，返回一个数组，记录每个规格当前选中了哪个值。

**输入**：`specs`（规格数组）

**输出**：选中值数组

```js
// 如果用户选了"红色"和"M"
getSelectedArr(specs) = ['红色', 'M']

// 如果用户只选了"红色"
getSelectedArr(specs) = ['红色', undefined]

// 如果用户什么都没选
getSelectedArr(specs) = [undefined, undefined]
```

**用途**：给 `updateDisabledStatus` 和 `clickSpecs` 用来判断当前选中状态。

---

### 函数 4：`updateDisabledStatus(specs, pathMap)` — 更新禁用状态

**作用**：每次点击后，重新计算哪些选项应该变灰。

**逻辑**：

```
当前选中：['红色', undefined]（只选了红色）
遍历尺码的每个选项：
  ├── 尝试"红色★S" → pathMap 里有吗？→ 有 → S 可点
  ├── 尝试"红色★M" → pathMap 里有吗？→ 有 → M 可点
  └── 尝试"红色★L" → pathMap 里有吗？→ 没有 → L 变灰
```

**效果**：

```
用户点击"红色"后：
颜色  [红色✓] [蓝色] [绿色]
尺码  [S] [M] [L灰色]    ← L 自动变灰，因为"红色+L"没有库存
```

---

### 函数 5：`clickSpecs(item, val)` — 点击规格按钮

**作用**：用户点击某个规格按钮时的核心处理逻辑。

**参数**：
- `item`：当前规格行（如"颜色"这行）
- `val`：被点击的选项（如"红色"）

**流程**：

```
点击"红色"
    │
    ├── 1. val.disabled？→ 是 → return（不可点）
    │
    ├── 2. val.selected？→ 是 → 取消选中
    │                → 否 → 清除同组其他选中，选中当前
    │
    ├── 3. updateDisabledStatus → 重新计算禁用状态
    │
    └── 4. 是否所有规格都选中了？
            ├── 是 → 从 pathMap 找到 skuId → emit('change', { skuId, price, ... })
            └── 否 → emit('change', {})
```

**emit 出去的数据**（父组件收到）：

```js
// 所有规格都选中后
emit('change', {
  skuId: 102,
  price: 99,
  oldPrice: 129,
  inventory: 5,
  specsText: '颜色：红色 尺码：M'
})

// 还没全选时
emit('change', {})
```

---

### watchEffect — 响应式监听

```js
watchEffect(() => {
  pathMap = getPathMap(props.goods.skus)
  initDisabledStatus(props.goods.specs, pathMap)
})
```

**作用**：当 `props.goods` 变化时（比如切换了商品），自动重新计算 pathMap 和禁用状态。

---

## 五、完整流程图

```
用户打开商品详情页
    │
    ▼
父组件传入 goods（包含 specs + skus）
    │
    ▼
watchEffect 执行
    ├── getPathMap(skus) → 建立路径字典
    └── initDisabledStatus → 初始化禁用状态
    │
    ▼
页面渲染规格选项
    颜色  [红色] [蓝色] [绿色灰色]
    尺码  [S] [M] [L灰色]
    │
    ▼
用户点击"红色"
    │
    ├── clickSpecs 被调用
    ├── 选中"红色"，清除同组其他选中
    ├── updateDisabledStatus → 重新计算禁用
    │   └── "红色+L" 没库存 → L 变灰
    │
    ├── 还没全选 → emit('change', {})
    │
    ▼
用户点击"M"
    │
    ├── clickSpecs 被调用
    ├── 选中"M"
    ├── 检查：所有规格都选中了？→ 是
    ├── 从 pathMap 找到 skuId = 102
    ├── emit('change', { skuId: 102, price: 99, ... })
    │
    ▼
父组件收到数据
    ├── 更新价格显示：¥99
    ├── 更新库存显示：库存 5 件
    └── 更新"加入购物车"按钮状态
```

---

## 六、命名对照表

| 变量/函数 | 含义 | 类比 |
|----------|------|------|
| `goods` | 商品完整数据 | 一本书 |
| `specs` | 规格列表（颜色、尺码） | 书的目录 |
| `skus` | SKU 组合列表 | 书的具体版本（精装/平装） |
| `pathMap` | 路径字典 | 目录索引（查哪个组合有货） |
| `spliter` | 分隔符 `★` | 索引中的分隔符号 |
| `val` | 当前选项（如"红色"） | 目录中的一个条目 |
| `val.selected` | 是否选中 | 用户是否勾选了这个条目 |
| `val.disabled` | 是否禁用 | 这个条目是否可用（有库存） |
| `getPowerSet` | 幂集算法 | 列出所有可能的子集组合 |
| `clickSpecs` | 点击处理 | 用户操作后的响应逻辑 |
| `emit('change')` | 通知父组件 | 告诉外面"用户选了什么" |
