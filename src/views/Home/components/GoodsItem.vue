<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <RouterLink :to="`/goods/${goods.id}`" class="goods-item">
    <img :src="goods.picture" :alt="goods.name" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.goods-item {
  display: block;
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  text-align: center;
  transition: all .5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
    margin-bottom: 10px;
  }

  .name {
    font-size: 16px;
    color: #666;
    line-height: 24px;
  }

  .desc {
    color: #999;
    line-height: 18px;
    margin-top: 4px;
    font-size: 12px;
  }

  .price {
    font-size: 18px;
    color: $priceColor;
    line-height: 1;
    margin-top: 10px;
  }
}
</style>
