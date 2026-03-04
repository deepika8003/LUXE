import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },
        addToCart: (state, action) => {
            const item = action.payload;

            const existing = state.cartItems.find(i => i.id === item.id);

            if (existing) {
                existing.qty += 1;
            } else {
                state.cartItems.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    qty: 1
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
        },

        updateQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (item) {
                item.qty = action.payload.qty;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQty, setCart } =
    cartSlice.actions;

export default cartSlice.reducer;