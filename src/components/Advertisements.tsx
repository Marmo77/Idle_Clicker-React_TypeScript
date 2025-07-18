import React from 'react'

type Alttext = {
    alttext: string
}
const Advertisements = ({alttext}: Alttext) => {
  return (
    <div id="empty" className="flex flex-col items-center flex-1 justify-center py-8 px-6">
        <div className="w-full h-full bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-gray-400 text-lg font-semibold border border-dashed border-gray-600">
              {alttext}
        </div>
    </div>
  )
}

export default Advertisements