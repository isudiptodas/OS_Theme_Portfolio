'use client'

import { Rnd } from "react-rnd"
import { BsFiles } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { Activity, useState } from "react";
import { explorerList } from "@/data/explorerList";
import { IoIosArrowDown } from "react-icons/io";

function FileExplorer({ showSettings, showNotepad }: { showSettings: () => void, showNotepad: () => void }) {

    const [option, setOption] = useState('Home');
    const [accessVisible, setAccessVisible] = useState(true);

    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[900px] h-[500px] flex flex-col justify-start items-center relative rounded-md overflow-hidden bg-zinc-900`}>

                    {/* minimize, close */}
                    <div className={`fixed top-0 right-0 w-auto flex justify-center items-center`}>
                        <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white rotate-90`}>|</span>
                        <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white`}><BsFiles /></span>
                        <span onClick={showSettings} className={`text-[10px] px-4 py-2 hover:bg-red-500 duration-150 ease-in-out cursor-default text-white`}><RxCross1 /></span>
                    </div>

                    {/* top bar */}
                    <div className={`w-full h-auto pr-4 mt-10 flex justify-between items-center`}>

                        {/* arrows */}
                        <div className={`w-[15%] h-auto pr-3 pl-5 py-2 flex justify-evenly items-center gap-3`}>
                            <span className={`text-white opacity-65 text-lg`}><IoIosArrowRoundBack /></span>
                            <span className={`text-white opacity-65 text-lg`}><IoIosArrowRoundForward /></span>
                            <span className={`text-white text-lg`}><IoIosArrowRoundUp /></span>
                            <span className={`text-white text-sm`}><IoMdRefresh /></span>
                        </div>

                        {/* nav bar */}
                        <div className={`w-[55%] h-auto py-2 rounded-sm bg-white/10 flex justify-start items-center gap-2 pl-4`}>
                            <span className={`text-white text-[12px]`}><GoHome /></span>
                            <span className={`text-white text-[12px]`}><IoIosArrowForward /></span>
                            <span className={`text-white text-[12px]`}>Home</span>
                            <span className={`text-white text-[12px]`}><IoIosArrowForward /></span>

                        </div>

                        {/* search home */}
                        <div className={`w-[25%] h-auto py-2 bg-white/10 rounded-sm flex justify-between items-center px-3`}>
                            <span className={`text-white opacity-70 text-[12px]`}>Search Home</span>
                            <span className={`text-white opacity-70 text-[12px]`}><IoMdSearch /></span>
                        </div>
                    </div>

                    {/* main section */}
                    <div className={`w-full h-full flex justify-between items-center`}>

                        {/* list view */}
                        <div className={`w-[15%] pl-2 bg-zinc-900 mt-10 h-full flex flex-col justify-start items-center gap-2`}>
                            <div onClick={() => setOption('Home')} className={`w-full px-4 ${option === 'Home' ? "bg-white/10" : "bg-transparent"} cursor-pointer py-1 rounded-sm flex justify-start items-center gap-2`}>
                                <img src="/assets/windows-icons/home.png" className={`h-4`} />
                                <p className={`text-white text-[12px]`}>Home</p>
                            </div>
                            {explorerList.map((item) => {
                                return <div onClick={() => setOption(item.name)} key={item.name} className={`w-full px-4 ${option === item.name ? "bg-white/10" : "bg-transparent"} duration-150 ease-in-out active:opacity-70 cursor-pointer py-1 rounded-sm flex justify-start items-center gap-2`}>
                                    <img src={item.icon} className={`h-4`} />
                                    <p className={`text-white text-[12px]`}>{item.name}</p>
                                </div>
                            })}
                        </div>

                        {/* contents */}
                        <div className={`w-[82%] h-full py-2 flex justify-center items-center`}>

                            {/* quick access - home */}
                            <Activity mode={option === 'Home' ? "visible" : "hidden"}>
                                <div className={`w-full bg-zinc-900 h-full flex flex-col justify-start items-start`}>
                                    <div className={`w-full py-3 flex justify-start items-center`}>
                                        <p onClick={() => setAccessVisible(!accessVisible)} className={`w-auto cursor-pointer flex justify-center items-center gap-2 text-[12px] text-white`}><span className={`text-sm`}><IoIosArrowDown className={`${accessVisible ? "rotate-0" : "rotate-180"} duration-150 ease-in-out`} /></span>Quick Access</p>
                                    </div>
                                    <Activity mode={accessVisible ? "visible" : "hidden"}>
                                        <div className={`w-full h-auto grid grid-cols-3 justify-items-start gap-3`}>
                                            {explorerList.map((item) => {
                                                return <div onClick={() => setOption(item.name)} key={item.name} className={`w-auto cursor-pointer pr-10 pl-3 py-2 rounded-sm hover:bg-white/10 duration-150 ease-in-out h-auto flex justify-center items-center gap-2`}>
                                                    <img src={item.icon} className={`h-12`} />
                                                    <div className={`w-full flex flex-col justify-center items-start`}>
                                                        <p className={`w-auto text-white text-[12px]`}>{item.name}</p>
                                                        <p className={`w-auto text-white text-[12px]`}>{item.subName}</p>
                                                    </div>
                                                </div>
                                            })}
                                        </div>
                                    </Activity>
                                </div>
                            </Activity>

                            {/* empty folders */}
                            <Activity mode={(option === 'Desktop' || option === 'Downloads' || option === 'Pictures' || option === 'Music' || option === 'Videos' || option === 'Recycle Bin') ? "visible" : "hidden"}>
                                <div className={`w-full bg-zinc-900 h-full flex flex-col justify-start items-center pt-5`}>
                                    <p className={`w-full text-center text-[10px] text-white`}>This folder is empty</p>
                                </div>
                            </Activity>

                            {/* documents */}
                            <Activity mode={option === 'Documents' ? "visible" : "hidden"}>
                                <div className={`w-full bg-zinc-900 h-full flex flex-col justify-start items-center pr-4 pt-5`}>
                                    <div className={`w-full flex justify-start items-center gap-2`}>
                                        <p className={`text-[12px] text-white font-light w-[30%] pt-px border-r border-gray-500`}>Name</p>
                                        <p className={`text-[12px] text-white font-light w-[20%] pt-px border-r border-gray-500`}>Status</p>
                                        <p className={`text-[12px] text-white font-light w-[20%] pt-px border-r border-gray-500`}>Date Modified</p>
                                        <p className={`text-[12px] text-white font-light w-[20%] pt-px border-r border-gray-500`}>Type</p>
                                    </div>
                                    <div onClick={showNotepad} className={`w-full cursor-pointer hover:bg-white/10 duration-150 ease-in-out py-1 px-2 mt-3 rounded-sm flex justify-start items-center gap-2`}>
                                        <p className={`text-[12px] text-white font-light w-[30%] flex justify-start items-center gap-1`}><img src='/assets/windows-icons/txt-file.png' className={`h-3`} /> Sudipto-info.txt</p>
                                        <p className={`text-[12px] text-white font-light w-[20%]`}></p>
                                        <p className={`text-[12px] text-white font-light w-[20%]`}>28-11-2025 16:46</p>
                                        <p className={`text-[12px] text-white font-light w-[20%]`}>Text Document</p>
                                    </div>
                                </div>
                            </Activity>
                        </div>

                    </div>

                </div>
            </Rnd>
        </>
    )
}

export default FileExplorer
