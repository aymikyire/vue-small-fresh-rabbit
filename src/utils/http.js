
/*
  ============================================
  【练习版】本文件是 utils/http.js 的挖空练习版，
  共 2 个 TODO（①~②），
  请按根目录《practice/http/http练习指南.md》的步骤依次补全。
  完整参考答案在同目录 http.js（完成后再对照）。
  ============================================
*/
//axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
})

//拦截器

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // ============================================================
    // TODO ①: 在请求发出前，从 Pinia 获取 token 并拼接到请求头
    // ------------------------------------------------------------
    // 【思路】
    //   1. 调用 useUserStore() 获取 store 实例
    //   2. 取出 userStore.userInfo.token
    //   3. 如果 token 存在，拼到 config.headers.Authorization
    //      格式：'Bearer ' + token（Bearer 后有一个空格）
    //   4. 必须 return config
    //
    // 【答案示例】
    //   const userStore = useUserStore()
    //   const token = userStore.userInfo.token
    //   if (token) {
    //       config.headers.Authorization = `Bearer ${token}`
    //   }
    //   return config
    // ============================================================
    /* 请实现：获取 token 并拼接到请求头 */
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    // ============================================================
    // TODO ②: 统一错误处理 + 401 token 失效处理
    // ------------------------------------------------------------
    // 【思路】
    //   1. 用 ElMessage 显示错误提示（type: 'warning', message: e.response.data.message）
    //   2. 判断 e.response.status 是否为 401
    //   3. 如果是 401：清除用户信息（userStore.clearUserInfo()）+ 跳转登录页（router.push('/login')）
    //   4. 必须 return Promise.reject(e)
    //
    // 【答案示例】
    //   const userStore = useUserStore()
    //   ElMessage({ type: 'warning', message: e.response.data.message })
    //   if (e.response.status === 401) {
    //       userStore.clearUserInfo()
    //       router.push('/login')
    //   }
    //   return Promise.reject(e)
    // ============================================================
    /* 请实现：错误提示 + 401 处理 */
    const userStore = useUserStore()
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    if(e.response.status === 401){
        userStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance
