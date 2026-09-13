
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiShoppingBasket } from "react-icons/ci";

function Header() {
  return (
    <header className="w-full border-b border-gray-100 bg-white">
      {/* ================= TOP HEADER ================= */}
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 md:px-8 lg:px-10 xl:px-14 2xl:px-16">
        <div className="flex min-h-[64px] items-center justify-between gap-4 py-2 sm:min-h-[72px]">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <img
              src="/logo.png"
              alt="Raj Shoes Shop"
              className="h-9 w-auto max-w-[110px] rounded-md object-contain sm:h-10 sm:max-w-[130px] md:h-11 md:max-w-[145px]"
            />

            <p className="hidden whitespace-nowrap text-sm font-bold text-red-500 sm:block md:text-base lg:text-lg">
              Raj Shoes Shop
            </p>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100 sm:h-11 sm:w-11"
          >
            <CiShoppingBasket className="h-7 w-7 text-gray-800 sm:h-8 sm:w-8" />
          </Link>
        </div>
      </div>

      {/* ================= CATEGORY NAVIGATION ================= */}
      <div className="w-full border-t border-gray-50">
        <nav
          className="
            mx-auto
            flex
            w-full
            max-w-[1600px]
            items-center
            justify-start
            gap-5
            overflow-x-auto
            px-3
            py-3
            sm:justify-center
            sm:gap-7
            sm:px-5
            md:gap-9
            md:px-8
            lg:gap-12
            lg:px-10
            xl:px-14
            2xl:px-16
            [&::-webkit-scrollbar]:hidden
          "
        >
          {/* MEN */}
          <Link
            href="/mens-fashion"
            className="
              group
              flex
              shrink-0
              flex-col
              items-center
              gap-1.5
              text-gray-600
              transition-colors
              hover:text-black
            "
          >
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60"
              alt="Mens Fashion"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-1
                ring-gray-100
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:ring-gray-300
                sm:h-12
                sm:w-12
                md:h-14
                md:w-14
              "
            />

            <p className="whitespace-nowrap text-[10px] font-medium sm:text-xs">
              Mens Fashion
            </p>
          </Link>

          {/* WOMEN */}
          <Link
            href="/womens-fashion"
            className="
              group
              flex
              shrink-0
              flex-col
              items-center
              gap-1.5
              text-gray-600
              transition-colors
              hover:text-black
            "
          >
            <img
              src="https://media.istockphoto.com/id/618432992/photo/woman-enjoying-the-weekend-in-the-shopping-mall.webp?a=1&b=1&s=612x612&w=0&k=20&c=7QfjvN8ZUrxnJagqOBzyac5K852d0J-KE7H6nQ_SQ9c="
              alt="Womens Fashion"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-1
                ring-gray-100
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:ring-gray-300
                sm:h-12
                sm:w-12
                md:h-14
                md:w-14
              "
            />

            <p className="whitespace-nowrap text-[10px] font-medium sm:text-xs">
              Womens Fashion
            </p>
          </Link>

          {/* CHILDREN */}
          <Link
            href="/children-fashion"
            className="
              group
              flex
              shrink-0
              flex-col
              items-center
              gap-1.5
              text-gray-600
              transition-colors
              hover:text-black
            "
          >
            <img
              src="https://images.unsplash.com/photo-1758782213532-bbb5fd89885e?w=500&auto=format&fit=crop&q=60"
              alt="Children Fashion"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-1
                ring-gray-100
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:ring-gray-300
                sm:h-12
                sm:w-12
                md:h-14
                md:w-14
              "
            />

            <p className="whitespace-nowrap text-[10px] font-medium sm:text-xs">
              Children Fashions
            </p>
          </Link>

          {/* LATEST */}
          <Link
            href="/latest-fashion"
            className="
              group
              flex
              shrink-0
              flex-col
              items-center
              gap-1.5
              text-gray-600
              transition-colors
              hover:text-black
            "
          >
            <img
              src="https://media.istockphoto.com/id/2167506336/photo/photo-of-pretty-nice-cute-charming-woman-wearing-modern-cloth-isolated-over-purple-color.webp?a=1&b=1&s=612x612&w=0&k=20&c=WalGv2oob8uM9f3VppPXHO71QzoHBgGC1R4IPW7tmH8="
              alt="Latest Fashion"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                ring-1
                ring-gray-100
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:ring-gray-300
                sm:h-12
                sm:w-12
                md:h-14
                md:w-14
              "
            />

            <p className="whitespace-nowrap text-[10px] font-medium sm:text-xs">
              Latest Fashion
            </p>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
