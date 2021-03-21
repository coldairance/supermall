import BackTop from 'components/content/backtop/BackTop';
import CONST from './const'

export const backTopMixin = {
  data() {
    return {
      showBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
   },
   listenBackTop(position) {
     this.showBackTop = (-position.y) > CONST.BACK_TOP_TRANS
   }
  },
  components: {
    BackTop
  }
}
