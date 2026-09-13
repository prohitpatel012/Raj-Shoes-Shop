
"use client";

import { products } from "@/data/products";
import { use } from "react";

export default function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  // Find single product by ID
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  // Product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The product you are looking for does not exist or may have been
            removed.
          </p>
        </div>
      </main>
    );
  }

  const stock = Number(product["Stock Quantity"] || 0);
  const payablePrice = product["payable price"];
  const originalPrice = product.price;

  const handleWhatsApp = () => {
    const productUrl = `${window.location.origin}/products/${product.id}`;

    const message = `
Hi, I'm interested in this product:

🛍️ Product: ${product.name}
🏷️ Brand: ${product.Brand || "N/A"}
💰 Price: $${payablePrice}
📦 SKU: ${product.sku || "N/A"}

🔗 Product Link:
${productUrl}

Is this product available?
    `.trim();

    const whatsappUrl = `https://wa.me/917318092275?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-gray-500 sm:text-sm">
          Home / Products /{" "}
          <span className="font-medium text-gray-900">
            {product.name}
          </span>
        </div>

        {/* PRODUCT */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="relative bg-gray-100">

              {product.discount && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                  -{product.discount}
                </div>
              )}

              <div className="flex min-h-[400px] items-center justify-center sm:min-h-[550px] lg:min-h-[650px]">
                <img
                  src={product.images || "/placeholder.png"}
                  alt={product.name || "Product image"}
                  className="h-full max-h-[650px] w-full object-contain p-6 sm:p-10"
                />
              </div>
            </div>

            {/* ================= DETAILS ================= */}
            <div className="flex flex-col p-5 sm:p-8 lg:p-12">

              {/* Brand */}
              {product.Brand && (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                  {product.Brand}
                </p>
              )}

              {/* Product Name */}
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>

              {/* Category */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.category_category && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-600">
                    {product.category_category}
                  </span>
                )}

                {product.product_category && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {product.product_category}
                  </span>
                )}
              </div>

              {/* Rating placeholder */}
              <div className="mt-5 flex items-center gap-2">
                <span className="text-sm text-yellow-500">
                  ★★★★★
                </span>

                <span className="text-xs text-gray-400">
                  Product
                </span>
              </div>

              {/* ================= PRICE ================= */}
              <div className="mt-7 border-y border-gray-100 py-6">
                <div className="flex flex-wrap items-center gap-3">

                  <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    ${payablePrice}
                  </span>

                  {originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                  )}

                  {product.discount && (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                      {product.discount} OFF
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Final payable price
                </p>
              </div>

              {/* ================= DESCRIPTION ================= */}
              {product.descritpion && (
                <div className="mt-7">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Description
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {product.descritpion}
                  </p>
                </div>
              )}

              {/* ================= COLORS ================= */}
              {product.color?.length > 0 && (
                <div className="mt-7">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Available Colors
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.color.map((color: string) => (
                      <span
                        key={color}
                        className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs capitalize text-gray-700"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= SIZES ================= */}
              {product["Size in number"]?.length > 0 && (
                <div className="mt-7">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                    Available Sizes
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {product["Size in number"].map((size: number) => (
                      <span
                        key={size}
                        className="flex h-10 min-w-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ================= STOCK ================= */}
              <div className="mt-7 rounded-2xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-600">
                    Availability
                  </span>

                  {stock > 0 ? (
                    <span className="font-semibold text-green-600">
                      In Stock
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Out of Stock
                    </span>
                  )}

                </div>

                {stock > 0 && (
                  <p className="mt-1 text-xs text-gray-400">
                    {stock} units available
                  </p>
                )}
              </div>

              {/* ================= WHATSAPP ================= */}
              <button
                disabled={stock <= 0}
                onClick={handleWhatsApp}
                className="mt-7 w-full rounded-2xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                {stock > 0
                  ? "Chat on WhatsApp"
                  : "Currently Unavailable"}
              </button>

              {/* ================= PRODUCT INFO ================= */}
              <div className="mt-8 border-t border-gray-100 pt-6">

                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  Product Information
                </h2>

                <div className="mt-4 divide-y divide-gray-100">

                  {product.sku && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">
                        SKU
                      </span>

                      <span className="font-medium text-gray-900">
                        {product.sku}
                      </span>
                    </div>
                  )}

                  {product.Brand && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">
                        Brand
                      </span>

                      <span className="font-medium text-gray-900">
                        {product.Brand}
                      </span>
                    </div>
                  )}

                  {product.category_category && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">
                        Category
                      </span>

                      <span className="font-medium text-gray-900">
                        {product.category_category}
                      </span>
                    </div>
                  )}

                  {product.product_category && (
                    <div className="flex justify-between py-3 text-sm">
                      <span className="text-gray-500">
                        Product Type
                      </span>

                      <span className="font-medium text-gray-900">
                        {product.product_category}
                      </span>
                    </div>
                  )}

                </div>
              </div>

              {/* ================= CONTACT ================= */}
              <div className="mt-6 rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-400">
                  Have questions about this product?
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Chat with us on WhatsApp
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  We can help with availability, sizes, colors and
                  ordering.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

