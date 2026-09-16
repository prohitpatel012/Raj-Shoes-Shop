"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/products");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

          <p className="text-xs text-gray-500 sm:text-sm">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-5 sm:px-5 sm:py-7 lg:px-8">

<div className="mb-5 text-[10px] text-blue-500 sm:text-xs">
  Back to <Link href="/dashboard">Dashboard</Link>
</div>
      {/* HEADER */}
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-7">


        <div>
          <h1 className="text-base font-bold text-gray-900 sm:text-xl lg:text-2xl">
            Products
          </h1>

          <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
            {products.length} product
            {products.length !== 1 ? "s" : ""} in your store
          </p>
        </div>

        <Link
          href="/dashboard/products/create-new-product"
          className="rounded-lg bg-black px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-gray-800 sm:px-4 sm:text-xs"
        >
          + Add Product
        </Link>

      </div>




      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">

          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            📦
          </div>

          <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
            No products yet
          </h2>

          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
            Start by adding your first product.
          </p>

          <Link
            href="/dashboard/products/create-new-product"
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-[10px] font-semibold text-white sm:text-xs"
          >
            Add Product
          </Link>

        </div>
      ) : (

        /* PRODUCT LIST */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">

          {/* DESKTOP HEADER */}
          <div className="hidden border-b border-gray-200 bg-gray-50 px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-gray-500 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:gap-4">

            <span>Product</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Category</span>
            <span>Action</span>

          </div>


          {/* PRODUCTS */}
          <div className="divide-y divide-gray-100">

            {products.map((product) => {

              const image =
                product.images?.[0] || "/placeholder.png";

              const isDeleting =
                deletingId === product.id;

              return (
                <div
                  key={product.id}
                  className="p-3 transition hover:bg-gray-50 sm:p-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center md:gap-4 md:px-5"
                >

                  {/* PRODUCT */}
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-16 sm:w-16">

                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />

                    </div>


                    <div className="min-w-0">

                      <h2 className="truncate text-xs font-semibold text-gray-900 sm:text-sm">
                        {product.name}
                      </h2>

                      <p className="mt-0.5 truncate text-[9px] text-gray-400 sm:text-[10px]">
                        SKU: {product.sku}
                      </p>

                      {product.brand && (
                        <p className="mt-0.5 truncate text-[9px] text-gray-500 sm:text-[10px]">
                          {product.brand}
                        </p>
                      )}

                    </div>

                  </div>


                  {/* MOBILE DETAILS */}
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 md:hidden">

                    <div>
                      <p className="text-[9px] text-gray-400">
                        Price
                      </p>

                      <p className="mt-0.5 text-[10px] font-semibold text-gray-900">
                        ₹{product.payable_price}
                      </p>

                      {product.discount > 0 && (
                        <p className="text-[9px] text-gray-400 line-through">
                          ₹{product.price}
                        </p>
                      )}
                    </div>


                    <div>
                      <p className="text-[9px] text-gray-400">
                        Stock
                      </p>

                      <p
                        className={`mt-0.5 text-[10px] font-semibold ${
                          product.stock_quantity <= 0
                            ? "text-red-600"
                            : product.stock_quantity <= 5
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock_quantity}
                      </p>
                    </div>


                    <div>
                      <p className="text-[9px] text-gray-400">
                        Category
                      </p>

                      <p className="mt-0.5 truncate text-[10px] font-medium text-gray-700">
                        {product.product_category ||
                          product.category ||
                          "-"}
                      </p>
                    </div>

                  </div>


                  {/* DESKTOP PRICE */}
                  <div className="hidden md:block">

                    <p className="text-xs font-semibold text-gray-900">
                      ₹{product.payable_price}
                    </p>

                    {product.discount > 0 && (
                      <div className="flex items-center gap-1.5">

                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{product.price}
                        </span>

                        <span className="text-[9px] font-medium text-green-600">
                          {product.discount}% OFF
                        </span>

                      </div>
                    )}

                  </div>


                  {/* DESKTOP STOCK */}
                  <div className="hidden md:block">

                    <span
                      className={`text-xs font-semibold ${
                        product.stock_quantity <= 0
                          ? "text-red-600"
                          : product.stock_quantity <= 5
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock_quantity}
                    </span>

                  </div>


                  {/* DESKTOP CATEGORY */}
                  <div className="hidden md:block">

                    <span className="rounded-md bg-gray-100 px-2 py-1 text-[9px] font-medium text-gray-600">
                      {product.product_category ||
                        product.category ||
                        "-"}
                    </span>

                  </div>


                  {/* ACTIONS */}
                  <div className="mt-3 flex items-center justify-end gap-2 md:mt-0">

                    <Link
                      href={`/dashboard/products/${product.id}/edit`}
                      className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium text-gray-700 transition hover:bg-gray-100 sm:text-xs"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      disabled={isDeleting}
                      className="rounded-md bg-red-50 px-2.5 py-1.5 text-[10px] font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
                    >
                      {isDeleting
                        ? "Deleting..."
                        : "Delete"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

    </main>
  );
}