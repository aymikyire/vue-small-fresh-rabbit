/*
  ============================================
  【练习版】本文件是 router/index.js 的挖空练习版，
  共 2 个 TODO（①~②），
  请按根目录《practice/router/router练习指南.md》的步骤依次补全。
  完整参考答案在同目录 index.full.js（完成后再对照）。
  ============================================
*/
//createRouter:创建router实例对象
//createWebHistory:创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CarList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // ============================================================
  // TODO ①: 配置路由表 routes
  // ------------------------------------------------------------
  // 【思路】
  //   1. 根路径 '/' 使用 Layout 作为主布局组件
  //   2. Layout 下用 children 配置一级子路由：
  //      - '' → Home（首页）
  //      - 'category/:id' → Category（一级分类，:id 是动态参数）
  //      - 'category/sub/:id' → SubCategory（二级分类）
  //      - 'detail/:id' → Detail（商品详情）
  //      - 'carList' → CarList（购物车）
  //      - 'checkout' → Checkout（结算页）
  //      - 'pay' → Pay（支付页）
  //      - 'paycallback' → PayBack（支付结果）
  //      - 'Member' → Member（会员中心，下面还有嵌套子路由）
  //   3. Member 下再嵌套 children：
  //      - '' → UserInfo（个人信息）
  //      - 'order' → UserOrder（订单列表）
  //   4. 单独配置 '/login' → Login（登录页，在布局外）
  //
  // 【提示】嵌套路由的关键：父路由有 component + children，子路由在 children 数组中
  //
  // 【答案示例】见 index.full.js
  // ============================================================
  routes: [
    /* 请实现：配置路由表（嵌套路由） */
    {
      path:'/',
      component:Layout,
      children:[
        {
          path:'',
          component:Home
        },
        {
          path:'category/:id',
          component:Category,
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'detail/:id',
          component:Detail,
        },
        {
          path:'carList',
          component:CarList
        },
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:PayBack
        },
        {
          path:'Member',
          component:Member,
          children:[
            {
              path:'',
              component:UserInfo
            },
            {
              path:'order',
              component:UserOrder
            }
          ]
        },
      ]
    },
    {
      path:'/login',
      component:Login
    }
  ],

  //路由行为的配置项
  scrollBehavior() {
    // ============================================================
    // TODO ②: 实现路由切换后自动回到顶部
    // ------------------------------------------------------------
    // 【思路】scrollBehavior 在每次路由切换时触发，返回 { top: 0 } 即可
    // 【答案示例】return { top: 0 }
    // ============================================================
    return {
      top: 0
    }
  }
})

export default router
