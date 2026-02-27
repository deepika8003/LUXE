"use client";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "@/redux/productSlice";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/app/components/layout/AdminLayout";
import AdminProduct from "@/app/components/AdminPage/AdminProduct";

const defaultProducts = [
    {
        id: 1,
        name: "Classic Leather Watch",
        sku: "CLW-001",
        category: "Accessories",
        stock: 15,
        price: 120,
        status: "Live",
        image: "/images/Classic Leather Watch.jpg",
    },
    {
        id: 2,
        name: "Minimal Sneakers",
        sku: "MS-002",
        category: "Footwear",
        stock: 8,
        price: 90,
        status: "Live",
        image: "/images/shoe.jpg",
    },
    {
        id: 3,
        name: "Denim Jacket",
        sku: "DJ-003",
        category: "Clothing",
        stock: 0,
        price: 150,
        status: "Sold Out",
        image: "/images/denimjacket.jpg",
    },
    {
        id: 4,
        name: "Summer Hat",
        sku: "SH-004",
        category: "Accessories",
        stock: 20,
        price: 35,
        status: "Draft",
        image: "/images/summerhat.jpg",
    },
];

export default function AdminPage() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState("add");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            defaultProducts.forEach((item) => {
                dispatch(addProduct(item));
            });
        }
    }, [products, dispatch]);

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
            dispatch(updateProduct(data));
        } else {
            dispatch(addProduct(data));
        }

        setShowModal(false);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };

    // DELETE PRODUCT 
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <AdminLayout onAddProductClick={handleAddClick}>
            <AdminProduct
                showModal={showModal}
                setShowModal={setShowModal}
                selectedProduct={selectedProduct}
                mode={mode}
                showSuccess={showSuccess}
                onSaveProduct={handleSaveProduct}
                onEditClick={handleEditClick}
                onDeleteClick={handleDelete}
            />
        </AdminLayout>
    );
}