//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin={
    install(app){
        //懒加载指令逻辑

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