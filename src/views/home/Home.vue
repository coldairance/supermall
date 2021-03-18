<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import {getHomeMultidata} from 'network/home';
import HomeSwiper from './childCompos/HomeSwiper';
import RecommendView from './childCompos/RecommendView';


export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  },
  name: 'Home'
}
</script>

<style>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
