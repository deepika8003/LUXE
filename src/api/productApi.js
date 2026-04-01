// src/api/productApi.js
const productURL = "https://fakestoreapi.com/products";

export const getAllProducts = async () => {
    const res = await fetch(productURL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
};

export const getProductById = async (id) => {
    const res = await fetch(`${productURL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    return res.json();
};