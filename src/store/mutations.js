import{
    ADD_COUNTER,ADD_TO_CART
}from './mutations-type'
export default{
        

    [ADD_COUNTER](state,payload){
        payload.count++

        for(let i = 0;i<state.cartList.length;i++)
        {
            console.log(state.cartList[i].count);

        }

    },
    [ADD_TO_CART](state,payload){
        payload.checked = true
        state.cartList.push(payload)
        // console.log(state.carList);
    }
}