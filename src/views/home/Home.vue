<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
        ref="tabControlCopy"
        v-show="isTabFixed"
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />

    <scroll class="wrapper" ref="scroll"
     @scroll="contentScroll"
     @pullingUp="loadMore"
     :probe-type="3"
     :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        ref="tabControl"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top v-show="showBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childCompos/HomeSwiper";
import RecommendView from "./childCompos/RecommendView";
import FeatureView from "./childCompos/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

import { backTopMixin } from "common/mixin"


export default {
  mixins: [
    backTopMixin
  ],
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 图片加载事件监听
    const refresh = debounce(this.$refs.scroll.refreshPullUp, 50)
    this.$bus.$on('homeItemImageLoad', () => {
      refresh()
    })

  },

  methods: {
    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 数据
        const data = res.data.list;
        // 拆包
        this.goods[type].list.push(...data);
        // 加页
        this.goods[type].page++;

        this.$refs.scroll.finishPullUp()

      });
    },

    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControlCopy.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.listenBackTop(position)

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      setTimeout(() => {
        this.getHomeGoods(this.currentType)
      }, 200)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
}

/* .wrapper {
  height: calc(100% - 93px);
  overflow: hidden;
} */

.tab-control {
  position: relative;
  z-index: 9;
}

.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>
