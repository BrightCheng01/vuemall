<template>
    <tab-bar>
   <tab-bar-item path="/home" activeColor="blue">
     <img slot="item-icon" src="~assets/img/tabbar/home0.svg" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/home1.svg" alt="">
   <div slot="item-text">首页</div> 
   </tab-bar-item>
   <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/category0.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category1.svg" alt="">      
   <div slot="item-text">分类</div> 
   </tab-bar-item>
   <tab-bar-item path="/cart" activeColor="blue">
     <img slot="item-icon" src="~assets/img/tabbar/shopcart0.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart1.svg" alt="">
   <div slot="item-text">购物车</div> 
   </tab-bar-item>
   <tab-bar-item path="/profile" activeColor="blue">
     <img slot="item-icon" src="~assets/img/tabbar/profile0.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile1.svg" alt="">
   <div slot="item-text">我的</div> 
   </tab-bar-item>
 </tab-bar>
</template>
<script>
 import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
    name:"MainTabBar",
      components:{
    TabBar,TabBarItem
  }
}
</script>

<style scoped>
    
</style>