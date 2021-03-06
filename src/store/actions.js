import{
    ADD_COUNTER,ADD_TO_CART
}from './mutations-type'
export default {
    addCart(context,payload){

        return new Promise((resolve,reject)=>{
        //查找之前的数组是否有该商品
        let oldProduct = context.state.cartList.find(item=>{
            return item.iid === payload.iid
        })

        if(oldProduct){
        //oldProduct.count +=1
        context.commit(ADD_COUNTER,oldProduct)
        resolve("当前商品数量+1")
        }else{
            payload.count = 1
            //context.state.carList.push(payload)
            context.commit(ADD_TO_CART,payload)
            resolve("添加新的商品")
        }

        })
        
    
}
}