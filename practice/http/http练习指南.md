# http.js 实现练习指南

> 目标：不看参考答案，自己补全 `src/utils/http.js` 中的 2 个 TODO，最终实现 **axios 请求/响应拦截器**。
>
> **本练习核心知识点：axios 拦截器、token 注入、401 错误处理、ElMessage 全局提示。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/utils/http.js` —— 2 个 TODO 待补全 |
| 参考答案 | `src/utils/http.full.js` |
| 是否影响项目 | 挖空版**可以正常编译运行**，但所有请求都不会带 token，401 也不会跳登录页 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 25~30 分钟 |

> ⚠️ **重要**：这个文件是整个项目的网络层核心，所有 API 请求都通过它发出。理解拦截器是理解"为什么每个请求都带 token"的关键。

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，打开浏览器控制台，观察网络请求。

问自己：
- 什么是请求拦截器？（请求发出前自动执行的函数）
- 什么是响应拦截器？（响应返回后自动执行的函数）
- `config.headers.Authorization` 是什么？（HTTP 请求头，用于身份验证）

**验证**：能说出"拦截器可以在每个请求/响应上统一处理逻辑，不需要每个 API 调用都写一遍"就算过关。

---

### 步骤 1（TODO ①）：请求拦截器 — token 注入

**做什么**：在请求发出前，从 Pinia 获取 token 并拼接到请求头。

**提示**：
1. `const userStore = useUserStore()` —— 获取 store 实例
2. `const token = userStore.userInfo.token` —— 取出 token
3. `if (token) { config.headers.Authorization = \`Bearer ${token}\` }` —— 拼到请求头
4. 必须 `return config`

**验证**：🎯 **登录后打开控制台 Network，找到任意 API 请求，查看请求头中有 `Authorization: Bearer xxx`**。

---

### 步骤 2（TODO ②）：响应拦截器 — 错误处理

**做什么**：统一错误提示 + 401 token 失效处理。

**提示**：
1. `ElMessage({ type: 'warning', message: e.response.data.message })` —— 显示错误提示
2. `if (e.response.status === 401)` —— 判断是否 token 失效
3. 如果 401：`userStore.clearUserInfo()` + `router.push('/login')`
4. 必须 `return Promise.reject(e)`

**验证**：🎯 **token 过期后，自动跳转到登录页，并显示错误提示**。

---

## 三、练完后怎么办

- **删除参考答案**：`http.full.js` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/utils/http.js` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] 请求拦截器正确获取 token
- [ ] 请求头中有 `Authorization: Bearer xxx`
- [ ] 响应拦截器正确显示错误提示
- [ ] 401 时自动清除用户信息并跳转登录页
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **axios 拦截器 + token 鉴权** 核心技能！
