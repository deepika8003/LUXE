"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./productSlice";

export default function ProductPersistence({ children }) {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    // LOAD products from localStorage
    useEffect(() => {
        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
            dispatch(setProducts(JSON.parse(savedProducts)));
        }
    }, [dispatch]);

    // SAVE products to localStorage
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    return children;
}