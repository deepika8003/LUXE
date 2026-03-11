const productURL = "https://fakestoreapi.com";

export const getAllProducts = async () => {
    const res = await fetch(`${productURL}/products`);

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
};