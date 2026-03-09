import { createSlice } from "@reduxjs/toolkit";

const getSavedAddress = () => {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("addresses");
        return saved ? JSON.parse(saved) : [];
    }
    return [];
};

const initialState = {
    addresses: getSavedAddress(),
    editAddress: null,
};

const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.addresses.push(action.payload);

            if (typeof window !== "undefined") {
                localStorage.setItem("addresses", JSON.stringify(state.addresses));
            }
        },

        updateAddress: (state, action) => {
            const index = state.addresses.findIndex(
                (addr) => addr.id === action.payload.id
            );

            if (index !== -1) {
                state.addresses[index] = action.payload;
            }

            if (typeof window !== "undefined") {
                localStorage.setItem("addresses", JSON.stringify(state.addresses));
            }

            state.editAddress = null;
        },

        deleteAddress: (state, action) => {
            state.addresses = state.addresses.filter(
                (addr) => addr.id !== action.payload
            );

            if (typeof window !== "undefined") {
                localStorage.setItem("addresses", JSON.stringify(state.addresses));
            }
        },

        setEditAddress: (state, action) => {
            state.editAddress = action.payload;
        },
    },
});

export const {
    addAddress,
    updateAddress,
    deleteAddress,
    setEditAddress,
} = addressSlice.actions;

export default addressSlice.reducer;