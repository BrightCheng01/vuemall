<template>
<div class="toast"  v-show="show">
     <div>{{message}}</div> 
       </div>

</template>

<script>
export default {
  name: 'Toast',
  props:{
    //   message:{
    //       type:String,
    //       default:''
    //   },
    //   show:{
    //       type:Boolean,
    //       default:false
    //   }
  },

  data(){
      return{
          message:'',
          show:false
      }
  },
  components:{

  },
  methods: {
      showToast(message,duration){
          this.show=true
          this.message = message
          setTimeout(()=>{
                this.show=false
                this.message=''
          },duration)

      }
  },
}

</script>
<style scoped>
 .toast{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    color: white;
    padding: 8px 10px;
    border-radius: 10%;
    background-color:rgba(0, 0, 0, 0.6);
    z-index: 999;
 }
</style>