/*
  ============================================
  【练习版】本文件是 stores/cartStore.js 的挖空练习版，
  共 2 个 TODO（①~②），
  请按根目录《practice/cartStore/cartStore练习指南.md》的步骤依次补全。
  完整参考答案在同目录 cartStore.full.js（完成后再对照）。
  ============================================
*/
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    //购物车列表
    const cartList = ref([])

    //获取最新购物车列表
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        cartList.value = res.result
    }

    // ============================================================
    // TODO ①: 实现加入购物车逻辑（addCart）
    // ------------------------------------------------------------
    // 【思路】
    //   1. 在 cartList 中查找是否已有相同 skuId 的商品
    //   2. 如果找到了：item.count += goods.count（数量累加）
    //   3. 如果没找到：push 一个新对象，记得加 selected: true
    //
    // 【答案示例】
    //   const addCart = async (goods) => {
    //       const item = cartList.value.find((item) => goods.skuId === item.skuId)
    //       if (item) {
    //           item.count += goods.count
    //       } else {
    //           cartList.value.push({ ...goods, selected: true })
    //       }
    //   }
    // ============================================================
    const addCart = async (goods) => {
        /* 请实现：判断有无再决定 push 还是累加 */
    }

    //删除购物车
    const delCart = async (skuId) => {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    //单选逻辑
    const singleCheck = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // ============================================================
    // TODO ②: 实现全选/取消全选逻辑（checkAllCart）
    // ------------------------------------------------------------
    // 【思路】
    //   遍历 cartList，把每一项的 selected 设置为传入的 selected 值
    //
    // 【答案示例】
    //   const checkAllCart = (selected) => {
    //       cartList.value.forEach(item => item.selected = selected)
    //   }
    // ============================================================
    const checkAllCart = (selected) => {
        /* 请实现：遍历 cartList 设置每项的 selected */
    }

    //全选计算
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    //已选中计算
    const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    return {
        cartList,
        updateNewList,
        addCart,
        delCart,
        clearCart,
        singleCheck,
        checkAllCart,
        allCount,
        allPrice,
        selectedCount,
        selectedPrice,
        isAll
    }
}, {
    persist: true
})
