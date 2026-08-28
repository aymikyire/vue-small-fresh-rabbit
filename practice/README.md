# 练习总览

> 基于《vue-review-5days.md》复习指南生成的 9 个挖空练习，按难度递增排列。

---

## 推荐学习顺序

```
① HomePanel.vue（入门）
  → props + 插槽
  → 完成后掌握组件通信基础
  ↓
①.5 XtxSku/index.vue（进阶）
  → emits 子传父 + Options API 对比
  → 完成后掌握组件通信全貌
  ↓
② directives/index.js（入门）
  → 自定义指令 + useIntersectionObserver
  → 完成后掌握指令扩展机制
  ↓
③ useCountDown.js（入门）
  → composable 模式 + 生命周期清理
  → 完成后掌握逻辑复用
  ↓
③.5 ImageView/index.vue（中级）
  → watch 监听器 + 模板 ref + 动态样式
  → 完成后掌握响应式监听
  ↓
④ cartStore.js（中级）
  → Pinia setup 写法 + persist 持久化
  → 完成后掌握状态管理全貌
  ↓
④.5 router/index.js（入门）
  → 嵌套路由配置 + scrollBehavior
  → 完成后掌握路由体系
  ↓
⑤ http.js（中级）
  → axios 拦截器 + token 注入
  → 完成后掌握网络层架构
  ↓
⑥ Login/index.vue（进阶）
  → 表单验证 + 路由跳转
  → 完成后掌握表单核心用法
```

---

## 练习列表

| # | 文件 | 难度 | 知识点 | TODO 数量 | 预估时长 | 入口 |
|---|------|------|--------|-----------|---------|------|
| ① | HomePanel.vue | ⭐ | props + 插槽 | 1 | 15min | [练习指南](HomePanel/HomePanel练习指南.md) |
| ①.5 | XtxSku/index.vue | ⭐⭐ | emits + Options API | 1 | 35min | [练习指南](XtxSku/XtxSku练习指南.md) |
| ② | directives/index.js | ⭐⭐ | 自定义指令 + 懒加载 | 1 | 20min | [练习指南](directives/directives练习指南.md) |
| ③ | useCountDown.js | ⭐⭐ | composable + 生命周期 | 3 | 20min | [练习指南](useCountDown/useCountDown练习指南.md) |
| ③.5 | ImageView/index.vue | ⭐⭐⭐ | watch + 模板ref + 动态样式 | 1 | 30min | [练习指南](ImageView/ImageView练习指南.md) |
| ④ | cartStore.js | ⭐⭐⭐ | Pinia setup + persist | 2 | 40min | [练习指南](cartStore/cartStore练习指南.md) |
| ④.5 | router/index.js | ⭐⭐ | 嵌套路由 + scrollBehavior | 2 | 15min | [练习指南](router/router练习指南.md) |
| ⑤ | http.js | ⭐⭐⭐ | axios 拦截器 + token | 2 | 30min | [练习指南](http/http练习指南.md) |
| ⑥ | Login/index.vue | ⭐⭐⭐⭐ | 表单验证 + 路由跳转 | 2 | 50min | [练习指南](Login/Login练习指南.md) |

---

## 文件说明

每个练习包含 3 个文件：

| 文件 | 说明 |
|------|------|
| `src/xxx.vue`（或 `.js`） | **挖空版**——保留结构，核心逻辑用 TODO 替代，可正常运行 |
| `src/xxx.full.vue`（或 `.full.js`） | **完整版**——原始代码，练习完成后对照 |
| `practice/xxx/xxx练习指南.md` | **练习指南**——分步说明 + 验证方法 + 自测清单 |

---

## 总预估时长

| 项目 | 时间 |
|------|------|
| 全部 9 个练习 | 约 3.5 小时 |
| 每天平均 | 约 40 分钟 |
| 配合复习指南 | 5 天完成全部复习 + 练习 |
