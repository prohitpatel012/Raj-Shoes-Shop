"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

type ImageItem = {
  type: "url" | "upload";
  value: string;
  preview?: string;
};

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    sku: "",
    brand: "",
    stockQuantity: "",
    category: "",
    productCategory: "",
  });

  const [images, setImages] = useState<ImageItem[]>([]);

  const [sizes, setSizes] = useState<string[]>([""]);
  const [colors, setColors] = useState<string[]>([""]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ----------------------------------------
  // FORM CHANGE
  // ----------------------------------------

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------
  // CALCULATE PAYABLE PRICE
  // ----------------------------------------

  const price = Number(formData.price) || 0;
  const discount = Number(formData.discount) || 0;

  const payablePrice =
    price - (price * discount) / 100;

  // ----------------------------------------
  // ADD URL IMAGE
  // ----------------------------------------

  const addImageUrl = () => {
    setImages((prev) => [
      ...prev,
      {
        type: "url",
        value: "",
      },
    ]);
  };

  // ----------------------------------------
  // REMOVE IMAGE
  // ----------------------------------------

  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ----------------------------------------
  // UPDATE IMAGE URL
  // ----------------------------------------

  const updateImageUrl = (
    index: number,
    value: string
  ) => {
    setImages((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        value,
        type: "url",
      };

      return updated;
    });
  };

  // ----------------------------------------
  // UPLOAD FILES TO SUPABASE
  // ----------------------------------------

  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploading(true);

    try {
      const uploadedImages: ImageItem[] = [];

      for (const file of Array.from(files)) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch(
          "/api/products/upload-image",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Image upload failed"
          );
        }

        uploadedImages.push({
          type: "upload",
          value: result.url,
          preview: result.url,
        });
      }

      setImages((prev) => [
        ...prev,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );
    } finally {
      setUploading(false);

      // Allow selecting the same file again
      e.target.value = "";
    }
  };

  // ----------------------------------------
  // ARRAY FIELDS
  // ----------------------------------------

  const addSize = () => {
    setSizes((prev) => [...prev, ""]);
  };

  const removeSize = (index: number) => {
    setSizes((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateSize = (
    index: number,
    value: string
  ) => {
    setSizes((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const addColor = () => {
    setColors((prev) => [...prev, ""]);
  };

  const removeColor = (index: number) => {
    setColors((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateColor = (
    index: number,
    value: string
  ) => {
    setColors((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  // ----------------------------------------
  // CREATE PRODUCT
  // ----------------------------------------

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!formData.price) {
      alert("Product price is required");
      return;
    }

    if (!formData.sku.trim()) {
      alert("SKU is required");
      return;
    }

    setLoading(true);

    try {
      const product = {
        name: formData.name.trim(),

        description:
          formData.description.trim(),

        price,

        discount,

        payable_price: payablePrice,

        sku: formData.sku.trim(),

        images: images
          .map((image) => image.value)
          .filter(Boolean),

        brand: formData.brand.trim(),

        stock_quantity:
          Number(formData.stockQuantity) || 0,

        sizes: sizes
          .filter(Boolean)
          .map(Number),

        colors: colors
          .map((color) => color.trim())
          .filter(Boolean),

        category: formData.category,

        product_category:
          formData.productCategory,
      };

      const response = await fetch(
        "/api/products",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(product),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Failed to create product"
        );
      }

      alert("Product created successfully!");

      // Reset form

      setFormData({
        name: "",
        description: "",
        price: "",
        discount: "",
        sku: "",
        brand: "",
        stockQuantity: "",
        category: "",
        productCategory: "",
      });

      setImages([]);
      setSizes([""]);
      setColors([""]);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-5 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-6 sm:mb-8">

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
            Admin Panel
          </p>

          <h1 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Create Product
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Add a new product to your store.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-5 lg:grid-cols-3">

            {/* LEFT */}

            <div className="space-y-5 lg:col-span-2">

              {/* BASIC INFORMATION */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Basic Information
                </h2>

                <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                  Product name and description.
                </p>

                <div className="mt-5 space-y-4">

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Product Name
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Rokcet Running Shoes"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your product..."
                      className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                </div>

              </section>

              {/* PRICING */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Pricing
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="325"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Discount %
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="20"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Payable Price
                    </label>

                    <div className="rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 sm:text-sm">
                      ₹{payablePrice.toFixed(2)}
                    </div>
                  </div>

                </div>

              </section>

              {/* INVENTORY */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Inventory
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      SKU
                    </label>

                    <input
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="rck-001"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs uppercase outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Stock Quantity
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="stockQuantity"
                      value={formData.stockQuantity}
                      onChange={handleChange}
                      placeholder="12"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                </div>

              </section>

              {/* IMAGES */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                      Product Images
                    </h2>

                    <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                      Upload images or paste image URLs.
                    </p>
                  </div>

                </div>

                {/* UPLOAD */}

                <div className="mt-5">

                  <label
                    htmlFor="image-upload"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-4 py-8 text-center transition hover:border-slate-400 hover:bg-slate-50"
                  >

                    <div className="text-2xl">
                      📷
                    </div>

                    <p className="mt-2 text-xs font-semibold text-slate-700 sm:text-sm">
                      {uploading
                        ? "Uploading..."
                        : "Choose product images"}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                      PNG, JPG, WEBP up to 5MB
                    </p>

                  </label>

                  <input
                    id="image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                </div>

                {/* URL */}

                <div className="mt-5">

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-xs font-semibold text-slate-700 sm:text-sm">
                      Image URLs
                    </label>

                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="text-xs font-semibold text-slate-900 hover:underline"
                    >
                      + Add URL
                    </button>

                  </div>

                  <div className="space-y-2">

                    {images
                      .map((image, index) => ({
                        image,
                        index,
                      }))
                      .filter(
                        ({ image }) =>
                          image.type === "url"
                      )
                      .map(({ image, index }) => (

                        <div
                          key={index}
                          className="flex gap-2"
                        >

                          <input
                            type="url"
                            value={image.value}
                            onChange={(e) =>
                              updateImageUrl(
                                index,
                                e.target.value
                              )
                            }
                            placeholder="https://example.com/shoe.jpg"
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeImage(index)
                            }
                            className="rounded-xl px-3 text-xs text-red-500 hover:bg-red-50"
                          >
                            ×
                          </button>

                        </div>

                      ))}

                  </div>

                </div>

                {/* IMAGE PREVIEW */}

                {images.length > 0 && (

                  <div className="mt-5">

                    <p className="mb-3 text-xs font-semibold text-slate-700">
                      Selected Images
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                      {images.map((image, index) => (

                        image.value && (

                          <div
                            key={index}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                          >

                            <Image
                              src={image.value}
                              alt={`Product image ${index + 1}`}
                              fill
                              unoptimized
                              className="object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeImage(index)
                              }
                              className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                            >
                              ×
                            </button>

                          </div>

                        )

                      ))}

                    </div>

                  </div>

                )}

              </section>

            </div>

            {/* RIGHT */}

            <div className="space-y-5">

              {/* ORGANIZATION */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                  Organization
                </h2>

                <div className="mt-5 space-y-4">

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Brand
                    </label>

                    <input
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Raj Shoes"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Category
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    >
                      <option value="">
                        Select category
                      </option>

                      <option value="mens">
                        Mens
                      </option>

                      <option value="womens">
                        Womens
                      </option>

                      <option value="kids">
                        Kids
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm">
                      Product Category
                    </label>

                    <select
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-slate-900 sm:text-sm"
                    >
                      <option value="">
                        Select product type
                      </option>

                      <option value="Shoes">
                        Shoes
                      </option>

                      <option value="Sandals">
                        Sandals
                      </option>

                      <option value="Slippers">
                        Slippers
                      </option>

                      <option value="Boots">
                        Boots
                      </option>
                    </select>
                  </div>

                </div>

              </section>

              {/* SIZES */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                    Sizes
                  </h2>

                  <button
                    type="button"
                    onClick={addSize}
                    className="text-xs font-semibold text-slate-900 hover:underline"
                  >
                    + Add
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {sizes.map((size, index) => (

                    <div
                      key={index}
                      className="flex gap-2"
                    >

                      <input
                        type="number"
                        value={size}
                        onChange={(e) =>
                          updateSize(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="8"
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-900"
                      />

                      {sizes.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeSize(index)
                          }
                          className="px-2 text-xs text-red-500"
                        >
                          ×
                        </button>

                      )}

                    </div>

                  ))}

                </div>

              </section>

              {/* COLORS */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="flex items-center justify-between">

                  <h2 className="text-sm font-bold text-slate-900 sm:text-base">
                    Colors
                  </h2>

                  <button
                    type="button"
                    onClick={addColor}
                    className="text-xs font-semibold text-slate-900 hover:underline"
                  >
                    + Add
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {colors.map((color, index) => (

                    <div
                      key={index}
                      className="flex gap-2"
                    >

                      <input
                        type="text"
                        value={color}
                        onChange={(e) =>
                          updateColor(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Black"
                        className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-slate-900"
                      />

                      {colors.length > 1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeColor(index)
                          }
                          className="px-2 text-xs text-red-500"
                        >
                          ×
                        </button>

                      )}

                    </div>

                  ))}

                </div>

              </section>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">

            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || uploading}
              className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              {loading
                ? "Creating..."
                : "Create Product"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}