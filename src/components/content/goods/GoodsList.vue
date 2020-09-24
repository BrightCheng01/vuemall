<template >
    <div class="goods">
        <goods-list-item  v-for="item in goods" :goods-item="item" />
    </div>
</template>

<script>
import GoodsListItem from'components/content/goods/GoodsListItem'
export default {
    name:'GoodsLit',
    data() {
        return {
            
        }
    },
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scroped>
    .goods{
        display:flex;
        flex-wrap: wrap;  /*包裹，一行根据宽度显示多少个*/
         justify-content:space-around;
    padding:2px;
    }

    
</style>