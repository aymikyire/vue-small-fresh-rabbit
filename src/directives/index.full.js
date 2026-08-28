/*
  ============================================
  此文件为 directives/index.js 的【完整参考答案】
  仅供完成练习后对照，或练习卡壳时参考。
  练习用的挖空版在同目录 directives/index.js。
  ============================================
*/
//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'


export const lazyPlugin={
    install(app){
        //定义全局指令
app.directive('img-lazy',{
    mounted(el,binding){
        //el：指令绑定的那个元素img
        //binding:binding.value 指令等于号后面绑定的表达式的值 即图片url
        const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
                console.log(isIntersecting)
                if (isIntersecting) {
                    // 图片进入可视区域，设置 src 加载图片
                    el.src = binding.value
                    // 停止观察，释放资源
                    stop()
                }
            },
        )
    }
})

    }
}