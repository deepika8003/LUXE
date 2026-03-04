"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { setCart } from "@/redux/cartSlice";
import { setProducts } from "@/redux/productSlice";

function PersistLoader({ children }) {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state?.cart?.cartItems || []);
    const products = useSelector((state) => state?.product?.products || []);

    // Load saved data from localStorage (only in browser)
    useEffect(() => {
        if (typeof window === "undefined") return;

        const savedCart = localStorage.getItem("cart");
        const savedProducts = localStorage.getItem("products");

        if (savedCart) {
            dispatch(setCart(JSON.parse(savedCart)));
        }

        if (savedProducts) {
            dispatch(setProducts(JSON.parse(savedProducts)));
        }
    }, [dispatch]);

    // Save cart automatically
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    // Save products automatically
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    return children;
}

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistLoader>{children}</PersistLoader>
        </Provider>
    );
}