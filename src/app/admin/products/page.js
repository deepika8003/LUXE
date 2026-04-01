"use client";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "@/redux/productSlice";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/app/components/layout/AdminLayout";
import AdminProduct from "@/app/admin/products/AdminProduct";


export default function AdminPage() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState("add");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);


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
        }, 3000);
    };

    // DELETE PRODUCT 
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            dispatch(deleteProduct(id));

            setMode("delete");
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
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