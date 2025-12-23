import React from 'react'
import { Layers, Zap, Shield, Clock, Layout, Globe } from 'lucide-react'

const Services = () => {
  const services = [
    {
      title: 'Digital Assets',
      desc: 'High-resolution textures and PSD files optimized for professional speed.',
      icon: <Layers className="w-6 h-6" />,
      color: 'text-pink-500',
    },
    {
      title: 'Fast Delivery',
      desc: 'Instant access to your digital downloads immediately after checkout.',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-yellow-400',
    },
    {
      title: 'Secure Licensing',
      desc: 'Commercial use ready. Professional rights for all your creative projects.',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-blue-500',
    },
    {
      title: 'Expert Support',
      desc: '24/7 technical assistance for all your installation and usage needs.',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-green-400',
    },
  ]

  return (
    <section className="bg-black py-24 px-6 h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header matching the 'What's Inside' style */}
        <div className="mb-16 border-l-4 border-yellow-500 pl-6">
          <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Our{' '}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Services
            </span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold">
            Premium Digital Solutions / Est. 2024
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black p-10 hover:bg-zinc-950 transition-colors duration-300 group">
              <div
                className={`${service.color} mb-6 transform group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-white text-xl font-black uppercase tracking-tight mb-4">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
