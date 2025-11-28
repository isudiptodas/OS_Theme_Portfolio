'use client'
import { useRouter } from "next/navigation";
import { FaApple } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";

function page() {

  const router = useRouter();

  const navigate = (os: string) => {
    if(os === 'windows'){
      router.replace('/windows');
    }
    else{
      router.replace('/macos');
    }
  }
  return (
    <>
     <div className={`w-full h-screen bg-zinc-950 flex flex-col justify-center items-center gap-3`}>
        <div onClick={() => navigate('macos')} className={`w-auto hover:bg-zinc-900 duration-200 ease-in-out cursor-pointer rounded-lg flex justify-center items-center gap-3 px-3 py-2 border border-gray-500`}>
          <span><FaApple className={`text-white text-2xl`}/></span>
          <p className={`text-white text-lg font-semibold`}>MacOS</p>
        </div>
        <div onClick={() => navigate('windows')} className={`w-auto hover:bg-zinc-900 duration-200 ease-in-out cursor-pointer rounded-lg flex justify-center items-center gap-3 px-3 py-2 border border-gray-500`}>
          <span><FaWindows className={`text-blue-500 text-2xl`}/></span>
          <p className={`text-white text-lg font-semibold`}>Windows</p>
        </div>
     </div>
    </>
  )
}

export default page
