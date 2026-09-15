
"use client";

import Product from "@/components/Product";
import { useEffect, useState } from "react";

type ProductType = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    discount: number;
    payable_price: number;
    sku: string;
    images: string[];
    brand: string | null;
    stock_quantity: number;
    sizes: number[];
    colors: string[];
    category: string | null;
    product_category: string | null;
    created_at: string;
};

function LatestFashion() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch("/api/products");

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                const latestProducts = (data.products || [])
                    .sort(
                        (a: ProductType, b: ProductType) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime()
                    );

                setProducts(latestProducts);
            } catch (error) {
                console.error(
                    "FETCH LATEST PRODUCTS ERROR:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLatestProducts();
    }, []);

    return (
        <div className="mx-2 my-6 lg:mx-15">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Latest Fashion
                </h1>

                <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                    Discover our newest fashion collection
                </p>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                        >
                            <div className="aspect-square animate-pulse bg-gray-200" />

                            <div className="space-y-3 p-3 sm:p-4">
                                <div className="h-2 w-16 animate-pulse rounded bg-gray-200" />

                                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                                <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ERROR */}
            {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                    {error}
                </div>
            )}

            {/* PRODUCTS */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            )}

            {/* NO PRODUCTS */}
            {!loading && !error && products.length === 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center">
                    <h2 className="text-sm font-semibold text-gray-700">
                        No latest products found
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                        There are currently no products available.
                    </p>
                </div>
            )}

        </div>
    );
}

export default LatestFashion;

