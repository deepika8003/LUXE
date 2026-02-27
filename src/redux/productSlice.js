
import { createSlice } from "@reduxjs/toolkit";

//  Load from localStorage
const loadProducts = () => {
    if (typeof window !== "undefined") {
        const data = localStorage.getItem("products");
        return data ? JSON.parse(data) : [];
    }
    return [];
};

const initialState = {
    products: loadProducts(),
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push({
                id: Date.now(),
                ...action.payload,
            });

            localStorage.setItem("products", JSON.stringify(state.products));
        },

        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                (p) => p.id === action.payload.id
            );

            if (index !== -1) {
                state.products[index] = action.payload;
                localStorage.setItem("products", JSON.stringify(state.products));
            }
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (p) => p.id !== action.payload
            );

            localStorage.setItem("products", JSON.stringify(state.products));
        },
    },
});

export const { addProduct, updateProduct, deleteProduct } =
    productSlice.actions;

export default productSlice.reducer;