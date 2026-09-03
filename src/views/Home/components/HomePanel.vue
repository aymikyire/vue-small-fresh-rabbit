<!--
  ============================================
  【练习版】本文件是 HomePanel 的挖空练习版，
  共 2 个 TODO（①~②），
  请按根目录《practice/HomePanel/HomePanel练习指南.md》的步骤依次补全。
  完整参考答案在同目录 HomePanel.full.vue（完成后再对照）。
  提示：先读下方模板，看界面"需要 script 提供什么"，
        再回头实现 script。
  ============================================
-->
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

<script setup>

// ============================================================
// TODO ①: 定义 props（接收父组件传入的数据）
// ------------------------------------------------------------
// 【变量说明】
//   title   —— 主标题文字
//   subTitle —— 副标题文字
//
// 【思路】
//   使用 defineProps 定义两个 String 类型的 prop
//
// 【答案示例】
//   defineProps({
//       title: { type: String },
//       subTitle: { type: String }
//   })
// ============================================================
defineProps({
    title: { type: String},
    subTitle: { type: String}
})
// ============================================================
// TODO ②: 本组件没有其他逻辑，思考：父组件如何向此组件传内容？
// ------------------------------------------------------------
// 【提示】
//   模板中使用了 <slot />，这是"插槽"语法。
//   父组件在 <HomePanel> 标签之间放的内容会渲染到 <slot /> 位置。
//   试试在浏览器中找到 HomePanel，看看 <slot /> 实际渲染了什么。
// 【验证】
//   找到页面中使用 HomePanel 的组件（如 HomeHot），
//   确认它传入的内容是否出现在标题下方。
// ============================================================
</script>

<style scoped>
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
