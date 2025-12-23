import React from 'react'

function Hero() {
  return (
    <div
      className="relative w-full flex flex-col md:flex-row items-center justify-center md:justify-evenly 
                  
                    min-h-[45vh] md:min-h-[500px] 
                    px-6
                  
                    bg-[url('/ex.png')] bg-cover bg-center bg-no-repeat md:bg-none">
      {/* Mobile Dark Overlay: situates behind text to ensure readability on background */}
      <div className="absolute inset-0 bg-black/50 md:hidden z-0"></div>

      {/* Text Section */}
      <div className="z-10 text-center md:text-left md:ml-7">
        <h1 className="text-white md:text-black text-2xl md:text-3xl lg:text-5xl font-bold tracking-widest capitalize leading-tight">
          the t-shirt design <br className="hidden md:block" /> that builds brands
        </h1>
        <p className="text-white/80 md:text-black/70 mt-4 md:mt-6 font-semibold text-base md:text-xl max-w-md mx-auto md:mx-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab possimus.
        </p>
      </div>

      {/* Desktop Image: Only visible on md screens and up */}
      <img
        src="/ex.png"
        alt="hero banner"
        className="hidden md:block w-[450px] lg:w-[600px] object-contain z-10"
      />

      {/* Button: Centered on mobile bottom | Snap-to-original on desktop */}
      <button
        className="absolute z-30   bg-white text-black py-2.5 px-8 
        bottom-6 md:bottom-4
        left-1/2 -translate-x-1/2 md:left-[50px] md:translate-x-0 
        font-bold text-xl md:text-3xl rounded-full shadow-2xl transition-transform hover:scale-105">
        GET THE DROP
      </button>
    </div>
  )
}

export default Hero
