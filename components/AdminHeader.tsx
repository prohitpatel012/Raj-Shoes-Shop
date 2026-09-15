import Link from 'next/link'
import React from 'react'

function AdminHeader() {
    return (
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
            href="/dashboard/products"
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
              Products
            </p>
          </Link>

          {/* WOMEN */}
          <Link
            href="/dashboard/categories"
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
              Categories
            </p>
          </Link>

          {/* CHILDREN */}
          <Link
            href="/dashboard/Reports"
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
              Reports
            </p>
          </Link>

         
        </nav>
      </div>
    )
}

export default AdminHeader