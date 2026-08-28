# 小兔鲜项目 · Vue 复习指南

> 5 天快速回顾 Vue + 前端实战中的高频技术点
>
> **使用方式**：每天按顺序，先读知识点讲解，再对照项目源码理解，最后动手默写关键代码

---

## 📅 总览：五天安排

```
Day 1 ── 组件通信 + 响应式基础 ─────────────── 3.5~4h（最重要，打地基）
Day 2 ── 自定义指令 + composables + 生命周期 ── 2.5~3h
Day 3 ── Pinia + 购物车全流程 ────────────────── 3~3.5h
Day 4 ── 路由 + 表单 + Element Plus ─────────── 3.5~4h
Day 5 ── 网络层 + SCSS + 面试串讲 ──────────── 2~2.5h
```

**核心文件路线图（12 个重点文件）**：

```
Day 1 (6个)                 Day 2 (4个)               Day 3 (2个)
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ HomePanel.vue   │     │ directives/      │     │ stores/          │
│ (props+slot)    │     │ index.js         │     │ cartStore.js     │
│                 │     │ (v-img-lazy)     │     │ (Pinia+persist)  │
│ GoodsItem.vue   │     │                  │     │                  │
│ (defineProps)   │     │ composables/     │     │ apis/            │
│                 │     │ useCountDown.js  │     │ cart.js          │
│ ImageView/      │     │                  │     │ (axios接口)      │
│ index.vue       │     │ views/Home/      │     │                  │
│ (watch+模板ref) │     │ components/      │     └──────────────────┘
│                 │     │ HomeHot.vue      │
│ XtxSku/         │     │ (v-img-lazy用)   │
│ index.vue       │     │                  │
│ (Options API    │     │ views/Detail/    │
│  +emits)        │     │ components/      │
│                 │     │ DetailHot.vue    │
│ LayoutNav.vue   │     │ (computed)       │
│ (v-if/v-else)   │     └──────────────────┘
└─────────────────┘

Day 4 (4个)                Day 5 (核心)
┌──────────────────┐     ┌──────────────────┐
│ router/index.js  │     │ utils/http.js    │
│ (路由配置)       │     │ (axios拦截器)    │
│                  │     │                  │
│ views/Login/     │     │ vite.config.js   │
│ index.vue        │     │ (SCSS变量共享)   │
│ (el-form验证)    │     │                  │
│                  │     │ styles/var.scss  │
│ views/Category/  │     │ (全局变量)       │
│ index.vue        │     └──────────────────┘
│ (面包屑+路由)    │
│                  │
│ views/SubCategory│
│ index.vue        │
│ (tabs+infinite)  │
└──────────────────┘
```

---

## Day 1 · 组件通信 + 响应式基础

> 目标：掌握 Vue 组件间数据流动的所有方式

### 知识点一：`ref` 响应式变量

**是什么**：把普通值变成响应式，模板和代码都能感知变化并自动更新视图

**项目用法**：几乎所有组件都用

```js
// views/Detail/index.vue
const count = ref(1)           // 数字
const goods = ref({})          // 对象
const skuInfo = ref(null)      // 可能为 null

// 修改时必须 .value
count.value++                  // 数字修改
goods.value = res.result       // 对象替换
```

**要点**：
- `<template>` 里用 `count`（不写 .value）
- `<script>` 里用 `count.value`（必须写）
- 数字/字符串用 `ref`，对象/数组也用 `ref`（不要纠结 reactive）

---

### 知识点二：`computed` 计算属性

**是什么**：基于已有响应式数据派生新值，有缓存（依赖不变就不重算）

**项目用法**：购物车的价格/数量计算

```js
// stores/cartStore.js
const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
const isAll = computed(() => cartList.value.every((item) => item.selected))
```

**要点**：
- 返回值就是计算结果，不需要 `.value` 赋值
- 依赖变化时自动重算，依赖不变直接返回缓存
- 适合：总价、全选状态、格式化显示

---

