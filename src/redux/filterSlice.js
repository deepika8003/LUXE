import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: [],
    price: [],
    discount: [],
    brand: [],
    rating: [],
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilter(state, action) {
            const { type, value } = action.payload;
            state[type] = value ? [value] : [];
        },

        toggleFilter(state, action) {
            const { type, value } = action.payload;

            if (state[type].includes(value)) {
                state[type] = state[type].filter((item) => item !== value);
            } else {
                state[type].push(value);
            }
        },

        clearFilters() {
            return initialState;
        },
    },
});

export const { setFilter, toggleFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;