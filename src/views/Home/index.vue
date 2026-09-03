<script setup >
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import {getBannerAPI} from '@/apis/home'
import{ref,onMounted}from "vue"

const bannerList = ref([])

const getBanner = async () => {
    const res = await getBannerAPI()
    bannerList.value=res.result
}

onMounted(() => {
  getBanner()
  // console.log(111);
})
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner :banner-list="bannerList"/>
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>

<style scoped>
.container {
  position: relative;
  display: flex;
}
</style>
