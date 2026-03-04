import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [], // { id, qty }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },

        addToCart: (state, action) => {
            const id = action.payload.id;

            const existing = state.cartItems.find((i) => i.id === id);

            if (existing) {
                existing.qty += 1;
            } else {
                state.cartItems.push({
                    id,
                    qty: 1,
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