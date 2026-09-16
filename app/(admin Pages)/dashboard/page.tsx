
import Link from "next/link";
import React from "react";

function AdminDashboard() {
  const shoes = [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="p-4 sm:p-6">
      
<Link
  href="/"
  className="mb-6 inline-block text-xl font-extrabold tracking-tight text-gray-900 transition hover:text-gray-600 sm:text-2xl"
>
  <span className="text-gray-900">RAJ</span>{" "}
  <span className="font-medium text-gray-500">SHOES SHOP</span>
</Link>


      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shoes.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl bg-gray-100"
          >
            <img
              src={image}
              alt={`Shoe ${index + 1}`}
              className="h-48 w-full object-cover transition duration-300 hover:scale-105 sm:h-56"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
