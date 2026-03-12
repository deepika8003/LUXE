import { createSlice } from "@reduxjs/toolkit";

// load cart from localStorage
const loadCart = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("cartItems");
        return data ? JSON.parse(data) : [];
    }
    return [];
};

const initialState = {
    cartItems: loadCart(),
};

const saveCart = (cart) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(cart));
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.cartItems.find(
                (item) => item.id.toString() === action.payload.id.toString()
            );

            if (existing) {
                existing.qty += 1;
            } else {
                state.cartItems.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    image: action.payload.image,
                    description: action.payload.description,
                    discount: action.payload.discount,
                    originalPrice: action.payload.originalPrice,
                    offerCount: action.payload.offerCount,
                    qty: action.payload.qty || 1,
                });
            }

            saveCart(state.cartItems);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );

            saveCart(state.cartItems);
        },

        updateQty: (state, action) => {
            const item = state.cartItems.find(
                (item) => item.id === action.payload.id
            );

            if (item) {
                item.qty = action.payload.qty;
            }

            saveCart(state.cartItems);
        },

        clearCart: (state) => {
            state.cartItems = [];
            saveCart([]);
        },

        setCart: (state, action) => {
            state.cartItems = action.payload;
            saveCart(state.cartItems);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    setCart,
} = cartSlice.actions;

export default cartSlice.reducer;