### 知识点三：`watch` 监听器

**是什么**：监听某个响应式数据变化，执行副作用（发请求、操作 DOM 等）

**项目用法**：ImageView 放大镜

```js
// components/ImageView/index.vue
watch(target, () => {
  // target 变化时重新计算位置
})
```

**三种写法速查**：

```js
// 监听单个 ref
watch(count, (newVal, oldVal) => { ... })

// 监听对象的某个属性（用箭头函数返回）
watch(() => route.params.id, (newId) => { ... })

// 监听多个数据
watch([count, name], ([newCount, newName], [oldCount, oldName]) => { ... })
```

---

### 知识点四：`props` 父传子

**是什么**：父组件通过属性传递数据给子组件，子组件用 `defineProps` 接收

**项目用法**：HomePanel 接收标题，GoodsItem 接收商品数据

```js
// views/Home/components/HomePanel.vue（60行，最简洁的 props 示例）
defineProps({
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' }
})
```

```js
// views/Home/components/GoodsItem.vue
defineProps({
  goods: { type: Object, default: () => ({}) }
})
```

**父组件传值**：
```vue
<HomePanel title="热门推荐" subTitle="热门商品" />
<GoodsItem v-for="item in list" :goods="item" :key="item.id" />
```

---

### 知识点五：`emits` 子传父

**是什么**：子组件触发事件，父组件监听并处理

**项目用法**：XtxSku 选中规格后通知父组件

```js
// components/XtxSku/index.vue（唯一使用 Options API 的文件）
const emit = defineEmits(['change'])
// 当用户选中某个 SKU 时
emit('change', { skuId, price, ... })
```

```vue
<!-- 父组件 Detail/index.vue -->
<XtxSku @change="onSkuChange" />
```

---

### 知识点六：插槽 `slot`

**是什么**：父组件向子组件的指定位置"塞入"内容，实现灵活的组件复用

| 类型 | 子组件写法 | 父组件写法 | 项目示例 |
|------|-----------|-----------|---------|
| 默认插槽 | `<slot />` | 直接放内容 | HomePanel.vue |
| 命名插槽 | `<slot name="xxx" />` | `<template #xxx>` | el-popconfirm / el-dialog |

**项目用法 1 — 默认插槽**（HomePanel）：

```vue
<!-- 子组件：HomePanel.vue -->
<div class="home-panel">
  <h4>{{ title }}</h4>
  <slot />   <!-- 父组件的内容会被插入到这里 -->
</div>

<!-- 父组件：HomeHot.vue -->
<HomePanel title="热门推荐" subTitle="24小时热榜">
  <div v-for="item in list">...</div>   <!-- 这段插入 slot 位置 -->
</HomePanel>
```

**项目用法 2 — 命名插槽**（el-popconfirm 触发按钮）：

```vue
<!-- CartList/index.vue -->
<el-popconfirm title="确认删除吗?" @confirm="delCart(i)">
  <template #reference>        <!-- #reference = v-slot:reference -->
    <a href="javascript:;">删除</a>   <!-- 这个元素触发弹窗 -->
  </template>
</el-popconfirm>

<!-- Checkout/index.vue 对话框底部按钮 -->
<el-dialog v-model="showDialog">
  ...内容...
  <template #footer>           <!-- #footer = v-slot:footer -->
    <el-button @click="submitAddr">确定</el-button>
  </template>
</el-dialog>
```

---

### 知识点七：全局组件注册

**是什么**：通过插件模式一次性注册全局组件，所有页面直接用标签名使用，无需 import

**项目用法**：

```js
// components/index.js
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app) {
    app.component('XtuImageView', ImageView)   // 全名注册
    app.component('XtuSku', Sku)
  }
}
```

```js
// main.js 中使用
app.use(componentPlugin)
```

```vue
<!-- 任意页面直接使用，无需 import -->
<XtuImageView :imageList="goods.images" />
<XtuSku @change="onSkuChange" />
```

---

