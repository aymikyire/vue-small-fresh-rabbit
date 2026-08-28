/*
  ============================================
  【练习版】本文件是 composables/useCountDown.js 的挖空练习版，
  共 3 个 TODO（①~③），
  请按根目录《practice/useCountDown/useCountDown练习指南.md》的步骤依次补全。
  完整参考答案在同目录 useCountDown.full.js（完成后再对照）。
  ============================================
*/
//封装倒计时逻辑函数
import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
    //1.响应式的数据
    let timer = null
    // TODO ①: 创建一个 ref 用来存放倒计时的秒数，初始值为 0
    // 【答案示例】const time = ref(0)
    const time = undefined // 请实现：替换为 ref(0)

    // TODO ②: 创建计算属性 formatTime，把 time 格式化为 "xx分xx秒"
    // 【思路】使用 dayjs.unix(秒数).format('mm分ss秒')
    // 【答案示例】const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    const formatTime = undefined // 请实现：替换为 computed(...)

    //2.开启倒计时的函数
    const start = (currentTime) => {
        // ============================================================
        // TODO ③: 实现倒计时核心逻辑
        // ------------------------------------------------------------
        // 【思路】
        //   1. 把 currentTime 赋值给 time.value
        //   2. 用 setInterval 每秒让 time.value 减 1
        // 【答案示例】
        //   time.value = currentTime
        //   timer = setInterval(() => { time.value-- }, 1000)
        // ============================================================
        /* 请实现：设置初始值 + 开启定时器 */
    }

    //组件销毁时清除定时器（防止内存泄漏）
    // ============================================================
    // TODO ④（附加思考）: 如果不写 onUnmounted 会怎样？
    // ------------------------------------------------------------
    // 【提示】考虑页面离开后 setInterval 还在运行的后果
    // ============================================================
    onUnmounted(() => {
        /* 请实现：清除定时器（提示：clearInterval） */
    })

    return {
        formatTime,
        start
    }
}
