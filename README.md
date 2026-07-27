# 小兔鲜电商项目 — Vue Rabbit

> 基于 Vue 3 生态构建的现代化 B2C 电商前端应用，涵盖商品浏览、购物车管理、订单结算等核心电商链路。

## 技术栈

| 类别 | 技术选型 | 说明 |
|------|---------|------|
| 框架 | Vue 3 (Composition API + `<script setup>`) | 渐进式前端框架 |
| 构建工具 | Vite 8 | 极速 HMR 开发体验 |
| 状态管理 | Pinia 3 | 类型安全的状态管理，集成持久化插件 |
| 路由 | Vue Router 5 | Hash-free 的 History 模式路由 |
| UI 组件库 | Element Plus 2.14 | 企业级桌面端组件库 |
| CSS 预处理器 | SCSS (Dart Sass) | 模块化样式方案 |
| HTTP 客户端 | Axios | 请求/响应拦截器封装 |
| 代码规范 | ESLint + Oxlint | 双引擎代码检查 |

**依赖概览：** `vue@^3.5`、`vue-router@^5.1`、`pinia@^3.0`、`element-plus@^2.14`、`axios@^1.18`、`sass@^1.101`、`pinia-plugin-persistedstate@^4.7`

## 功能模块

### 首页 `/`
- 轮播 Banner 展示
- 商品分类导航
- 新品推荐 & 热门推荐
- 懒加载图片优化

### 分类浏览
- **一级分类** `/category/:id` — 分类商品概览
- **二级分类** `/category/sub/:id` — 带筛选条件的商品列表
- 面包屑导航与路由联动

### 商品详情 `/detail/:id`
- 商品信息展示（图片、价格、规格）
- SKU 规格选择组件
- 商品收藏与加入购物车

### 购物车 `/carList`
- **双端购物车**：未登录时存储在本地（Pinia Persisted），登录后同步至服务端
- 单选框、全选/取消全选
- 购物车商品数量编辑与删除
- 选中商品数量与价格汇总

### 订单结算 `/checkout`
- 收货地址管理与切换
- 商品清单核对
- 配送方式与支付方式选择
- 金额明细汇总

### 用户模块 `/login`
- 账号密码登录
- 登录后自动合并本地购物车至服务端
- Token 过期自动跳转登录页

## 项目结构

```
src/
├── apis/                  # API 接口层
│   ├── cart.js            # 购物车相关接口
│   ├── category.js        # 分类相关接口
│   ├── checkout.js        # 结算相关接口
│   ├── detail.js          # 商品详情接口
│   ├── home.js            # 首页数据接口
│   ├── layout.js          # 布局数据接口
│   └── user.js            # 用户认证接口
├── components/            # 全局通用组件
│   ├── ImageView/         # 图片预览组件
│   ├── XtxSku/            # SKU 规格选择组件
│   └── index.js           # 全局组件注册插件
├── directives/            # 自定义指令
│   └── index.js           # 图片懒加载指令
├── router/
│   └── index.js           # 路由配置（History 模式）
├── stores/                # Pinia 状态管理
│   ├── cartStore.js       # 购物车状态（持久化）
│   ├── categoryStore.js   # 分类数据状态
│   ├── counterStore.js    # 计数器（DEMO）
│   ├── layoutStore.js     # 布局状态
│   └── userStore.js       # 用户状态（持久化）
├── styles/
│   ├── common.scss        # 全局样式 & 图片占位
│   ├── var.scss           # SCSS 变量定义
│   └── element/           # Element Plus 主题覆盖
├── utils/
│   └── http.js            # Axios 实例封装（请求/响应拦截器）
├── views/
│   ├── Layout/            # 布局框架（顶栏/导航/底栏）
│   ├── Home/              # 首页
│   ├── Category/          # 一级分类
│   ├── SubCategory/       # 二级分类
│   ├── Detail/            # 商品详情
│   ├── CartList/          # 购物车列表
│   ├── Checkout/          # 订单结算
│   └── Login/             # 用户登录
├── App.vue                # 根组件（一级路由出口）
└── main.js                # 应用入口
```

## 快速开始

### 环境要求

- **Node.js** `^22.18.0 || >=24.12.0`
- **npm** `>=10`

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

### 后端 API

项目对接黑马程序员小兔鲜 API 网关：
- **Base URL:** `https://pcapi-xiaotuxian-front-devtest.itheima.net`
- 接口鉴权采用 Bearer Token（自动从 Pinia 的 userStore 获取并注入请求头）

## 核心设计

### 购物车双端同步策略

购物车支持 **未登录（本地缓存）** 与 **已登录（服务端同步）** 两种模式：

```
未登录: localStorage (pinia-plugin-persistedstate) → 本地增删改查
     ↓ 登录时自动合并
已登录: 服务端购物车 API → 实时同步
     ↓ 退出登录
清除本地购物车数据
```

### 状态持久化

用户信息与购物车数据通过 `pinia-plugin-persistedstate` 自动持久化至 `localStorage`，刷新页面不丢失登录状态与购物车数据。

### 请求拦截

- **请求拦截器：** 自动附加 `Authorization` 请求头
- **响应拦截器：** 统一错误提示，401 自动清除用户信息并跳转登录页

## License

Private — 仅供学习交流使用。