### Day 1 流程图

```
父组件传数据给子组件
    │
    ├── 静态/单向数据流 → props（HomePanel、GoodsItem）
    │
    ├── 子组件通知父组件 → emits（XtxSku @change）
    │
    └── 父组件向子组件指定位置塞内容 → slot（HomePanel、el-dialog #footer）
```

---

## Day 2 · 自定义指令 + composables + 生命周期

> 目标：掌握 Vue 3 的扩展机制——指令和组合式函数

### 知识点一：自定义指令 `v-img-lazy`

**是什么**：自定义 HTML 属性，在元素挂载/更新时执行自定义逻辑

**项目用法**：图片懒加载（26行，非常经典）

```js
// directives/index.js
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    app.directive('img-lazy', {
      // el：指令绑定的 DOM 元素（img）
      // binding.value：指令等号后面的值（图片 URL）
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.src = binding.value   // 进入视口才加载图片
              stop()                   // 加载后停止观察，释放资源
            }
          }
        )
      }
    })
  }
}
```

**使用**（HomeHot.vue 等）：
```vue
<img v-img-lazy="item.picture" alt="" />
<!-- binding.value === item.picture -->
```

**指令生命周期钩子**（和组件类似）：

```
created  → 元素创建时（Vue 3）
mounted  → 元素插入 DOM 后（最常用）
updated  → 父组件更新后
unmounted → 元素移除后
```

---

### 知识点二：composables 组合式函数

**是什么**：把可复用的逻辑抽取成独立函数，命名约定 `useXxx`

**为什么用**：同一段逻辑（倒计时、请求 banner 数据）要在多个组件用时抽取

**项目用法 1 — 倒计时**（27行，非常干净）：

```js
// composables/useCountDown.js
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  let timer = null
  const time = ref(0)

  // 计算属性：格式化为 "xx分xx秒"
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  // 开启倒计时
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => { time.value-- }, 1000)
  }

  // 组件销毁时清除定时器（防止内存泄漏）
  onUnmounted(() => { timer && clearInterval(timer) })

  return { formatTime, start }
}
```

```vue
<!-- views/Pay/index.vue -->
<script setup>
import { useCountDown } from '@/composables/useCountDown'
const { formatTime, start } = useCountDown()   // 解构使用
onMounted(() => { start(60) })
</script>
<template>
  <span>付款剩余时间：{{ formatTime }}</span>
</template>
```

**项目用法 2 — 数据请求**：

```js
// views/Category/composables/useBanner.js
export const useBanner = () => {
  const bannerList = ref([])
  const getBanner = async () => { ... }
  onMounted(() => getBanner())
  return { bannerList }   // 只返回需要的数据
}
```

**composables vs 普通函数的区别**：

| | 普通函数 | composables |
|---|---------|-------------|
| 能用 ref/computed | ❌ | ✅ |
| 能用 onMounted 等生命周期 | ❌ | ✅ |
| 命名约定 | 任意 | `use` 开头 |
| 返回值 | 普通值 | 响应式 ref |

---

### 知识点三：生命周期钩子

**是什么**：组件在不同阶段触发的回调函数，用于执行副作用

**项目用法**：

```js
onMounted(() => {     // 最常用：组件挂载后（发请求、操作 DOM）
  getOrderList()
  getCategory()
})

onUnmounted(() => {   // 组件销毁前（清理定时器、取消监听）
  timer && clearInterval(timer)
})
```

**在 composables 里用生命周期**（Vue 3 的优势）：

```js
// useCountDown.js 内部
export const useCountDown = () => {
  let timer = null
  const time = ref(0)

  // 生命周期钩子可以在任何函数内使用，不限于 setup 顶层
  onUnmounted(() => { timer && clearInterval(timer) })

  return { time, start }
}
```

---

### 知识点四：`@vueuse/core` 工具库

**是什么**：基于 Vue 3 Composition API 的工具函数集合，解决常见 DOM/浏览器操作

