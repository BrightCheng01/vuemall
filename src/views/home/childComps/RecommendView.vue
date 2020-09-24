<template>
    <div class="recommend">
        <div v-for="item in recommends" class="recommend-item" >
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .recommend{
        display: flex;
        width:100%;
        text-align: center;
        padding: 15px 0px 20px;
        border-bottom: 8px solid #eee;

    }
    .recommend-item{
        flex:1; /*使均等分*/
    }
    .recommend-item img{
        width:70px;
        height:70px;
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>