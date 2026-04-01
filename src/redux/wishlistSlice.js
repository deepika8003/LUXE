"use client";

import { createSlice } from "@reduxjs/toolkit";

/*  LOAD FROM LOCALSTORAGE  */
const loadWishlist = () => {
    try {
        if (typeof window !== "undefined") {
            const data = localStorage.getItem("wishlist");
            return data ? JSON.parse(data) : [];
        }
        return [];
    } catch (err) {
        console.log("Load Wishlist Error:", err);
        return [];
    }
};

/*  SAVE TO LOCALSTORAGE  */
const saveWishlist = (items) => {
    try {
        if (typeof window !== "undefined") {
            localStorage.setItem("wishlist", JSON.stringify(items));
        }
    } catch (err) {
        console.log("Save Wishlist Error:", err);
    }
};

/*  INITIAL STATE  */
const initialState = {
    items: loadWishlist(),
};

/*  SLICE  */
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        /* ADD */
        addToWishlist: (state, action) => {
            const exists = state.items.find(
                (item) => String(item.id) === String(action.payload.id)
            );

            if (!exists) {
                state.items.push(action.payload);
                saveWishlist(state.items);
            }
        },

        /* REMOVE */
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(
                (item) => String(item.id) !== String(action.payload)
            );
            saveWishlist(state.items);
        },

        /* SET  */
        setWishlist: (state, action) => {
            state.items = action.payload;
            saveWishlist(state.items);
        },

        /* CLEAR (BONUS) */
        clearWishlist: (state) => {
            state.items = [];
            saveWishlist([]);
        },
    },
});

/*  EXPORTS  */
export const {
    addToWishlist,
    removeFromWishlist,
    setWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;