**项目用到 3 个**：

```js
// 1. useScroll — 获取滚动位置（吸顶导航用）
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)
// y 就是当前滚动距离，响应式的

// 2. useIntersectionObserver — 元素可见性检测（懒加载用）
import { useIntersectionObserver } from '@vueuse/core'
const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => { ... })

// 3. useMouseInElement — 鼠标在元素内的位置（放大镜用）
import { useMouseInElement } from '@vueuse/core'
const { elementX, elementY, elementWidth, elementHeight } = useMouseInElement(target)
```

---

### 知识点五：`v-infinite-scroll` 无限滚动

**是什么**：当用户滚动到底部时自动触发加载更多

**项目用法**：

```vue
<!-- views/SubCategory/index.vue -->
<div v-infinite-scroll="load"
     :infinite-scroll-disabled="disabled">
  <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
</div>
```

**要点**：这是 Element Plus 提供的指令，不是自定义指令。disabled 控制是否继续加载。

---

### Day 2 流程图

```
自定义指令                    composables
    │                           │
    ├─mounted 中操作 DOM        ├─返回 ref/computed（响应式）
    ├─binding.value 取值        ├─内部可用 onMounted/onUnmounted
    ├─用 @vueuse/core 辅助      ├─命名 useXxx
    └─用完 stop() 释放资源      └─在组件 setup 中解构使用

两者的区别：
  指令 → 给"元素"加行为（v-img-lazy、v-infinite-scroll）
  composable → 给"逻辑"加复用（useCountDown、useBanner）
```

---

## Day 3 · Pinia + 购物车全流程

> 目标：掌握状态管理 + 本地/远程购物车的完整链路

### 知识点一：Pinia setup 写法

**是什么**：Vue 3 推荐的 Pinia 写法，和 `<script setup>` 语法一致，更直觉

**项目用法**（cartStore.js，104 行）：

```js
// stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  // ====== state ======
  const cartList = ref([])

  // ====== getters（用 computed 替代）======
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // ====== actions（用普通函数替代）======
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const item = cartList.value.find(item => goods.skuId === item.skuId)
    if (item) {
      item.count += goods.count   // 已有就数量加
    } else {
      cartList.value.push({ ...goods, selected: true })  // 没有就新增
    }
  }

  // ====== 暴露给组件 ======
  return { cartList, allCount, allPrice, updateNewList, addCart }
}, {
  persist: true   // ← 开启本地持久化
})
```

**Pinia setup 写法 vs Options 写法对比**：

| | setup 写法（本项目用的） | Options 写法 |
|---|---------|---------|
| state | `ref()` | `state: { }` |
| getters | `computed()` | `getters: { }` |
| actions | 普通函数 | `actions: { }` |
| 语法风格 | 和 `<script setup>` 一致 | 和 Vue 2 Options API 一致 |
| 推荐度 | ✅ Vue 3 首选 | 兼容 Vue 2 迁移场景 |

---

### 知识点二：`pinia-plugin-persistedstate` 持久化

**是什么**：Pinia 插件，自动把 store 数据存到 localStorage，刷新页面后自动恢复

**项目用法**：

```js
// stores/cartStore.js 末尾
}, {
  persist: true   // 加这行即可
})

// stores/userStore.js 也用了
}, {
  persist: true   // 登录信息也持久化
})
```

**原理**：

```
页面刷新前                    页面刷新后
cartList: [商品1, 商品2]  →  localStorage  →  cartList: [商品1, 商品2]
         ↓                              ↓
    persist 插件自动存入          Pinia 初始化时自动读取
```

**要点**：
- 不需要手动 `localStorage.setItem`
- 默认存到 `localStorage`，key 是 store 的 id（如 `cart`）
- 需要安装：`npm install pinia-plugin-persistedstate`

---

### 知识点三：本地购物车 → 远程购物车的完整链路

**场景**：用户未登录时加购物车，登录后需要把本地数据同步到服务器

