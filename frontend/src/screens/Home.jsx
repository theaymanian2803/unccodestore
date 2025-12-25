import React from 'react'
import Hero from './../components/Hero'
import Grid from './../components/Grid'
import { useGetProductsForHomeQuery } from './../slices/productSlice'

function Home() {
  const { data: products, isLoading, error } = useGetProductsForHomeQuery()

  if (isLoading) {
    return <div className="text-white p-10">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 p-10">Error: {error.message}</div>
  }

  const BasketBall = products?.filter((item) => item.category?.toLowerCase() === 'basketball')
  const legendsCat = products?.filter((item) => item.category?.toLowerCase() === 'legends')

  return (
    /* md:m-7 ensures margins only appear on desktop */
    <div className="md:m-7">
      {/* rounded-none: removes mobile roundness
          md:rounded-[100px]: adds roundness back on desktop
          w-full md:w-[80%]: makes it full width on mobile, centered on desktop 
      */}
      <div className="bg-white rounded-none md:rounded-[100px] w-full md:w-[80%] mx-auto mb-4 overflow-hidden">
        <Hero />
      </div>

      <div className="mt-8 px-4 md:px-0">
        <h1 className="text-center font-bold text-3xl md:text-4xl tracking-widest capitalize mt-5 text-white">
          legends never die
        </h1>
        <Grid products={legendsCat} />

        <h1 className="text-center font-bold text-3xl md:text-4xl tracking-widest capitalize mt-10 text-white">
          BASKETBALL LAB LEGENDS
        </h1>
        <Grid products={BasketBall} />
      </div>
    </div>
  )
}

export default Home
