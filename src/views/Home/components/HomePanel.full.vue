<!--
  ============================================
  此文件为 HomePanel 的【完整参考答案】
  仅供完成练习后对照，或练习卡壳时参考。
  练习用的挖空版在同目录 HomePanel.vue。
  练习完成后，可删除本文件（git 中保留有原始版）。
  ============================================
-->
<!-- 给HomePanel组件用 -->
<script setup>
    // defineProps<{
    //     title?:string,
    //     subTitle?:string
    // }>()
        defineProps({
            //主标题
            title:{
                type:String
            },
            //副标题
            subTitle:{
                type:String
            }
        })
</script>


<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 主标题和副标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
            </div>
            <!-- 主体内容区域 使用插槽-->
            <slot />
        </div>
    </div>
</template>

<style scoped >
.home-panel {
    background-color: #fff;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }
    }
}
</style>