```
【未登录状态】
用户点"加入购物车"
      ↓
cartStore.addCart(goods)    ← 加入本地 store（自动 persist 到 localStorage）
      ↓
页面显示购物车（直接从 store 读取）
      ↓

【登录时】
userStore.getUserInfo()
      ↓
mergeCartAPI(cartStore.cartList)   ← 把本地购物车批量发给后端
      ↓
cartStore.updateNewList()          ← 从后端拉最新购物车列表
      ↓
【远程购物车】此后所有操作都走后端 API
用户点"加入购物车" → insertCartAPI({ skuId, count })
用户点"删除"      → delCartAPI([ids])
购物车列表        → findNewCartListAPI()
```

**代码对应**：

```js
// userStore.js — 登录时合并
const getUserInfo = async ({ account, password }) => {
  const res = await loginAPI({ account, password })
  userStore.userInfo.value = res.result
  // 登录后合并本地购物车到后端
  await mergeCartAPI(cartStore.cartList.map(item => ({
    skuId: item.skuId,
    count: item.count,
    selected: item.selected
  })))
  cartStore.updateNewList()   // 合并后重新拉取
}
```

---

### 知识点四：购物车 computed 派生计算

**是什么**：购物车里的"全选"、"总价"、"总数量"都是从 `cartList` 实时计算的

```js
// stores/cartStore.js

// 总数量
const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))

// 总价格
const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

// 选中数量
const selectedCount = computed(() =>
  cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0)
)

// 选中价格
const selectedPrice = computed(() =>
  cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0)
)

// 是否全选
const isAll = computed(() => cartList.value.every((item) => item.selected))

// 切换全选
const checkAllCart = (selected) => {
  cartList.value.forEach(item => (item.selected = selected))
}
```

**要点**：`reduce` 是购物车计算的核心方法，用法固定：
```js
数组.reduce((累加器, 当前项) => 累加器 + 当前项.属性, 0)
```

---

### Day 3 流程图

```
Pinia store 架构
    │
    ├── state:   ref()          ← 原始数据（cartList）
    ├── getters: computed()     ← 派生数据（allCount/allPrice/isAll）
    └── actions: 普通函数       ← 操作数据（addCart/delCart/updateNewList）
          │
          ├── 调用 API（apis/cart.js）
          └── 更新 state（ref.value = ...）

持久化
    cartStore (persist: true)  ──→ localStorage ──→ 页面刷新自动恢复

购物车完整链路
    本地 (addCart)  ──登录──→  远程 (mergeCartAPI)  ──→ 后续全走 API
```

---

## Day 4 · 路由 + 表单 + Element Plus

> 目标：掌握路由配置、表单验证、Element Plus 组件的典型用法

### 知识点一：路由配置（嵌套路由）

**项目用法**：

```js
// router/index.js
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,         // 主布局（包含导航栏、底部）
      children: [                 // ← 一级嵌套
        { path: '', component: Home },
        { path: 'category/:id', component: Category },        // :id 是动态路由参数
        { path: 'category/sub/:id', component: SubCategory },
        { path: 'detail/:id', component: Detail },
        { path: 'carList', component: CarList },
        { path: 'checkout', component: Checkout },
        { path: 'pay', component: Pay },
        {
          path: 'Member',
          component: Member,
          children: [             // ← 二级嵌套
            { path: '', component: UserInfo },
            { path: 'order', component: UserOrder }
          ]
        }
      ]
    },
    { path: '/login', component: Login }   // 登录页在布局外
  ],
  scrollBehavior() { return { top: 0 } }  // 切换路由自动回顶部
})
```

**要点**：
- `category/:id` 中的 `:id` 是动态路由参数
- 嵌套路由在父组件里用 `<RouterView />` 渲染子路由
- `scrollBehavior` 解决"点击导航，页面还停在原来位置"的问题

---

### 知识点二：`useRoute` + `useRouter`

**是什么**：`useRoute` 读取当前路由信息，`useRouter` 进行路由跳转

