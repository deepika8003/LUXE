"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ProductPersistence from "@/redux/ProductPersistence";

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <ProductPersistence>
                {children}
            </ProductPersistence>
        </Provider>
    );
}