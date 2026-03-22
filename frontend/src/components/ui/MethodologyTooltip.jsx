import { Info } from 'lucide-react'
import { useState } from 'react'

export default function MethodologyTooltip({ text, className = '' }) {
  const [show, setShow] = useState(false)
  return (
    <span className={`relative inline-flex items-center ${className}`}>
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="text-gray-400 hover:text-navy transition-colors ml-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Methodology information"
      >
        <Info size={14} />
      </button>
      {show && (
        <div className="absolute left-0 bottom-full mb-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 text-sm text-gray-600 animate-fadeIn">
          {text}
        </div>
      )}
    </span>
  )
}
