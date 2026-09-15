
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Product from "./Product";

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
};

function FeaturedProducts() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch("/api/products");

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                setProducts(data.products || []);
            } catch (error) {
                console.error("FETCH PRODUCTS ERROR:", error);

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to load products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="w-full px-2 py-10 lg:mx-15">
            {/* HEADER */}
            <div className="mb-6 flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        Best Deals
                    </h2>

                    <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                        Our best products and offers
                    </p>
                </div>

                <Link
                    href="/products"
                    className="hidden text-sm font-semibold text-gray-800 transition hover:text-gray-500 sm:block"
                >
                    View All →
                </Link>
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
                <div className="rounded-xl border border-gray-200 py-10 text-center">
                    <p className="text-sm font-medium text-gray-500">
                        No products available
                    </p>
                </div>
            )}

            {/* MOBILE VIEW ALL */}
            {!loading && products.length > 0 && (
                <Link
                    href="/products"
                    className="mt-6 block w-full rounded-xl border border-gray-200 py-3 text-center text-sm font-semibold text-gray-800 transition hover:bg-gray-50 sm:hidden"
                >
                    View All Products →
                </Link>
            )}
        </section>
    );
}

export default FeaturedProducts;
