import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);


// =============================
// GET SINGLE PRODUCT
// =============================

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .limit(1);

    if (error) {
      console.error("GET PRODUCT ERROR:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: data[0],
    });

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}


export async function PUT(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      name,
      description,
      price,
      discount,
      payablePrice,
      sku,
      images,
      brand,
      stockQuantity,
      sizes,
      colors,
      category,
      productCategory,
    } = body;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Product name is required",
        },
        { status: 400 }
      );
    }

    if (!price || Number(price) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid price is required",
        },
        { status: 400 }
      );
    }

    if (!sku?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "SKU is required",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // UPDATE PRODUCT
    // -----------------------------

    const { data, error } = await supabase
      .from("products")
      .update({
        name: name.trim(),

        description:
          description?.trim() || null,

        price: Number(price),

        discount: Number(discount || 0),

        payable_price: Number(
          payablePrice || price
        ),

        sku: sku.trim(),

        images: Array.isArray(images)
          ? images
          : [],

        brand:
          brand?.trim() || null,

        stock_quantity: Number(
          stockQuantity || 0
        ),

        sizes: Array.isArray(sizes)
          ? sizes
          : [],

        colors: Array.isArray(colors)
          ? colors
          : [],

        category:
          category?.trim() || null,

        product_category:
          productCategory?.trim() || null,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select("*");

    // -----------------------------
    // SUPABASE ERROR
    // -----------------------------

    if (error) {
      console.error(
        "SUPABASE UPDATE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // NO ROW UPDATED
    // -----------------------------

    if (!data || data.length === 0) {
      console.error(
        "NO PRODUCT UPDATED. ID:",
        id
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Product was not updated. Check product ID or Supabase RLS update policy.",
        },
        { status: 403 }
      );
    }

    // -----------------------------
    // SUCCESS
    // -----------------------------

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: data[0],
    });

  } catch (error) {
    console.error(
      "PUT PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update product",
      },
      { status: 500 }
    );
  }
}


// =============================
// DELETE PRODUCT
// =============================

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    const { id } = await context.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);


    if (error) {

      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );

    }


    return NextResponse.json({

      success: true,

      message:
        "Product deleted successfully",

    });


  } catch (error) {

    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete product",
      },
      { status: 500 }
    );

  }

}