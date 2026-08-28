# router/index.js 实现练习指南

> 目标：不看参考答案，自己补全 `src/router/index.js` 中的 2 个 TODO，最终实现 **嵌套路由配置 + scrollBehavior**。
>
> **本练习核心知识点：嵌套路由、动态路由参数（:id）、children、scrollBehavior。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/router/index.js` —— 2 个 TODO 待补全 |
| 参考答案 | `src/router/index.full.js` |
| 是否影响项目 | 挖空版**可以正常编译运行**，但页面路由会全部失效（只有首页能显示） |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 15 分钟 |

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，观察现在的页面（因为路由是空的，可能只有 Layout 的导航栏能显示）。

问自己：
- `createRouter` 和 `createWebHistory` 分别做什么？
- `children` 是什么？（嵌套路由，子路由渲染在父组件的 `<RouterView />` 中）
- `:id` 是什么？（动态路由参数，如 `/category/1005000` 中的 `1005000`）

**验证**：能说出"嵌套路由的关键是父路由有 children，子路由渲染在父组件的 RouterView 中"就算过关。

---

### 步骤 1（TODO ①）：配置路由表

**做什么**：配置完整的路由表。

**提示**：
1. 根路径 `'/'` 使用 Layout 组件，children 中配置所有子路由
2. `''` → Home（默认子路由，路径为空）
3. `'category/:id'` → Category（动态参数）
4. `'detail/:id'` → Detail
5. `'Member'` 下再嵌套 children：`''` → UserInfo，`'order'` → UserOrder
6. 单独配置 `'/login'` → Login（在布局外）

**验证**：🎯 **点击导航栏的各个链接，页面能正确切换**。

---

### 步骤 2（TODO ②）：实现 scrollBehavior

**做什么**：路由切换后自动回到顶部。

**提示**：`return { top: 0 }`

**验证**：🎯 **滚动到页面底部，点击导航链接，页面自动回到顶部**。

---

## 三、练完后怎么办

- **删除参考答案**：`index.full.js` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/router/index.js` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] 路由表正确配置了所有页面
- [ ] 嵌套路由（Layout children、Member children）正确
- [ ] 动态路由参数（:id）能正常获取
- [ ] scrollBehavior 生效（切换路由回顶部）
- [ ] 所有页面链接可正常跳转
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **路由配置 + 嵌套路由** 核心技能！
