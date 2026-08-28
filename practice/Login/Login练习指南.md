# Login/index.vue 实现练习指南

> 目标：不看参考答案，自己补全 `src/views/Login/index.vue` 中的 2 个 TODO，最终实现 **表单验证 + 登录逻辑**。
>
> **本练习核心知识点：el-form 验证规则、formRef 模板 ref、v-model 双向绑定、useRouter.push()。**

---

## 一、练习前须知

| 项目 | 说明 |
|------|------|
| 练习文件 | `src/views/Login/index.vue` —— 2 个 TODO 待补全 |
| 参考答案 | `src/views/Login/index.full.vue` |
| 是否影响项目 | 挖空版**可以正常编译运行**，页面能打开，只是表单验证和登录不工作 |
| 运行命令 | `npm run dev` |
| 练习时长参考 | 45~50 分钟 |

> ⚠️ **重要规则**：挖空版的 `rules` 中 account 和 password 是 `undefined`，所以表单验证不会生效（不会提示错误）。补全后才会正常。

---

## 二、分步实现指南

### 步骤 0：准备

**做什么**：`npm run dev` 启动项目，进入登录页，观察表单结构。

问自己：
- `el-form ref="formRef"` 绑定了什么？（模板 ref，用来调用 validate 方法）
- `:model="form"` 绑定了什么？（表单数据对象）
- `:rules="rules"` 绑定了什么？（验证规则对象）
- `el-form-item prop="account"` 中的 `prop` 是什么？（对应 rules 中的 key）

**验证**：能说出"el-form 三件套：model（数据）、rules（规则）、ref（实例）"就算过关。

---

### 步骤 1（TODO ①）：补全验证规则

**做什么**：在 `rules` 对象中，把 `account` 和 `password` 的 `undefined` 替换为验证规则数组。

**提示**：
- 找到 `account: undefined,` 替换为：`account: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],`
- 找到 `password: undefined,` 替换为：
  ```js
  password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 14, message: '密码长度不在6~14个字符内', trigger: 'blur' }
  ],
  ```

**验证**：🎯 **输入框为空时点击登录，看到红色错误提示；输入符合要求后提示消失**。

---

### 步骤 2（TODO ②）：实现登录逻辑

**做什么**：在 `doLogin` 中实现验证 + 登录 + 跳转。

**提示**：
1. `formRef.value.validate(async (valid) => { ... })` —— 触发验证
2. `if (valid)` —— 验证通过才继续
3. `await userStore.getUserInfo({ account, password })` —— 调用登录接口
4. `ElMessage({ type: 'success', message: '登录成功' })` —— 提示
5. `router.replace({ path: '/' })` —— 跳转首页（用 replace 不留历史记录）

**验证**：🎯 **输入正确的账号密码，点击登录，看到"登录成功"提示，页面跳转到首页**。

---

## 三、练完后怎么办

- **删除参考答案**：`index.full.vue` 是临时加的，练完可以删掉
- **想再来一遍**：`git checkout src/views/Login/index.vue` 可以恢复原始版

---

## 四、练习自测清单（做完勾一勾）

- [ ] account 验证规则正确（required + trigger: blur）
- [ ] password 验证规则正确（required + 长度 6~14）
- [ ] agree 自定义 validator 已有（不需要修改）
- [ ] 空输入时点击登录显示错误提示
- [ ] 输入符合要求后错误提示消失
- [ ] 登录成功后显示"登录成功"提示
- [ ] 登录成功后跳转首页
- [ ] 控制台无报错

> 全部打勾 = 你已经掌握了 **表单验证 + 路由跳转** 核心技能！
