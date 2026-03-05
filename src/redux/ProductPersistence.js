"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./productSlice";

export default function ProductPersistence({ children }) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);


    useEffect(() => {
        const saved = localStorage.getItem("products");
        if (saved) {
            dispatch(setProducts(JSON.parse(saved)));
        }
    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    return children;
}