```js
// useRoute — 读取信息
import { useRoute } from 'vue-router'
const route = useRoute()

route.params.id              // 获取动态路由参数（如商品ID）
route.query.search           // 获取查询参数（如 ?search=xxx）
route.fullPath               // 完整路径

// useRouter — 操作路由
import { useRouter } from 'vue-router'
const router = useRouter()

router.push('/')             // 跳转首页
router.push('/detail/' + id) // 跳转商品详情
router.push({ path: '/login', query: { redirect: route.fullPath } })  // 携带参数跳转
```

**项目中的典型用法**：

```js
// Detail/index.vue — 获取商品ID
const route = useRoute()
const goods = ref({})
onMounted(async () => {
  const res = await getDetail(route.params.id)
  goods.value = res.result
})

// Login/index.vue — 登录成功跳转
const router = useRouter()
const login = async () => {
  await userStore.getUserInfo({ account, password })
  router.push('/')   // 跳转首页
}
```

---

### 知识点三：`el-form` 表单验证

**是什么**：Element Plus 的表单组件，配合 `rules` 定义验证规则，`formRef.validate()` 触发校验

**项目用法**（Login/index.vue，核心代码）：

```vue
<template>
  <!-- 1. 绑定 model、rules、ref -->
  <el-form ref="formRef" :model="form" :rules="rules">
    <el-form-item prop="account" label="账户">
      <el-input v-model="form.account" />
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input v-model="form.password" />
    </el-form-item>
    <el-form-item prop="agree">
      <el-checkbox v-model="form.agree" />
    </el-form-item>
  </el-form>
</template>

<script setup>
const formRef = ref(null)

// 2. 定义表单数据
const form = ref({ account: '', password: '', agree: false })

// 3. 定义验证规则
const rules = {
  account: [
    { required: true, message: '请输入账户', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度6-14位', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) { callback() } else { callback(new Error('请勾选协议')) }
      }
    }
  ]
}

// 4. 触发验证
const login = async () => {
  await formRef.value.validate()    // 验证通过才继续
  // ... 发请求
}
</script>
```

**规则写法速查**：

| 属性 | 作用 | 示例 |
|------|------|------|
| `required` | 必填 | `{ required: true, message: '必填' }` |
| `min` / `max` | 长度限制 | `{ min: 6, max: 14 }` |
| `trigger` | 触发时机 | `'blur'` 失焦 / `'change'` 输入时 |
| `validator` | 自定义验证函数 | `(rule, value, callback) => { ... }` |

---

### 知识点四：Element Plus 组件用法速查

#### el-tabs + v-model（tab 切换驱动数据）

```vue
<!-- views/SubCategory/index.vue -->
<el-tabs v-model="reqData.sortField" @tab-change="tabChange">
  <el-tab-pane label="最新商品" name="publishTime" />   <!-- name 要和 v-model 绑定的值匹配 -->
  <el-tab-pane label="最高人气" name="orderNum" />
</el-tabs>

<script setup>
const reqData = ref({ sortField: 'publishTime' })   // 默认选中"最新商品"
const tabChange = () => {
  // reqData.sortField 已经自动变化，直接发请求
  getSubList()
}
</script>
```

#### el-dialog + v-model + #footer（弹窗控制）

```vue
<!-- views/Checkout/index.vue -->
<el-dialog v-model="showDialog" title="切换收货地址" width="30%">
  ...内容...
  <template #footer>
    <el-button @click="submitAddr">确定</el-button>
    <el-button @click="showDialog = false">取消</el-button>
  </template>
</el-dialog>

<script setup>
const showDialog = ref(false)
// 打开：showDialog.value = true
// 关闭：showDialog.value = false
</script>
```

#### el-carousel（轮播图）

```vue
<!-- views/Home/components/HomeBanner.vue -->
<el-carousel height="500px">
  <el-carousel-item v-for="item in bannerList" :key="item.id">
    <img :src="item.imgUrl">
  </el-carousel-item>
</el-carousel>
<!-- 高度必须指定，否则不显示 -->
```

