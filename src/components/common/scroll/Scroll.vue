<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>  
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
  data(){
    return{
      scroll:null
    }
  },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
 
      }),
      //监听滚动的位置
      this.scroll.on('scroll',(position=>{
       this.$emit('scroll',position)
      }))

      //监听上拉
      this.scroll.on('pullingUp',()=>{
        console.log("到底了")
       this.$emit('pullingUp')
      })
      console.log(this.scroll);
      this.scroll.refresh()
    },
    methods: {
      scrollTo(x,y,time=2000){
        this.scroll&&this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll&&this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll&&this.scroll.refresh()
      },
      getScrollY(){
       return this.scroll ? this.scroll.y : 0
     }
    },
}
</script>