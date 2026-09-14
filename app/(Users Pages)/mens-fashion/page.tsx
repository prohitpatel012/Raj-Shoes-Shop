'use client'

import Product from "@/components/Product";
import { products } from "@/data/products"
import Link from "next/link";

function MensFashion() {

    const mensProducts = products.filter((product) => product.category_category == 'mens')


  return (
    <div className="lg:mx-15 mx-2 my-6">

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                {mensProducts.map((product) => (
                    <Product key={product.id} product={product}/>
                ))}
            </div>


    </div>
  )
}

export default MensFashion