#### el-message（全局消息提示）

```js
// utils/http.js（在拦截器中使用）
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'   // 必须手动引入样式

ElMessage({ type: 'warning', message: e.response.data.message })
ElMessage.success('操作成功')
```

---

### Day 4 流程图

```
路由体系
    │
    ├── 配置：createRouter + routes + children（嵌套）
    ├── 读取：useRoute().params / .query
    ├── 跳转：useRouter().push()
    └── 滚动：scrollBehavior

表单验证流程
    │
    ├── 绑定：el-form :model="form" :rules="rules"
    ├── 触发：formRef.value.validate()
    └── 通过 → 执行业务逻辑
        失败 → 自动显示错误提示

Element Plus 常见模式
    ├── 数据驱动选中：el-tabs v-model + @tab-change
    ├── 弹窗控制：el-dialog v-model = boolean
    ├── 二次确认：el-popconfirm + #reference 插槽
    └── 全局提示：ElMessage（注意要引入样式）
```

---

## Day 5 · 网络层 + SCSS + 面试串讲

> 目标：理解请求拦截器、样式共享机制，梳理高频面试题

### 知识点一：axios 请求/响应拦截器

**是什么**：在每个请求发出前 / 每个响应返回后，自动执行统一处理

**项目用法**（utils/http.js，44 行，标准写法）：

```js
// 1. 创建实例，设置基础配置
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xxx.itheima.net',
  timeout: 10000
})

// 2. 请求拦截器 —— 每个请求发出前执行
httpInstance.interceptors.request.use(config => {
  // 从 Pinia 获取 token
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 拼接到请求头
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config   // 必须 return
}, e => Promise.reject(e))

// 3. 响应拦截器 —— 每个响应返回后执行
httpInstance.interceptors.response.use(
  res => res.data,     // 成功：直接返回 res.data（剥掉 axios 包装层）
  e => {
    // 统一错误提示
    ElMessage({ type: 'warning', message: e.response.data.message })

    // 401 token 失效：清除用户信息 + 跳登录页
    if (e.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)
  }
)

export default httpInstance
```

**流程图**：

```
发送请求
    │
    ↓
请求拦截器
    ├── 从 Pinia 取 token
    ├── 拼到 Authorization 请求头
    └── return config
    │
    ↓
axios 发出 HTTP 请求
    │
    ↓
响应拦截器
    ├── 成功：return res.data（剥一层）
    │       └── 组件里拿到的就是 data 层（res.result）
    │
    └── 失败
        ├── 非401：ElMessage 提示错误
        └── 401：清除 token → 跳登录页
```

---

### 知识点二：SCSS 全局变量共享

**是什么**：在 vite.config.js 中配置，让所有 `.vue` 文件的 `<style>` 都能直接用这些变量，不需要 import

**配置**（vite.config.js）：

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @use "@/styles/var.scss" as *;
        @use "@/styles/element/index.scss" as *;
      `
    }
  }
}
```

**变量定义**（styles/var.scss）：

```scss
$xtxColor: #27ba9b;     // 主色（绿色）
$helpColor: #e26237;    // 辅助色（橙红）
$sucColor: #1dc779;     // 成功色
$warnColor: #ffb302;    // 警告色
$priceColor: #cf4444;   // 价格色（红色）
```

**使用**：任何组件的 `<style scoped lang="scss">` 中直接用：

```scss
/* 不需要 @import，直接用 */
.green { color: $xtxColor; }
.price { color: $priceColor; }
```

---

### 知识点三：高频面试题速查

#### Q1：`v-if` vs `v-show`

| | v-if | v-show |
|---|------|--------|
| 原理 | 真正创建/销毁 DOM 元素 | CSS `display: none` 切换 |
| 初始渲染 | 条件为 false 不渲染 | 无论如何都渲染 |
| 性能 | 切换开销大（要重建 DOM） | 初始渲染开销大 |
| 适用场景 | **很少切换**的条件（如权限控制） | **频繁切换**的条件（如 tab 切换） |
| 项目示例 | LayoutNav 登录/未登录 | ImageView 图片遮罩层 |

