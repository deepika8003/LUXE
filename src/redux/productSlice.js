import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        addProduct: (state, action) => {
            const maxId = state.products.length
                ? Math.max(...state.products.map(p => p.id))
                : 0;

            const newProduct = {
                id: maxId + 1,
                ...action.payload,
            };

            state.products.push(newProduct);
        },

        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                (p) => p.id === action.payload.id
            );

            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },

        deleteProduct: (state, action) => {
            state.products = state.products.filter(
                (p) => p.id !== action.payload
            );
        },
    },
});

export const {
    addProduct,
    updateProduct,
    deleteProduct,
    setProducts,
} = productSlice.actions;

export default productSlice.reducer;