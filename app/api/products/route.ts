import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);



// GET PRODUCTS
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);

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
      products: data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}







export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      price,
      discount,
      payable_price,
      sku,
      images,
      brand,
      stock_quantity,
      sizes,
      colors,
      category,
      product_category,
    } = body;

    // --------------------------------
    // Validation
    // --------------------------------

    if (!name) {
      return NextResponse.json(
        {
          error: "Product name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!price) {
      return NextResponse.json(
        {
          error: "Product price is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!sku) {
      return NextResponse.json(
        {
          error: "SKU is required",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Insert
    // --------------------------------

    const { data, error } =
      await supabase
        .from("products")
        .insert({
          name,
          description,
          price,
          discount,
          payable_price,
          sku,
          images,
          brand,
          stock_quantity,
          sizes,
          colors,
          category,
          product_category,
        })
        .select()
        .single();

    if (error) {
      console.error(
        "Product insert error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        product: data,
      },
      {
        status: 201,
      }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}