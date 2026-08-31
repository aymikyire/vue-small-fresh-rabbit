/*
  ============================================
  此文件为 stores/cartStore.js 的【完整参考答案】
  仅供完成练习后对照，或练习卡壳时参考。
  练习用的挖空版在同目录 cartStore.js。
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
        console.log(cartList.value)
    }

    //加入购物车
    const addCart = async (goods) => {
        //思路： 通过匹配传递过来的商品对象的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            //找到了，数量加
            item.count += goods.count
        } else {
            //没找到，push
            cartList.value.push({ ...goods, selected: true })
        }
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

    //全选逻辑
    const checkAllCart = (selected) => {
        //把cartList 中的每一项的selected都设置为当前的全选框状态
        cartList.value.forEach(item => item.selected = selected)
    }

    //全选计算
    const allCount = computed(() => cartList.value.reduce((a,c) => a+c.count,0))
    const allPrice = computed(() => cartList.value.reduce((a,c) => a+c.count * c.price,0))

    //已选中计算
    const selectedCount = computed(() => cartList.value.filter(item => item.selected ).reduce((a,c) => a+c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.selected ).reduce((a,c) => a+c.count * c.price, 0))
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