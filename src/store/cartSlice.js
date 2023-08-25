import { createSlice } from "@reduxjs/toolkit";


const initialState={
    cart: [],
};

const cartSlice =createSlice({
    name:"cart",
    initialState,
    reducers: {
        addToCart: (state,action)=>{
            state.cart.push(action.payload);
           
        },

        increaseQuantity: (state,action) =>{
            const {itemId} =action.payload;
            const item= state.cart.find((item) => item.productId == itemId);
            if(item){
                item.productQuantity +=1;
            }
        },

        decreaseQuantity: (state,action) =>{
            const {itemId} =action.payload;
            const item= state.cart.find((item) => item.productId == itemId);
            if(item && item.productQuantity > 1){
                item.productQuantity -=1;
            }
        },

        removeProduct: (state,action) =>{
            const {itemId} =action.payload;
            const item =state.cart.filter((item) => item.productId !=itemId);
            state.cart=item;
        }



    },
});
export const {addToCart, increaseQuantity, decreaseQuantity, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;