"use client";

import { useState } from "react";
import SideBar from "@/components/AdminPage/SideBar";
import TopBar from "@/components/AdminPage/TopBar";
import AddProduct from "@/pages/AdminPage/AddProduct";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [mode, setMode] = useState("add");

    //  Open Add Modal
    const handleAddProduct = () => {
        setSelectedProduct(null);
        setMode("add");
        setShowModal(true);
    };

    //  Save Product
    const handleSaveProduct = (newProduct) => {
        if (mode === "edit") {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === newProduct.id ? newProduct : p
                )
            );
        } else {
            setProducts((prev) => [
                ...prev,
                { ...newProduct, id: Date.now() },
            ]);
        }

        setShowModal(false);
    };

    //  Open Edit Modal
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setMode("edit");
        setShowModal(true);
    };

    return (
        <div className="h-screen flex bg-gray-100 overflow-hidden">

            {/* SIDEBAR */}
            <SideBar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* RIGHT SECTION */}
            <div className="flex-1 flex flex-col lg:ml-64 overflow-hidden">

                {/* TOPBAR */}
                <div className="sticky top-0 z-30">
                    <TopBar
                        onMenuClick={() => setSidebarOpen(true)}
                        onAddProductClick={handleAddProduct}
                    />
                </div>

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children &&
                        typeof children === "object" &&
                        (
                            <children.type
                                {...children.props}
                                products={products}
                                onEditClick={handleEditClick}
                            />
                        )}
                </main>
            </div>

            {/* MODAL (ONLY HERE) */}
            {showModal && (
                <AddProduct
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveProduct}
                    mode={mode}
                    productData={selectedProduct}
                />
            )}
        </div>
    );
}
