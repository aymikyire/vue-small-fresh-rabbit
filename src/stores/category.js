// ============================================================
// 分类导航数据的 Store（Pinia 状态管理）
// ============================================================

// ref：Vue 的响应式数据函数，让普通数据变成"可追踪变化"的数据
import { ref } from 'vue'

// defineStore：Pinia 提供的函数，用来创建一个"仓库"（store）
// 仓库就是一个共享的数据中心，任何组件都能读取
import { defineStore } from 'pinia'

// getCategoryAPI：封装好的请求函数，发送 HTTP 请求获取分类数据
// 实际就是调用后端接口：home/category/head
import { getCategoryAPI } from "@/apis/layout"

// -----------------------------------------------------------
// 定义一个 Store，名字叫 'category'（唯一标识，不能和其他 Store 重复）
// -----------------------------------------------------------
// useCounterStore 是这个 Store 的"钩子函数"（useXxxStore 是 Pinia 的命名惯例）
// 组件里通过 const store = useCounterStore() 就能拿到这个仓库
export const useCounterStore = defineStore('category', () => {

  // ===================== State（状态/数据） =====================
  // ref([])：创建一个响应式的空数组
  // categoryList 用来存放后端返回的分类列表
  // 比如：[{ id: 1, name: '家电' }, { id: 2, name: '手机' }, ...]
  // .value 用于读取或修改 ref 包裹的值（在 <script> 中需要 .value，模板中自动解包）
  const categoryList = ref([])

  // ===================== Action（动作/方法） =====================
  // async 表示这是一个异步函数，内部可以用 await 等待结果
  const getCategory = async () => {
    // await：等待 HTTP 请求完成，拿到结果再继续往下执行
    // res 就是后端返回的数据，比如：{ result: [{ id: 1, name: '家电' }, ...] }
    const res = await getCategoryAPI()

    // 把请求结果中的 result 数组赋值给 categoryList
    // .value 是必需的，因为 categoryList 被 ref() 包裹了
    categoryList.value = res.result
  }

  // ===================== 导出 =====================
  // return 出去的数据和方法，组件里才能通过 store.xxx 访问
  // 组件用法示例：
  //   const store = useCounterStore()  → 获取仓库
  //   store.categoryList               → 读取分类列表（响应式，数据变了页面自动更新）
  //   store.getCategory()              → 调用方法获取数据
  return {
    categoryList,  // 导出数据
    getCategory    // 导出方法
  }
})
