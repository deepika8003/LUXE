"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./cartSlice";

export default function CartPersistence({ children }) {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    // LOAD
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            dispatch(setCart(JSON.parse(savedCart)));
        }
    }, [dispatch]);

    // SAVE
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return children;
}