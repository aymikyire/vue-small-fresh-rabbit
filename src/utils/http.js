//axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from '@/stores/user'

const httpInstance = axios.create({
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000

})

//拦截器

//axios请求拦截器
httpInstance.interceptors.request.use(config => {
    //1.从Pinia获取token数据
    const userStore = useUserStore()
    //2.按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    //统一错误提示
    ElMessage({
        type: 'warning',
        message: e.response.data.message
    })
    return Promise.reject(e)
})
export default httpInstance