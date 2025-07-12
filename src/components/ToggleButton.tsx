import React from 'react'

interface ToggleButtonProps {
    isShop: boolean;
    setIsShop: (isShop:boolean) => void; 
}

const ToggleButton = ({isShop, setIsShop}:ToggleButtonProps) => {
  return (
     <div
                role="tablist"
                aria-label="Toggle between Shop and Achievements"
                className="relative flex bg-amber-200 rounded-3xl p-1 gap-3 w-fit max-w-[480px] text-2xl select-none shadow-md"
                onClick={() => setIsShop(!isShop)}
              >
            {/* Slider */}
            <div
              className="absolute bottom-0 top-0 bg-emerald-500 rounded-3xl shadow-lg transition-all duration-300 ease-in-out"
              style={{
                width: '50%',
                left: isShop ? 0 : '50%',
              }}
            />

            {/* Shop button */}
            <button
              role="tab"
              aria-selected={isShop}
              className={`relative z-10 px-4 flex-1 text-center py-2 rounded-3xl transition-colors duration-300 ${
                isShop ? 'text-white font-semibold' : 'text-gray-700'
              }`}
            >
              🛒
            </button>

            {/* Achievements button */}
            <button
              role="tab"
              aria-selected={!isShop}
              className={`relative px-4 z-10 flex-1 text-center rounded-3xl transition-colors duration-300 ${
                !isShop ? 'text-white font-semibold' : 'text-gray-700'
              }`}
            >
              🥇
            </button>
          </div>
  )
}

export default ToggleButton
