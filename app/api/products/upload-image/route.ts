import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(
  request: Request
) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No image file provided",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Validate file type
    // --------------------------------

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Only JPG, PNG and WEBP images are allowed",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Validate file size
    // --------------------------------

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error:
            "Image size must be less than 5MB",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------
    // Create unique filename
    // --------------------------------

    const extension =
      file.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const filePath =
      `products/${fileName}`;

    // --------------------------------
    // Convert File → ArrayBuffer
    // --------------------------------

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      new Uint8Array(arrayBuffer);

    // --------------------------------
    // Upload to Supabase Storage
    // --------------------------------

    const { error } =
      await supabase.storage
        .from("product-images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

    if (error) {
      console.error(
        "Supabase upload error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Failed to upload image",
        },
        {
          status: 500,
        }
      );
    }

    // --------------------------------
    // Get public URL
    // --------------------------------

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}