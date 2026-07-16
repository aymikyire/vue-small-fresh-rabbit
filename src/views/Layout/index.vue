<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';

</script>

<template>
  <div>
    <LayoutNav/>
    <LayoutHeader/>

    <!--二级路由出口组件---->
    <RouterView />

    <LayoutFooter/>
    <!-- <h1>我是首页</h1> -->
    
  </div>
</template>

<style scoped></style>
