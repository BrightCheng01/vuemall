<template>
<div id="home">
<nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>

<tab-control class="tab-control" :titles="titles" 
@tabClick="tabClick" ref="tabControl1"  v-show="isTabFixed"/>

<scroll class="content" ref="scroll" :probe-type="3" 
@scroll="contentscroll" :pull-up-load="true" @pullingUp="loadMore" >
<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />

<recommend-view :recommends="recommends"/>

<feature-view />
<tab-control class="tab-contro2" :titles="titles" 
@tabClick="tabClick" ref="tabControl2"  />
<goods-list :goods="goods[currentType].list" />

</scroll>
<back-top @click.native="backClick" v-show="isShow"/>

  </div>
  
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from'components/common/navbar/NavBar'
import TabControl from'components/content/tabControl/TabControl'
import GoodsList from'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop  from 'components/content/backTop/BackTop.vue'



import {getHomeMultidata,getHomeGoods} from'network/home'
// import Swiper from 'components/common/swiper/Swiper'
 import {Swiper,SwiperItem} from 'components/common/swiper/'
 import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'



export default {
  name: 'Home',
  components:{
    NavBar,Swiper,SwiperItem,
    HomeSwiper,RecommendView,
    FeatureView,TabControl,
    GoodsList,Scroll,BackTop,
  },
  mixins:[itemListenerMixin],
  data() {
    return {
      banners:[],
      recommends:[],
      titles:['流行','新款','精选'],
      goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]},

      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0

    }
  },
  created(){
    //请求多个数据
    this.getHomeMultidata(),
    //分别请求每类的商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  destroyed() {
    console.log("homeddd")
  },
  activated() {
        this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() { 
     //离开当前组件函数
     this.saveY=-this.$refs.scroll.getScrollY

     //取消全局事件监听
  this.$bus.$off('itemImageLoad',this.ItemImgListener)
  },
  mounted() {

//     //赋值,s所有组件都有一个属性$el:用于获取组件的元素

//    //监听item中的图片加载完成
//       const refresh = debounce(this.$refs.scroll.refresh,1000)
//     //对监听事件进行保存
//     this.itemImgListener=()=>{
//       console.log("asd");
//      refresh()    
//       }
// this.$bus.$on('itemImgLoad',this.itemImgListener)

  },
  methods: {
      //网络请求方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      console.log(res.data)
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
  
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      this.$refs.scroll.finishPullUp()
    })
    },

    //事件监听方法
    tabClick(index){
      switch(index)
      {
        case 0:this.currentType='pop' 
        break
        case 1:this.currentType='new'
         break
        case 2:this.currentType='sell' 
        break
      }
      if(this.$refs.tabControl1!==undefined)
      this.$refs.tabControl1.currentIndex=index
      this.$refs.tabControl2.currentIndex=index

    },
    backClick(){
     this.$refs.scroll.scrollTo(0,0)
     },
     contentscroll(position){ //监听返回顶部的图标位置
     //判断BackTop是否显示
     this.isShow=((-position.y)>1000)

     //决定tabControl是否吸顶(position:fixed)
      this.isTabFixed =(-position.y) > this.tabOffsetTop
      
     },

     loadMore(){

       this.getHomeGoods(this.currentType)

       this.$refs.scroll.scroll.refresh()
     },
      //监听图片
     swiperImageLoad(){
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
     }
     
  },
}

</script>
<style scoped>
#home{
/* padding-top: 44px; */
height: 100vh;
position: relative;  

}
 .home-nav{
   background-color:var(--color-tint);
   color: white;
   
   /* position: fixed;
   left:0;
   right:0;
   top:0;
   z-index: 9; */

 }
 .tab-control{
   position:sticky;
   top:44px;
   z-index:9;
  
 }

  .content{
  /* height: 300px; */

        overflow: hidden;

    position: absolute;
     top: 44px;
     bottom: 49px;
    left: 0;
    right: 0;
 }

 /* .content{
   height:  calc(100% - 93px);

   overflow: hidden;
   margin-top: 43px;
 } */
</style>