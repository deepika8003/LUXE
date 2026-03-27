import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders:
        typeof window !== "undefined"
            ? JSON.parse(localStorage.getItem("orders")) || []
            : [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.unshift(action.payload);

            if (typeof window !== "undefined") {
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }
        },

        cancelOrder: (state, action) => {
            const order = state.orders.find((o) => o.id === action.payload);
            if (order) {
                order.status = "Cancelled";
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }
        },

        updateOrderStatus: (state, action) => {
            const { id, status } = action.payload;
            const order = state.orders.find((o) => o.id === id);
            if (order) {
                order.status = status;
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("orders", JSON.stringify(state.orders));
            }
        },
        
    },
});

export const { addOrder, cancelOrder, updateOrderStatus } =
    orderSlice.actions;

export default orderSlice.reducer;