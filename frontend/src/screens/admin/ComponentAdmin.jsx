import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddComponentMutation } from '.././../slices/componentSlice'
import { toast } from 'react-toastify'
import { Terminal } from 'lucide-react'

export default function ComponentAdmin() {
  const [formData, setFormData] = useState({ name: '', description: '', filename: '', code: '' })
  const [addComponent, { isLoading }] = useAddComponentMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // PRE-SAVE CLEANUP: Removes accidental backticks or literal .trim() text
      const sanitizedCode = formData.code
        .trim()
        .replace(/^[`"]+|[`"]+$/g, '')
        .replace(/\.trim\(\)$/g, '')

      await addComponent({ ...formData, code: sanitizedCode }).unwrap()
      toast.success('Component saved successfully')
      navigate('/components')
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save component')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 font-sans flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-[#111] border border-[#222] p-8 lg:p-12 rounded-3xl shadow-2xl">
          <h2 className="text-orange-600 font-black italic text-3xl uppercase mb-8 flex items-center gap-3">
            <Terminal size={32} /> Create Utility
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                className="w-full bg-black border border-[#333] p-4 rounded-xl focus:border-orange-500 outline-none transition"
                placeholder="Name (e.g., Hero Banner)"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                value={formData.name}
                required
              />
              <input
                className="w-full bg-black border border-[#333] p-4 rounded-xl focus:border-orange-500 outline-none transition"
                placeholder="Filename (e.g., Hero.jsx)"
                onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                value={formData.filename}
                required
              />
            </div>

            <textarea
              className="w-full bg-black border border-[#333] p-4 rounded-xl h-24 focus:border-orange-500 outline-none transition"
              placeholder="Description..."
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              value={formData.description}
              required
            />

            <textarea
              className="w-full bg-black border border-[#333] p-4 rounded-xl h-80 font-mono text-sm focus:border-orange-500 outline-none transition"
              placeholder="Paste HTML/Tailwind code here..."
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              value={formData.code}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-black uppercase py-4 tracking-widest hover:bg-orange-600 hover:text-white transition active:scale-95">
              {isLoading ? 'SAVING...' : 'GET THE DROP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
