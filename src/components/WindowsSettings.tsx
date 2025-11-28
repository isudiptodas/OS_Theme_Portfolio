'use client'
import { settingsList } from "@/data/windowsSettingsList";
import { useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { Rnd } from "react-rnd"
import { IoSearch } from "react-icons/io5";
import { BsFiles } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";

function WindowsSettings({showSettings}: {showSettings: () => void}) {

    const [option, setOption] = useState('Switch');
    const router = useRouter();

    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[900px] h-[500px] bg-zinc-800 flex justify-between items-center overflow-hidden rounded-md`}>

                    {/* option list */}
                    <div className={`w-[25%] h-full flex flex-col justify-start items-center`}>
                        <p className={`w-full text-[10px] text-white px-4 pt-2`}>Settings</p>
                        <div className={`w-full px-3 py-4 flex justify-start items-center gap-2`}>
                            <span className={`text-4xl text-white opacity-50`}><RiAccountCircleFill /></span>
                            <p className={`text-white text-sm`}>Sudipto Das</p>
                        </div>
                        <div className={`w-full pt-2 px-3 h-auto flex flex-col justify-start items-center gap-2`}>
                            {settingsList.map((item) => {
                                return <div key={item.name} className={`w-full py-2 px-3 ${option === item.name ? "bg-white/10" : "bg-transparent"} active:opacity-75 hover:bg-white/10 rounded-md duration-150 ease-in-out cursor-default flex justify-start items-center gap-2`}>
                                    <img src={item.icon} className={`h-4`} />
                                    <p className={`text-white text-sm`}>{item.name}</p>
                                </div>
                            })}
                        </div>
                    </div>

                    {/* main page */}
                    <div className={`w-[70%] h-full flex flex-col justify-start items-start relative overflow-hidden`}>
                        
                        <div className={`w-[70%] py-3 flex justify-center items-center`}>
                            <span className={`p-2 text-sm rounded-l-full bg-black/60 text-white`}><IoSearch/></span>
                            <input type="text" className={`w-[90%] bg-black/60 outline-none py-1.5 rounded-r-full text-white placeholder-gray-600 text-[12px]`} placeholder="Find a setting"/>
                        </div>

                        <div className={`fixed top-0 right-0 w-auto flex justify-center items-center`}>
                            <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white rotate-90`}>|</span>
                            <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white`}><BsFiles/></span>
                            <span onClick={showSettings} className={`text-[10px] px-4 py-2 hover:bg-red-500 duration-150 ease-in-out cursor-default text-white`}><RxCross1/></span>
                        </div>
                        
                        <p className={`w-full px-3 text-xl font-semibold text-white`}>Switch OS</p>
                        <p onClick={() => router.replace('/macos')} className={`w-auto flex justify-center items-center gap-2 border border-gray-500 rounded-lg px-3 text-white py-1 mt-4 ml-3 cursor-pointer hover:bg-white hover:text-black duration-150 ease-in-out active:scale-95 `}><span><FaApple/></span>MacOS</p>
                    </div>
                </div>
            </Rnd>
        </>
    )
}

export default WindowsSettings
