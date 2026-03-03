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
                state.cartItems.push({ ...item, qty: 1 });
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },

        updateQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (item) {
                item.qty = action.payload.qty;
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("cart", JSON.stringify(state.cartItems));
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQty, setCart } =
    cartSlice.actions;

export default cartSlice.reducer;