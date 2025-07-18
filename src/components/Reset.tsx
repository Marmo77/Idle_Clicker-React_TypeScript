import React from 'react'
import { toast } from 'react-hot-toast'

const Reset = () => {
    // const [fid, setFid] = useState<boolean>()

    // const Zmiana = (value: boolean) =>{
    //     setFid(value)
    //     if(fid){
    //         toast.success("You Successfully Restared your Account!",
    //             {
    //                 icon: '🍀',
    //                 duration: 5000,
    //                 style:{
    //                     alignItems:'center',
    //                     background: "#23b319",
    //                     color: '#e2f0e1'
    //                 }
    //             }
    //         )
    //     }
    // }

    const refresh = () =>{
        const restart = window.confirm("ARE YOU SURE? 🌶️⚠️")
        if (restart){
            toast.success("You Successfully Restared your Account!",
                {
                    icon: '🍀',
                    duration: 5000,
                    style:{
                        alignItems:'center',
                        background: "#23b319",
                        color: '#e2f0e1'
                    }
                }
            )
            localStorage.clear()
            // localStorage.removeItem("coins")
            location.reload()
        }
        else{
            toast.success("Your account stay in stage as Before. ",
                {
                    icon: "😎"
                }
            )
        }
    }
  return (
    <div className='flex'>
        <button className='px-4 py-2 bg-red-700 rounded-2xl cursor-pointer hover:animate-pulse hover:scale-115 duration-300 transition-transform'
        onClick={refresh}>
            Reset ⚠️
            
        </button>
    </div>
  )
}

export default Reset
