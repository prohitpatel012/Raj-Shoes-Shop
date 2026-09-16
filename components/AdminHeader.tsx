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
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXMlMjBwcm9kdWN0fGVufDB8fDB8fHww"
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
              src="https://images.unsplash.com/photo-1702423673689-3f73c388a90a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0ZWdvcmllc3xlbnwwfHwwfHx8MA%3D%3D"
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
              src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlcG9ydHxlbnwwfHwwfHx8MA%3D%3D"
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