import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find(
                (i) => i.id === action.payload.id
            );

            if (existing) {
                existing.qty += 1;
            } else {
                state.cartItems.push({
                    id: action.payload.id,
                    qty: action.payload.qty || 1,
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

export const { addToCart, removeFromCart, updateQty } =
    cartSlice.actions;

export default cartSlice.reducer;