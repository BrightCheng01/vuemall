<template>
  <div class="tab-bar-item " @click="itemClick">

     <div v-if="!isActive" >
       <slot name="item-icon"></slot>
     </div> 
      <div v-else >
        <slot name="item-icon-active"></slot>
        </div>
      <div :style="activeStyle" >
      <slot name="item-text"></slot>
      </div>
    <!-- <img src="../../assets/img/tabbar/home0.svg" alt="">
   <div>首页</div>  -->
  </div>
</template>

<script>


export default {

  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      defaule:"red"
    }
  },

  data() {
    return {
      
    }
  },
  computed: {
    isActive:{
     
    get: function(){
       return this.$route.path.indexOf(this.path)!==-1;
    },
    set(){}
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} :{}
    }
  },
  components:{

  },
  methods: {
    itemClick(){
      console.log(this.path);
      this.$router.replace(this.path)
      this.isActive=!this.isActive
    }
  },

}
</script>

<style>


.tab-bar-item{
  flex:1;
  text-align: center;
  height:49px;
  font-size: 12px;
  margin-top: 3px;
  vertical-align: middle;
}
.tab-bar-item img{
  width: 24px;
  height:24px;
}

</style>
