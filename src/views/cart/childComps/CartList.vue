<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList"
         :itemInfo="item" :key="index"/>
    </scroll>
</div>
</template>

<script>
import { mapGetters } from'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem'

export default {
  name: 'CartList',
    components:{
    Scroll,CartListItem
  },
  computed:{
    ...mapGetters(['cartLength','cartList']) 
     //直接调用到getters.js的方法

  },
  activated(){
    this.$refs.scroll.refresh()
  }
  }

</script>
<style scoped>
.cart-list{
    height:calc(100% - 44px - 60px);
}
 .nav-bar{
   background-color:var(--color-tint);
      color:white;

 }
 .content{
    height:calc(100% - 44px);
    overflow: hidden;
 }
</style>