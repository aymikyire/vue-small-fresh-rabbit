/*
  ============================================
  【练习版】本文件是 directives/index.js 的挖空练习版，
  共 1 个 TODO（①），
  请按根目录《practice/directives/directives练习指南.md》的步骤依次补全。
  完整参考答案在同目录 index.full.js（完成后再对照）。
  ============================================
*/
//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
    install(app) {
        //定义全局指令
        app.directive('img-lazy', {
            // el：指令绑定的 DOM 元素（即 img 标签）
            // binding：包含指令的值等信息，binding.value 是等号后面的表达式值（图片 URL）
            mounted(el, binding) {
                const { stop } = useIntersectionObserver(
                    el,
                    ([{ isIntersecting}]) => {
                        if(isIntersecting){
                            el.src = binding.value
                            stop()
                        }
                    }
                )
                // ============================================================
                // TODO ①: 实现图片懒加载逻辑
                // ------------------------------------------------------------
                // 【思路】
                //   1. 使用 useIntersectionObserver 监听 el 是否进入视口
                //   2. 当 isIntersecting 为 true 时（进入视口），
                //      将 el.src 设置为 binding.value（图片 URL）
                //   3. 加载后调用 stop() 停止观察，释放资源
                //
                // 【答案示例】
                //   const { stop } = useIntersectionObserver(
                //       el,
                //       ([{ isIntersecting }]) => {
                //           if (isIntersecting) {
                //               el.src = binding.value
                //               stop()
                //           }
                //       },
                //   )
                // ============================================================
                /* 请实现：使用 useIntersectionObserver 实现懒加载 */

            }
        })
    }
}
