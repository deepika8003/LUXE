import { createSlice } from "@reduxjs/toolkit";

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
            const maxId = state.products.length
                ? Math.max(...state.products.map(p => p.id))
                : 0;

            const newProduct = {
                id: maxId + 1,
                ...action.payload,
            };

            state.products.push(newProduct);
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

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;