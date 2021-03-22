<template>
  <div id="detail">
    <detail-nav-bar ref="navbar" @titleClick="titleClick" class="detail-nav"/>
    <scroll class="wrapper"
     @scroll="contentScroll"
     ref="scroll"
     :probe-type="3">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info @imageLoad="imageLoad" :detail-info="detailInfo"/>
      <detail-param-info ref="params" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>

    <back-top v-show="showBackTop" @click.native="backClick"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail';

import { debounce } from "common/utils";

import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';

import { backTopMixin } from "common/mixin"

export default {
  name: "Detail",
  mixins: [
    backTopMixin
  ],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created() {

    this.iid = this.$route.params.iid
    // this.iid = this.$route.query.iid

    // 请求详情数据
    getDetail(this.iid).then(res => {

      const data = res.result;

      // 1.获取顶部轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 防抖函数赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);

      // -44 因为offsetTop是相对屏幕顶，better-scroll是相对最外层wrapper
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 300)
  },
  mounted() {

    // 图片加载事件监听
    const refresh = debounce(this.$refs.scroll.refreshPullUp, 300)
    this.$bus.$on('detailItemImageLoad', () => {
      refresh()
    })

  },
  methods: {

    imageLoad() {
      this.$refs.scroll.refreshPullUp()

      // 进行异步防抖
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
    },
    contentScroll(position) {

      // 监听backTop按钮
      this.listenBackTop(position)

      // 1.获取y值
      const positionY = -position.y

      // 2.和主题中值进行对比
      for(let i = 0; i < this.themeTopYs.length-1; i++) {

        if(this.currentIndex !==i
           && (positionY >= this.themeTopYs[i])
           && (positionY < this.themeTopYs[i+1])){

             this.$refs.navbar.currentIndex = this.currentIndex = i;
           }
      }
    },
    addToCart() {

      // 1.获取购物车需要展示信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加收到购物车里
      this.$store.dispatch('addCart', product).then(res => {
         this.$toast.show(res, 1000)
      })
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .wrapper {
    height: calc(100% - 102px);
  }
</style>>
