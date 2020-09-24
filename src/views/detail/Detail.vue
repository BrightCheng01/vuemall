<template>
<div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
   
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
<!-- {{$store.state.cartList}}
<ul>
  <li v-for="item in $store.state.cartList">{{item}}</li>
</ul> -->
     <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="param" :paramInfo="paramInfo"/>
    <detail-comment-info ref="comment" :comment-info="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
<detail-bottom-bar @addToCart="addToCart"/> 
<back-top @click.native="backClick" v-show="isShow"/>
<toast :message="message" :show="show"/>


</div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import NavBar from 'components/common/navbar/NavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import GoodsList from'components/content/goods/GoodsList'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
import DetailBottomBar from './childComponents/DetailBottomBar'
  import BackTop  from 'components/content/backTop/BackTop.vue'
import Toast from 'components/common/toast/Toast'




import Scroll from 'components/common/scroll/Scroll.vue'



export default {
  name: 'Detail',
  components:{
    NavBar,DetailNavBar,DetailSwiper,
    DetailBaseInfo,DetailShopInfo,
    Scroll,DetailGoodsInfo,DetailParamInfo,
    DetailCommentInfo,GoodsList,
    DetailBottomBar,BackTop,Toast
  
  },
  mixins:[itemListenerMixin],
  data() {
      return {
          iid:null,
          topImages:[],
          res:null,
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          themeTopYs:[],
          getThemeTopY:null,
          currentIndex:0,
          isShow:false,
          message:'false',
          show:false //toast的显示状态
          
          // itemImgListener:null


      }
  },
  created() {
    // console.log(this.$route.params.iid);
    
    //保存iid
      this.iid=this.$route.params.iid
      //2根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        const data = res.result
        //1.获取顶部轮播图数据
        this.topImages=data.itemInfo.topImages
      //2获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
    
      //3获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //4保存商品详情数据
      this.detailInfo = data.detailInfo

       //5获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //.7取出评论信息
        if(data.rate.cRate !== 0)
        {
          this.commentInfo = data.rate.list[0]
          // console.log(this.commentInfo);
        }

        //首次获取，值不对
        // this.$nextTick(()=>{

        //   //dom渲染完成，但图片未加载完成
        //   this.themeTopYs=[]
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //     console.log(this.themeTopYs)
        // })

        
      }),


        //给getThemeTopY赋值,并进行防抖 
        this.getThemeTopY = debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                    this.themeTopYs.push(Number.MAX_VALUE)

            console.log(this.themeTopYs)
        },200)
      //请求推荐数据
      getRecommend().then(res=>{
         this.recommends=res.data.list
      })
  },
 

  mounted() {
        

  },

  destroyed(){
      this.$bus.$off('itemImageLoad',this.ItemImgListener)

  },

  
  methods: {
    imageLoad(){
            console.log("dsa");

      this.$refs.scroll.refresh()

        this.getThemeTopY()
      
    },
    //顶部导航栏
    titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    addToCart(){
      //获取购物车需要展示的信息 
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice;
      product.iid = this.iid
      //将商品添加到购物车
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{
          // this.show=true;
          // this.message= res
          // setTimeout(()=>{
          //   this.show=false
          //   this.message=''
          // },1500)
          this.$toast.showToast(res,2000)
      })
      //添加购物车弹出提示框

    },
    backClick(){
     this.$refs.scroll.scrollTo(0,0)
     },
    contentScroll(position){

    //判断BackTop是否显示
     this.isShow=((-position.y)>1000)

      //取得当前y位置
      const positionY= -position.y
      //与主题值进行对比
      const length = this.themeTopYs.length
      for(let i=0; i<length-1;i++)
      {

        //  ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
        //  this.themeTopYs[i+1]) || (i===length - 1 && positionY >=  this.themeTopYs[i]))
        if(this.currentIndex!==i && (positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i+1] 
        ))
         {
           this.currentIndex=i
              console.log(this.currentIndex);
              this.$refs.nav.currentIndex = this.currentIndex
         }
      }

    }
  },
}

</script>
<style scoped>
 #detail{
position:relative;
z-index:9;
background-color: #fff;
height: 100vh;
 }

 .content{
   height: calc(100% - 44px);
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
</style>