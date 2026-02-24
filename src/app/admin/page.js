"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminProduct from "@/components/AdminPage/AdminProduct";

const defaultProducts = [
    {
        id: 1,
        name: "Classic Leather Watch",
        sku: "CLW-001",
        category: "Accessories",
        stock: 15,
        price: 120,
        status: "Live",
        image: "https://via.placeholder.com/50",
    },
    {
        id: 2,
        name: "Minimal Sneakers",
        sku: "MS-002",
        category: "Footwear",
        stock: 8,
        price: 90,
        status: "Live",
        image: "https://via.placeholder.com/50",
    },
    {
        id: 3,
        name: "Denim Jacket",
        sku: "DJ-003",
        category: "Clothing",
        stock: 0,
        price: 150,
        status: "Sold Out",
        image: "https://via.placeholder.com/50",
    },
    {
        id: 4,
        name: "Summer Hat",
        sku: "SH-004",
        category: "Accessories",
        stock: 20,
        price: 35,
        status: "Draft",
        image: "https://via.placeholder.com/50",
    },
];

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState("add");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // LOAD FROM LOCAL STORAGE
    useEffect(() => {
        const stored = localStorage.getItem("products");

        if (stored) {
            setProducts(JSON.parse(stored));
        } else {
            setProducts(defaultProducts);
            localStorage.setItem("products", JSON.stringify(defaultProducts));
        }
    }, []);

    // SAVE TO LOCAL STORAGE
    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    // ADD BUTTON CLICK
    const handleAddClick = () => {
        setMode("add");
        setSelectedProduct(null);
        setShowModal(true);
    };

    // EDIT CLICK
    const handleEditClick = (product) => {
        setMode("edit");
        setSelectedProduct(product);
        setShowModal(true);
    };

    // SAVE PRODUCT
    const handleSaveProduct = (data) => {
        if (mode === "edit") {
            const updated = products.map((item) =>
                item.id === data.id ? data : item
            );
            setProducts(updated);
        } else {
            const newProduct = {
                ...data,
                id: Date.now(),
            };
            setProducts([...products, newProduct]);
        }

        setShowModal(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };

    return (
        <AdminLayout onAddProductClick={handleAddClick}>
            <AdminProduct
                products={products}
                showModal={showModal}
                setShowModal={setShowModal}
                selectedProduct={selectedProduct}
                mode={mode}
                showSuccess={showSuccess}
                onSaveProduct={handleSaveProduct}
                onEditClick={handleEditClick}
            />
        </AdminLayout>
    );
}