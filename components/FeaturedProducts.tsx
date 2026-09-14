'use client';

import { products } from "@/data/products";
import Link from "next/link";
import Product from "./Product";

function FeaturedProducts() {
    return (
        <section className="w-full py-10 lg:mx-15 px-2">
            {/* Header */}
            <div className="mb-6 flex items-end justify-between">
                <div>
                    Best Deals
                </div>

                <button className="hidden text-sm font-semibold text-gray-800 sm:block">
                    View All →
                </button>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                   
                        <Product key={product.id} product={product}/>
                  
                ))}
            </div>

            {/* Mobile View All */}
            <button className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-800 sm:hidden">
                View All Products →
            </button>
        </section>
    );
}

export default FeaturedProducts;