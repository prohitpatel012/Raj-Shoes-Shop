"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type ImageItem = {
  type: "url" | "upload";
  value: string;
};

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
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
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
  const [sizes, setSizes] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  // -----------------------------
  // FETCH PRODUCT
  // -----------------------------

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/products/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Product not found");
        }

        const product: Product = data.product;

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: String(product.price ?? ""),
          discount: String(product.discount ?? ""),
          sku: product.sku || "",
          brand: product.brand || "",
          stockQuantity: String(product.stock_quantity ?? ""),
          category: product.category || "",
          productCategory: product.product_category || "",
        });

        setImages(
          (product.images || []).map((image) => ({
            type: "url",
            value: image,
          }))
        );

        setSizes(product.sizes || []);
        setColors(product.colors || []);

      } catch (error) {
        console.error(error);

        alert(
          error instanceof Error
            ? error.message
            : "Failed to load product"
        );

        router.push("/admin/products");

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);


  // -----------------------------
  // FORM CHANGE
  // -----------------------------

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // -----------------------------
  // PAYABLE PRICE
  // -----------------------------

  const price = Number(form.price) || 0;
  const discount = Number(form.discount) || 0;

  const payablePrice =
    price - (price * discount) / 100;


  // -----------------------------
  // IMAGE URL
  // -----------------------------

  const addImageUrl = () => {
    setImages((prev) => [
      ...prev,
      {
        type: "url",
        value: "",
      },
    ]);
  };


  const updateImageUrl = (
    index: number,
    value: string
  ) => {
    setImages((prev) =>
      prev.map((image, i) =>
        i === index
          ? {
              ...image,
              value,
            }
          : image
      )
    );
  };


  const removeImage = (index: number) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };


  // -----------------------------
  // IMAGE UPLOAD
  // -----------------------------

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    try {
      setUploading(true);

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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Image upload failed"
          );
        }

        uploadedImages.push({
          type: "upload",
          value: data.url,
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

      e.target.value = "";
    }
  };


  // -----------------------------
  // SIZE
  // -----------------------------

  const addSize = () => {
    const size = Number(newSize);

    if (!size) return;

    if (sizes.includes(size)) {
      setNewSize("");
      return;
    }

    setSizes((prev) => [...prev, size]);

    setNewSize("");
  };


  const removeSize = (size: number) => {
    setSizes((prev) =>
      prev.filter((item) => item !== size)
    );
  };


  // -----------------------------
  // COLOR
  // -----------------------------

  const addColor = () => {
    const color = newColor.trim();

    if (!color) return;

    if (
      colors.some(
        (item) =>
          item.toLowerCase() === color.toLowerCase()
      )
    ) {
      setNewColor("");
      return;
    }

    setColors((prev) => [...prev, color]);

    setNewColor("");
  };


  const removeColor = (color: string) => {
    setColors((prev) =>
      prev.filter((item) => item !== color)
    );
  };


  // -----------------------------
  // UPDATE PRODUCT
  // -----------------------------

  const handleSubmit = async () => {

    if (!form.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Valid price is required");
      return;
    }

    if (!form.sku.trim()) {
      alert("SKU is required");
      return;
    }

    const validImages = images
      .map((image) => image.value.trim())
      .filter(Boolean);

    try {

      setSaving(true);

      const response = await fetch(
        `/api/products/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim(),

            price: Number(form.price),

            discount: Number(form.discount || 0),

            payablePrice: Number(
              payablePrice.toFixed(2)
            ),

            sku: form.sku.trim(),

            images: validImages,

            brand: form.brand.trim(),

            stockQuantity: Number(
              form.stockQuantity || 0
            ),

            sizes,

            colors,

            category: form.category.trim(),

            productCategory:
              form.productCategory.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Update failed"
        );
      }

      alert("Product updated successfully");

      router.push("/admin/products");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update product"
      );

    } finally {
      setSaving(false);
    }
  };


  // -----------------------------
  // LOADING
  // -----------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

          <p className="text-xs text-gray-500 sm:text-sm">
            Loading product...
          </p>

        </div>

      </div>
    );
  }


  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-5 sm:px-5 sm:py-7 lg:px-8">

      {/* HEADER */}

      <div className="mx-auto mb-5 max-w-5xl">

        <Link
          href="/admin/products"
          className="text-[10px] font-medium text-gray-500 hover:text-black sm:text-xs"
        >
          ← Back to Products
        </Link>

        <div className="mt-3">

          <h1 className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
            Edit Product
          </h1>

          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
            Update your product information
          </p>

        </div>

      </div>


      {/* FORM */}

      <div className="mx-auto max-w-5xl space-y-4">


        {/* BASIC INFORMATION */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <div className="mb-4">

            <h2 className="text-xs font-semibold text-gray-900 sm:text-sm">
              Basic Information
            </h2>

            <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
              Main product details
            </p>

          </div>


          <div className="space-y-4">

            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Product Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none transition focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter product description"
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none transition focus:border-black sm:text-sm"
              />

            </div>

          </div>

        </section>


        {/* PRICING */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <div className="mb-4">

            <h2 className="text-xs font-semibold text-gray-900 sm:text-sm">
              Pricing
            </h2>

          </div>


          <div className="grid gap-4 sm:grid-cols-3">

            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Discount %
              </label>

              <input
                name="discount"
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Payable Price
              </label>

              <div className="flex h-[34px] items-center rounded-lg bg-gray-100 px-3 text-xs font-semibold text-gray-900 sm:h-[38px] sm:text-sm">
                ₹{payablePrice.toFixed(2)}
              </div>

            </div>

          </div>

        </section>


        {/* INVENTORY */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <h2 className="mb-4 text-xs font-semibold text-gray-900 sm:text-sm">
            Inventory
          </h2>


          <div className="grid gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                SKU
              </label>

              <input
                name="sku"
                value={form.sku}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Stock Quantity
              </label>

              <input
                name="stockQuantity"
                type="number"
                min="0"
                value={form.stockQuantity}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>

          </div>

        </section>


        {/* IMAGES */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <div className="mb-4 flex items-center justify-between gap-3">

            <div>

              <h2 className="text-xs font-semibold text-gray-900 sm:text-sm">
                Product Images
              </h2>

              <p className="mt-0.5 text-[9px] text-gray-400 sm:text-[10px]">
                Add image URLs or upload new images
              </p>

            </div>

            <button
              type="button"
              onClick={addImageUrl}
              className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-[10px] font-medium hover:bg-gray-50 sm:text-xs"
            >
              + Add URL
            </button>

          </div>


          <div className="space-y-3">

            {images.map((image, index) => (

              <div
                key={`${index}-${image.value}`}
                className="flex gap-2"
              >

                <input
                  value={image.value}
                  onChange={(e) =>
                    updateImageUrl(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="https://example.com/image.jpg"
                  className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-[10px] outline-none focus:border-black sm:text-xs"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeImage(index)
                  }
                  className="rounded-lg bg-red-50 px-3 text-[10px] font-medium text-red-600 hover:bg-red-100 sm:text-xs"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>


          {/* UPLOAD */}

          <div className="mt-4">

            <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 px-4 py-4 text-center transition hover:border-black hover:bg-gray-50">

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              <div>

                <p className="text-[10px] font-medium text-gray-700 sm:text-xs">
                  {uploading
                    ? "Uploading..."
                    : "Click to upload images"}
                </p>

                <p className="mt-1 text-[9px] text-gray-400">
                  JPG, PNG or WEBP • Max 5MB
                </p>

              </div>

            </label>

          </div>


          {/* PREVIEW */}

          {images.some((image) => image.value) && (

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">

              {images
                .filter((image) => image.value)
                .map((image, index) => (

                  <div
                    key={`${image.value}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >

                    <Image
                      src={image.value}
                      alt={`Product ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                      unoptimized
                    />

                  </div>

                ))}

            </div>

          )}

        </section>


        {/* ORGANIZATION */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <h2 className="mb-4 text-xs font-semibold text-gray-900 sm:text-sm">
            Organization
          </h2>


          <div className="grid gap-4 sm:grid-cols-3">

            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Brand
              </label>

              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>


            <div>

              <label className="mb-1 block text-[10px] font-medium text-gray-700 sm:text-xs">
                Product Category
              </label>

              <input
                name="productCategory"
                value={form.productCategory}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:text-sm"
              />

            </div>

          </div>

        </section>


        {/* SIZES */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <h2 className="mb-4 text-xs font-semibold text-gray-900 sm:text-sm">
            Sizes
          </h2>


          <div className="flex gap-2">

            <input
              type="number"
              value={newSize}
              onChange={(e) =>
                setNewSize(e.target.value)
              }
              placeholder="Size"
              className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black"
            />

            <button
              type="button"
              onClick={addSize}
              className="rounded-lg bg-black px-3 py-2 text-[10px] font-semibold text-white sm:text-xs"
            >
              Add
            </button>

          </div>


          <div className="mt-3 flex flex-wrap gap-2">

            {sizes.map((size) => (

              <button
                key={size}
                type="button"
                onClick={() => removeSize(size)}
                className="rounded-md bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                {size} ×
              </button>

            ))}

          </div>

        </section>


        {/* COLORS */}

        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 lg:p-6">

          <h2 className="mb-4 text-xs font-semibold text-gray-900 sm:text-sm">
            Colors
          </h2>


          <div className="flex gap-2">

            <input
              value={newColor}
              onChange={(e) =>
                setNewColor(e.target.value)
              }
              placeholder="Color"
              className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black sm:max-w-xs sm:text-sm"
            />

            <button
              type="button"
              onClick={addColor}
              className="rounded-lg bg-black px-3 py-2 text-[10px] font-semibold text-white sm:text-xs"
            >
              Add
            </button>

          </div>


          <div className="mt-3 flex flex-wrap gap-2">

            {colors.map((color) => (

              <button
                key={color}
                type="button"
                onClick={() =>
                  removeColor(color)
                }
                className="rounded-md bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-700 hover:bg-red-50 hover:text-red-600"
              >
                {color} ×
              </button>

            ))}

          </div>

        </section>


        {/* ACTIONS */}

        <div className="flex flex-col-reverse gap-2 pb-6 sm:flex-row sm:justify-end">

          <Link
            href="/admin/products"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </main>
  );
}