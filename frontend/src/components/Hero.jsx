import React from 'react'

function Hero() {
  return (
    <div className=" flex justify-evenly px-6 relative">
      <div className="mt-[130px] pt-5 ml-7">
        <h1 className="text-black text-4xl font-bold tracking-widest capitalize">
          the t-shirt design that build brands
        </h1>
        <p className="text-black/80 mt-6  font-semibold tracking-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab possimus
        </p>
      </div>
      <img src="/ex.png" alt="hero banner" className="w-[600px]" />
      <button className="absolute bg-white text-black p-2.5 -bottom-5 left-[90px] font-bold text-3xl rounded-4xl">
        GET THE DROP
      </button>
    </div>
  )
}

export default Hero
