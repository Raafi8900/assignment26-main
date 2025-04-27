import React from 'react'

const Banner = ({ title, subtitle, backgroundImage }) => {
  return (
    <div 
      className="relative h-[500px] bg-cover bg-center rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70">
        <div className="h-full flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mt-2 font-medium drop-shadow">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Banner
