"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ProductPersistence from "@/redux/ProductPersistence";
import CartPersistence from "@/redux/CartPersistence";
export function Providers({ children }) {
    return (
        <Provider store={store}>
            <ProductPersistence>
                <CartPersistence>
                    {children}
                </CartPersistence>
            </ProductPersistence>
        </Provider>
    );
}