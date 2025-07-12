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
    const [codeValue, setCodeValue] = useState<string>()
    return (
    <div className='absolute flex  flex-col gap-4 left-0 bottom-24 px-12 py-2'>
      <p className='text-center text-xl py-2'>Reedem Code:</p>
        <form className='flex w-64 justify-between items-center border-2 rounded-2xl'>
            <input type="text" value={codeValue} className=' py-1 px-4 border-amber-50 border-r-2 text- focus:outline-0 flex-3' id='bonuses' 
            onChange={(e) => setCodeValue(e.target.value)}/>
            <input type="button" value="✅" className='py-1 px-2 hover:scale-125 duration-300 transition-transform cursor-pointer flex-1'
            onClick={(e) => {
                e.preventDefault;
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
            />
        </form>
        <button className='px-4 py-2 mt-2 w-48 self-center rounded-3xl cursor-pointer hover:scale-105 bg-teal-800'
        onClick={() => setShowCodes(!showCodes)}>
            {showCodes ? 'Hide all codes': 'Show all codes'}
        </button>
        <div className={`${showCodes ? 'flex flex-col text-blue-500': 'hidden'}`}>
            <ul className='flex-col flex items-start'>
                {showCodes && (
                    codes.map((item) => (
                        <li key={item.id}>
                            <p>Code: <span className='text-blue-300'>{item.code}</span>, For: <span className='text-blue-300'>{item.category},</span> value: <span className='text-blue-300'>{item.value}</span></p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    </div>
  )
}

export default CodeReedem
