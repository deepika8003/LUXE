import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";
import addressReducer from "./addressSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        product: productReducer,
        address: addressReducer,
        filters: filterReducer,

    },
});