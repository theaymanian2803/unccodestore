import React, { useState } from 'react'
import Grid from './../components/Grid'
import { useGetProductsQuery } from './../slices/productSlice'

function Store() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const [selectedCategory, setSelectedCategory] = useState('All')

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl font-bold">
        Loading...
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>
  }

  const categories = ['All', ...new Set(products?.map((item) => item.category))]
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products?.filter((item) => item.category === selectedCategory)

  return (
    <div className="p-4 md:m-7">
      {/* Decorative Header Bar */}
      <div className="bg-white rounded-[100px] md:w-[80%] mx-auto mb-4 h-2 shadow-sm"></div>

      {/* Main Container: Stacked on mobile, side-by-side on md screens and up */}
      <div className="mt-8 flex flex-col md:flex-row gap-8 min-h-screen">
        {/* Sidebar: Categories */}
        <aside className="w-full md:w-1/4 lg:w-1/5 h-fit p-6 border border-gray-800 shadow-2xl shadow-amber-50/10 rounded-xl bg-gray-900/30">
          <h1 className="text-xl md:text-2xl font-bold mb-6 tracking-widest text-white uppercase">
            Categories
          </h1>

          {/* Flexbox for categories: Vertical on desktop, Wrap/Horizontal on small mobile if desired */}
          <div className="flex flex-col gap-4">
            {categories?.map((category, index) => (
              <button
                key={index}
                // 4. Update the state on click
                onClick={() => setSelectedCategory(category)}
                className={`w-full p-3 text-lg font-semibold rounded-lg cursor-pointer hover:scale-105 transition-all duration-200 
                  ${
                    selectedCategory === category
                      ? 'bg-white text-gray-900' // Style for active category
                      : 'bg-amber-300 text-gray-900 hover:bg-amber-400'
                  }`}>
                {category}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content: Product Grid */}
        <main className="flex-1">
          <Grid products={filteredProducts} />
        </main>
      </div>
    </div>
  )
}

export default Store
