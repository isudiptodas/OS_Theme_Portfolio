'use client'

import { Rnd } from "react-rnd"
import { BiExpandAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { FaExclamationCircle } from "react-icons/fa";
import { useState, Activity } from "react";
import { IoSearch } from "react-icons/io5";
import { FaWindows } from "react-icons/fa";
import { useRouter } from "next/navigation";

function Settings() {

    const [option, setOption] = useState<null | string>('Switch');
    const router = useRouter();

    const optionList = [
        'About This Mac',
        'AppleID',
        'Family Sharing',
        'Wi-fi',
        'Bluetooth',
        'Dock & Menu Bar',
        'Desktop Settings',
        'Security & Privacy',
        'Switch',
    ];

    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[800px] h-[400px] shadow-2xl rounded-xl flex justify-start items-start`}>

                    <div className={`w-[40%] rounded-l-xl backdrop-blur-2xl bg-white/25 px-3 py-2 h-full flex flex-col justify-start items-center`}>
                        <div className={`w-full fixed top-0 left-3 flex py-3 justify-start items-center gap-2`}>
                            <span className={` rounded-full cursor-default bg-red-500`}><RxCross2 className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-yellow-400`}><FiMinus className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-green-500`}><BiExpandAlt className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                        </div>
                        <div className={`w-full mt-8 mb-3 flex justify-center items-center px-2`}>
                            <span className={`bg-white rounded-l-lg py-2 px-2`}><IoSearch className={`text-[15px] opacity-55`} /></span>
                            <input type="text" className={`w-full rounded-r-lg py-2 px-2 bg-white text-black text-[10px] outline-none`} placeholder="Search" />
                        </div>
                        {optionList.map((opt, index) => {
                            return <span onClick={() => setOption(opt)} key={index} className={`w-full text-[12px] text-start py-2 rounded-lg ${option === opt ? "bg-white/25 text-black" : "bg-transparent text-black"} cursor-pointer px-2 capitalize active:scale-95 duration-150 ease-in-out`}>{opt}</span>
                        })}
                    </div>
                    <div className={`w-full rounded-r-xl overflow-hidden bg-white px-3 py-2 h-full flex flex-col justify-start items-start gap-2`}>
                        <div className={`w-full h-full ${option === null ? "block" : "hidden"} flex justify-center items-center gap-4`}>
                            <span className={`text-4xl text-gray-200`}><FaExclamationCircle /></span>
                            <h1 className={`font-bold text-xl text-gray-200`}>Nothing to see here</h1>
                        </div>
                        <Activity mode={option === 'Switch' ? "visible" : "hidden"}>
                            <div className={`w-full h-full flex flex-col justify-start items-start pt-4 px-3`}>
                                <h1 className={`font-bold text-xl pb-2 w-[95%] border-b border-gray-300`}>Switch OS</h1>
                                <p className={`w-auto px-4 py-2 mt-5 rounded-lg flex justify-center items-center gap-2 border border-gray-200 text-sm cursor-pointer hover:bg-blue-500 hover:text-white duration-150 ease-in-out active:scale-105`} onClick={() => router.replace('/windows')}><FaWindows/>Windows</p>
                            </div>
                        </Activity>
                    </div>

                </div>
            </Rnd>
        </>
    )
}

export default Settings
