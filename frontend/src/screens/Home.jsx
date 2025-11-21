import React, { useEffect, useState } from 'react'
import Hero from './../components/Hero'
import Grid from './../components/Grid'

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
        <Grid />
      </div>
    </div>
  )
}

export default Home
