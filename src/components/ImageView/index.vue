<!--
  ============================================
  【练习版】本文件是 ImageView 的挖空练习版，
  共 3 个 TODO（①~③），
  请按根目录《practice/ImageView/ImageView练习指南.md》的步骤依次补全。
  完整参考答案在同目录 index.full.vue（完成后再对照）。
  提示：先读下方模板，看界面"需要 script 提供什么"，
        再回头实现 script。
  ============================================
-->
<script setup>

import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// props适配图片列表
defineProps({
    imageList: {
        type: Array,
        default: () => []
    }
})

//1.小图切换大图显示
const activeIndex = ref(0)

const enterhandler = (i) => {
    activeIndex.value = i
}

//2.获取鼠标相对位置
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

//3.控制滑块跟随鼠标移动(监听elementX/Y变化，一旦变化重新设置left/top)
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)

// ============================================================
// TODO ①: 用 watch 监听 [elementX, elementY] 变化，控制滑块跟随鼠标
// ------------------------------------------------------------
// 【思路】
//   watch 第一个参数是监听源（数组 [elementX, elementY]）
//   第二个参数是回调函数（新值，旧值）=> { ... }
//   有效范围内控制滑块距离（elementX/elementY 在 100~300 之间时计算偏移）
//   处理边界（超出范围时固定 left/top）
//   同时计算大图背景偏移 positionX/positionY（放大 2 倍取负值）
//
// 【答案示例】
//   watch([elementX, elementY], () => {
//       if (isOutside.value) return
//       if (elementX.value > 100 && elementX.value < 300) {
//           left.value = elementX.value - 100
//       }
//       if (elementY.value > 100 && elementY.value < 300) {
//           top.value = elementY.value - 100
//       }
//       if (elementX.value > 300) { left.value = 200 }
//       if (elementX.value < 100) { left.value = 0 }
//       if (elementY.value > 300) { top.value = 200 }
//       if (elementY.value < 100) { top.value = 0 }
//       positionX.value = -left.value * 2
//       positionY.value = -top.value * 2
//   })
// ============================================================
watch([elementX, elementY], () => {
  if(isOutside.value)return
  //逻辑判断1(指针位于中心范围内)，【100,300】,left/top - 100
  if(elementX.value > 100 && elementX.value < 300) { left.value = elementX.value - 100}
  if(elementY.value > 100 && elementY.value < 300) { top.value = elementY.value - 100}
  //逻辑判断2(指针位于边缘范围内,inoutside), 【0,100】||【300，,400】 取边界
  if(elementX.value < 100) {left.value = 0}
  if(elementX.value > 300) {left.value = 200}
  if(elementY.value < 100) {top.value = 0}
  if(elementY.value > 300) {top.value = 200}  

  //放大镜，放大取反
  positionX.value = -elementX.value * 2
  positionY.value = -elementY.value * 2
})


</script>


<template>
    <div class="goods-image">
        <!-- 左侧大图-->
        <div class="middle" ref="target">
            <img :src="imageList[activeIndex]" alt="" />
            <!-- 蒙层小滑块 -->
            <div class="layer" v-show="!isOutside"
                :style="{ left: `${left}px`, top: `${top}px` }"></div>
        </div>
        <!-- 小图列表 -->
        <ul class="small">
            <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)"
                :class="{ active: i === activeIndex }">
                <img :src="img" alt="" />
            </li>
        </ul>
        <!-- 放大镜大图 -->
        <div class="large" v-show="!isOutside" :style="[
            {
                backgroundImage: `url(${imageList[activeIndex]})`,
                backgroundPositionX: `${positionX}px`,
                backgroundPositionY: `${positionY}px`,
            },
        ]"></div>
    </div>
</template>




<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 400px;
        background: #f5f5f5;
    }

    .large {
        position: absolute;
        top: 0;
        left: 412px;
        width: 400px;
        height: 400px;
        z-index: 500;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
        // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
        background-size: 800px 800px;
        background-color: #f8f8f8;
    }

    .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
        left: 0;
        top: 0;
        position: absolute;
    }

    .small {
        width: 80px;

        li {
            width: 68px;
            height: 68px;
            margin-left: 12px;
            margin-bottom: 15px;
            cursor: pointer;

            &:hover,
            &.active {
                border: 2px solid $xtxColor;
            }
        }
    }
}
</style>
