import React, {useState } from 'react'
import toast from 'react-hot-toast'

interface Codes{
    id: number,
    code: string,
    value: number,
    category: string
}

interface CodeReedemProps{
    codes: Codes[]
    ReedemCode: (code:string) => void;
}

const CodeReedem = ({codes, ReedemCode}: CodeReedemProps) => {
    const [showCodes, setShowCodes] = useState<boolean>(false)
    const [codeValue, setCodeValue] = useState<string>("")
    return (
    <div className='w-full max-w-md flex flex-col gap-4 items-center'>
      <div className="w-full bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 border border-gray-700">
        <p className='text-center text-2xl font-bold text-blue-300 pb-2 tracking-wide'>Redeem a Code</p>
        <form className='flex w-full gap-2 items-center' autoComplete="off">
            <input
              type="text"
              value={codeValue}
              className='flex-1 py-2 px-4 rounded-l-xl bg-gray-800 border border-gray-700 text-blue-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              id='bonuses'
              placeholder="Enter code..."
              onChange={(e) => setCodeValue(e.target.value)}
            />
            <button
              type="submit"
              className='py-2 px-4 rounded-r-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:scale-105 hover:from-blue-700 hover:to-teal-600 transition-transform duration-200 shadow'
              onClick={(e) => {
                e.preventDefault();
                if (codeValue) {
                    ReedemCode(codeValue);
                    setCodeValue("")
                }
                else{
                    toast.error("Proszę wprowadzić Kod!",
                        {
                            position: 'bottom-center',
                            style: {
                                background: '#1f2937',
                                color: '#fff',
                                border: '1px solid #374151'
                            },
                            duration: 2000,
                        }
                    )
                }
              }}
            >
              <span className="text-xl">✅</span>
            </button>
        </form>
        <button
          className={`mt-2 w-full py-2 rounded-xl font-semibold transition-colors duration-200 ${
            showCodes
              ? 'bg-gradient-to-r from-blue-700 to-teal-700 text-white'
              : 'bg-gray-800 text-blue-300 border border-blue-700 hover:bg-blue-800'
          }`}
          onClick={() => setShowCodes(!showCodes)}
        >
          {showCodes ? 'Hide all codes' : 'Show all codes'}
        </button>
        <div className={`${showCodes ? 'flex flex-col mt-2' : 'hidden'}`}>
          <ul className='flex flex-col gap-2 items-start max-h-48 overflow-y-auto'>
            {codes.map((item) => (
              <li key={item.id} className="w-full bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                <span className='font-semibold text-blue-400'>Code:</span> <span className='text-blue-200'>{item.code}</span>
                <span className='mx-2 text-gray-400'>|</span>
                <span className='font-semibold text-blue-400'>For:</span> <span className='text-blue-200'>{item.category}</span>
                <span className='mx-2 text-gray-400'>|</span>
                <span className='font-semibold text-blue-400'>Value:</span> <span className='text-blue-200'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CodeReedem