#### Q2：`watch` vs `watchEffect`

| | watch | watchEffect |
|---|-------|------------|
| 是否需要指定监听源 | ✅ 必须指定 | ❌ 自动收集依赖 |
| 能否获取旧值 | ✅ 第二个参数 | ❌ 不能 |
| 是否立即执行 | 默认不执行（需加 immediate） | **立即执行一次** |
| 适用场景 | 需要知道新旧值、有选择性监听 | 副作用自动跟踪依赖 |
| 项目示例 | ImageView 监听 target | XtxSku 监听所有 SKU 属性 |

#### Q3：Pinia vs Vuex

| | Pinia | Vuex |
|---|-------|------|
| API 风格 | 简洁，直接 `state.value` | 复杂，`commit('mutation')` |
| 是否需要 mutation | ❌ 不需要，直接改 state | ✅ 必须通过 mutation |
| TypeScript 支持 | ✅ 完美 | 一般 |
| 模块化 | 天然独立，直接创建多个 store | 需要嵌套 module |
| Vue 3 推荐 | ✅ 官方推荐 | 兼容 Vue 2 |

#### Q4：`ref` vs `reactive`

| | ref | reactive |
|---|-----|---------|
| 接收类型 | 任意（数字、字符串、对象） | 仅对象/数组 |
| 访问方式 | `.value`（script）/ 直接用（template） | 直接访问属性 |
| 解构 | ✅ 解构后仍响应式 | ❌ 解构后丢失响应式 |
| 本项目用法 | **全部用 ref**（更推荐） | 未使用 |

#### Q5：composables 为什么命名用 `use`？

- Vue 官方约定：以 `use` 开头表示这是一个 Composition API 函数
- ESLint 插件（eslint-plugin-vue）会识别 `use` 前缀，自动启用规则
- 看到 `useXxx` 就知道：返回响应式数据、内部可调用生命周期钩子

---

### Day 5 流程图

```
请求全链路
    │
    ├─ API层（apis/cart.js）──── 定义接口：url + method + params
    ├─ HTTP层（utils/http.js）── axios 实例 + 拦截器 + token 注入
    └─ 组件层（views）───────── 调用 API，更新 ref，驱动视图

SCSS 变量共享
    var.scss ──→ vite.config additionalData ──→ 所有组件可用 $xtxColor
```

---

## 附录：关键文件行数速查

| 文件 | 行数 | 一句话定位 |
|------|------|-----------|
| `directives/index.js` | 26 | 自定义指令 v-img-lazy，懒加载核心 |
| `composables/useCountDown.js` | 27 | 倒计时 composable，onUnmounted 清理 |
| `HomePanel.vue` | 60 | props + 插槽的最佳教学文件 |
| `GoodsItem.vue` | 59 | defineProps 最简用法 |
| `utils/http.js` | 44 | axios 拦截器标准模板 |
| `apis/cart.js` | 44 | API 封装标准模板 |
| `styles/var.scss` | 5 | SCSS 全局变量定义 |
| `stores/cartStore.js` | 104 | Pinia setup 写法 + persist |
| `stores/userStore.js` | ~40 | 登录/登出 + 购物车合并 |
| `components/index.js` | 12 | 全局组件注册（插件模式） |
| `router/index.js` | ~80 | 嵌套路由配置完整示例 |
| `HomeBanner.vue` | 43 | el-carousel 轮播图 |
| `Login/index.vue` | 355 | 表单验证三件套 |
| `ImageView/index.vue` | 151 | watch + 模板 ref + 图片放大镜 |
| `XtxSku/index.vue` | 201 | Options API + emits + watchEffect |
| `Detail/index.vue` | 413 | 最大组件，语法最全 |