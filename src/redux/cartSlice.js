import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    }
    return [];
};

const initialState = {
    cartItems: loadCart(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (existing) {
                existing.qty += 1;
            } else {
                state.cartItems.push({ ...action.payload, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        updateQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload.id
            );
            if (item) {
                item.qty = action.payload.qty;
            }

            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, updateQty } =
    cartSlice.actions;

export default cartSlice.reducer;