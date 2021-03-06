import {debounce} from 'common/utils'

export const itemListenerMixin={
    data(){
        return{
            itemImgListener:null

        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,1000)
          this.itemImgListener=()=>
          {
            refresh()
          }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log("混入了");
    },
}