import React, { useEffect } from 'react'
import Hero from './../components/Hero'
import Grid from './../components/Grid'
import productsFace from './../data'
import packs from './../datapacks'

function Home() {
  return (
    <div className="m-7">
      <div className="bg-white rounded-[100px]  md:w-[80%] mx-auto mb-4">
        <Hero />
      </div>
      <div className="mt-8">
        <h1 className="text-center font-bold text-4xl tracking-widest capitalize mt-5">
          legeneds never die
        </h1>
        <Grid products={productsFace} />
        <h1 className="text-center font-bold text-4xl tracking-widest capitalize mt-5">
          packs of legends
        </h1>

        <Grid products={packs} />
      </div>
    </div>
  )
}

export default Home
