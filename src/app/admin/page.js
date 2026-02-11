"use client";

import React, { useState, useEffect } from "react";
import AdminProduct from "@/pages/AdminPage/AdminProduct";
import SideBar from "@/components/AdminPage/SideBar";
import TopBar from "@/components/AdminPage/TopBar";

const Page = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ✅ Initial products – this array will be shown when localStorage is empty
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Cashmere Overcoat",
            sku: "SG-10294",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjefRmKh9Ku3PvgSntBasogV94LwdiqA8R9C2_2nlNFaJikk5taowM4bTHAvX6euda-KAUqoUf8a_6vdo_J4ge4DlguYCdXAEwKFpauu5mD0JNhYGz_G53winsOMhOOiJDyUxMkXLeaDGzT1p55sqZW-kwL9UU2hKOCf4VWN1hrGDylrRnaRMU0ngc2bIWnIPRuzfAEBXHs4ejePYOC48a4l-VJ5UgHA78nQw8drISg0KK1-0slJxAdB1pCBdt6jjnLl_vU5xFIkc",
            category: "Apparel",
            stock: 45,
            price: 890,
            status: "Live",
        },
        {
            id: 2,
            name: "Silk Maxi Dress",
            sku: "WB-55210",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAffqwN00XAl1h8G56Fp3FL4FVgQq6265FlcgMp1XR4imu6kGs-sElH9ahoLEcgSwnBR3piVDMKMMtznRpocdlTmWhF0T9sZaCGZXR_mpWj7CBSmHem_96MI3-FJeqslO0lsqcHvxfxyzN2ypDXOO3v8IpQtYWB1A0tM06goZl8l1uj9RYt_hEO91TDXjqLp147XDhZA_gLlc0HfNzqnEagJcesiR8jRmDnqNCk8hxyiCgHLHGUikP5hdkdXPkCB5GHbNgtgpNRxv4",
            category: "Apparel",
            stock: 12,
            price: 450,
            status: "Live",
        },
        {
            id: 3,
            name: "Metier Tote Bag",
            sku: "FB-88392",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCd-a8CTigA31Y7IXeIOsjLxTEQemi0DLysgX3O1VbppzoddGlcUoxBv9xppfgFWsZhbcoR6kg159PMhox7bOpZ03M5Iti5CAc9IauMza5nikPXFKUL9PG2BMPFrIdpRNrvqdaet-YArEeN_WmNLXMlhVQY2wc74BPkxyB5r9ldN4SZuMtFGo6ROrt9y3pBZgGr9jm0n3WRkiS4InS2EMPM7ULK8rg0VAvlrOm9Wx-kYYZq4ekPVPeDSBKDvCZyOJw7x-9LQgonDac",
            category: "Footwear",
            stock: 0,
            price: 320,
            status: "Sold Out",
        },
        {
            id: 4,
            name: "Relaxed Linen Shirt",
            sku: "CS-22019",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUtjfQ10jwehXkcpLnxXaE6TvnZFHvmgbhTqvN_SXmmdeSruS15OomGGFDe5led_XYN24rucRb1oWId0He6LcrfVvYzxIUrcOAJ3NqshUL4XHp82kgcMVVHvAld2rYu56qTFlUWPq0mHaj0Ify9TbNs4qOXhvSs4mMC9cYMnJzBkMUQ6e3GUZ58E2v0qfWFby2NFh1jX1MRFC8lbYnobMQBjhfP1NUnsXu7hLxfgwJunGkv4ItF-saIQpDZsY0t2xSRJvUL3UgP_E",
            category: "Apparel",
            stock: 28,
            price: 275,
            status: "Draft",
        },
    ]);


    useEffect(() => {
        const stored = localStorage.getItem("products");
        if (stored) {
            setProducts(JSON.parse(stored));
        }

    }, []);


    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    // AddProduct modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mode, setMode] = useState("add");
    const [showSuccess, setShowSuccess] = useState(false);

    // Product save function
    const handleSaveProduct = (newProduct) => {
        if (mode === "edit") {
            setProducts((prev) =>
                prev.map((item) =>
                    item.id === selectedProduct.id
                        ? {
                            ...item,                   // keep existing product info
                            ...newProduct,             // overwrite with new fields
                            id: selectedProduct.id,    // keep the same ID
                            image: newProduct.image || item.image, // keep old image if no new one
                        }
                        : item
                )
            );
        } else {
            setProducts((prev) => {
                const nextId =
                    prev.length > 0
                        ? Math.max(...prev.map((item) => item.id)) + 1
                        : 1;

                return [
                    ...prev,
                    {
                        ...newProduct,
                        id: nextId,
                        image: newProduct.image || "",
                    },
                ];
            });
        }

        // show success toast
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // close modal
        setShowModal(false);
        setSelectedProduct(null);
    };


    // TopBar Add Product button click
    const handleAddClick = () => {
        setSelectedProduct(null);
        setMode("add");
        setShowModal(true);
    };

    // Edit button click
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setMode("edit");
        setShowModal(true);
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDE BAR */}
            <div
                className={`fixed z-50 inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <SideBar />
            </div>

            <div className="flex-1 flex flex-col lg:ml-64 h-screen overflow-hidden">
                {/* TOP BAR */}
                <div className="sticky top-0 z-30">
                    <TopBar
                        onMenuClick={() => setSidebarOpen(true)}
                        onAddProductClick={handleAddClick}
                    />
                </div>

                {/* CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-6">
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
                </main>
            </div>
        </div>
    );
};

export default Page;