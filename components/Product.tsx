
import Link from "next/link";

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

function Product({ product }: { product: ProductType }) {
    const productImage =
        product.images && product.images.length > 0
            ? product.images[0]
            : "/placeholder.png";

    return (
        <div
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            {/* IMAGE */}
            <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={productImage}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* DISCOUNT */}
                    {product.discount > 0 && (
                        <div className="absolute left-2 top-2 rounded-full bg-black px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs">
                            -{product.discount}%
                        </div>
                    )}

                    {/* CATEGORY */}
                    {product.category && (
                        <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-[9px] font-semibold uppercase text-gray-700 shadow-sm sm:right-3 sm:top-3 sm:text-[10px]">
                            {product.category}
                        </div>
                    )}
                </div>
            </Link>

            {/* CONTENT */}
            <div className="p-3 sm:p-4">

                {/* BRAND */}
                {product.brand && (
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-gray-400 sm:text-[10px]">
                        {product.brand}
                    </p>
                )}

                {/* NAME */}
                <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                    {product.name}
                </h3>

                {/* PRODUCT CATEGORY */}
                {product.product_category && (
                    <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                        {product.product_category}
                    </p>
                )}

                {/* DESCRIPTION */}
                {product.description && (
                    <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-gray-500 sm:block">
                        {product.description}
                    </p>
                )}

                {/* COLORS */}
                {product.colors && product.colors.length > 0 && (
                    <div className="mt-3">
                        <p className="mb-1 text-[9px] font-semibold uppercase text-gray-400">
                            Colors
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {product.colors.map((color) => (
                                <span
                                    key={color}
                                    className="rounded-full border border-gray-200 px-2 py-1 text-[9px] capitalize text-gray-600"
                                >
                                    {color}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* SIZES */}
                {product.sizes && product.sizes.length > 0 && (
                    <div className="mt-3">
                        <p className="mb-1 text-[9px] font-semibold uppercase text-gray-400">
                            Sizes
                        </p>

                        <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size) => (
                                <span
                                    key={size}
                                    className="flex h-6 min-w-6 items-center justify-center rounded border border-gray-200 px-1 text-[9px] text-gray-600"
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* PRICE + STOCK */}
                <div className="mt-4 border-t border-gray-100 pt-3">
                    <div className="flex items-end justify-between gap-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-gray-900 sm:text-xl">
                                    ${product.payable_price}
                                </span>

                                {product.discount > 0 && (
                                    <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                                        ${product.price}
                                    </span>
                                )}
                            </div>

                            <p className="mt-1 text-[9px] text-green-600 sm:text-[10px]">
                                {product.stock_quantity > 0
                                    ? `${product.stock_quantity} in stock`
                                    : "Out of stock"}
                            </p>
                        </div>

                        {/* WHATSAPP */}
                        <button
                            disabled={product.stock_quantity <= 0}
                            onClick={() => {
                                const productUrl = `${window.location.origin}/product/${product.id}`;

                                const message = `
Hello Rahul, I am Looking for the below product for buy:

Product: ${product.name}
Brand: ${product.brand || "N/A"}
Price: $${product.payable_price}

🔗 Product Link:
${productUrl}

Kindly Respond me with stock availability
                                `.trim();

                                const whatsappUrl =
                                    `https://wa.me/917318092275?text=${encodeURIComponent(
                                        message
                                    )}`;

                                window.open(
                                    whatsappUrl,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                            className="flex items-center justify-center gap-1.5 rounded-xl bg-green-600 px-3 py-2.5 text-[6px] font-semibold text-white transition hover:bg-green-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:px-4 sm:text-xs"
                        >
                            Chat on WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;

