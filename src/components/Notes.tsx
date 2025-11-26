'use client'

import { Rnd } from "react-rnd"
import { BiExpandAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { Activity, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { backend, databases, designTools, frontend, language, misc } from "@/data/skills";
import { projectList } from "@/data/projectList";

function Notes() {

    const [option, setOption] = useState<null | string>(null);

    const optionList = [
        'education',
        'skills',
        'projects'
    ];

    const navigate = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[800px] h-[400px] shadow-2xl rounded-xl flex justify-start items-start`}>

                    <div className={`w-[40%] rounded-l-xl backdrop-blur-2xl bg-white/25 px-3 py-2 h-full flex flex-col justify-start items-center`}>
                        <div className={`w-full flex py-3 justify-start items-center gap-2`}>
                            <span className={` rounded-full cursor-default bg-red-500`}><RxCross2 className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-yellow-400`}><FiMinus className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-green-500`}><BiExpandAlt className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                        </div>
                        <input type="text" className={`w-full mb-5 py-1 mt-3 px-2 border border-gray-300 text-[10px] rounded-lg outline-none`} placeholder="Search notes" />
                        {optionList.map((opt, index) => {
                            return <span onClick={() => setOption(opt)} key={index} className={`w-full text-start py-2 rounded-lg ${option === opt ? "bg-blue-400 text-white font-semibold" : "bg-white/20 text-black"} cursor-pointer px-2 my-1 capitalize active:scale-95 duration-150 ease-in-out`}>{opt}</span>
                        })}
                    </div>
                    <div className={`w-full rounded-r-xl overflow-hidden bg-white px-3 py-2 h-full flex flex-col justify-start items-start gap-2`}>
                        <div className={`w-full h-full flex justify-center items-center gap-4`}>
                            <span className={`text-4xl ${option === null ? "block" : "hidden"} text-gray-200`}><FaExclamationCircle /></span>
                            <h1 className={`font-bold ${option === null ? "block" : "hidden"} text-xl text-gray-200`}>Nothing to see here</h1>

                            <Activity mode={option === 'education' ? "visible" : "hidden"}>
                                <div className={`w-full pt-2 h-full flex flex-col justify-start items-start`}>
                                    <h1 className={`font-bold text-xl pb-2 w-[95%] border-b border-gray-300`}>Education</h1>
                                    <h1 className={`text-sm pt-2 font-semibold`}>Techno Main Salt Lake</h1>
                                    <h1 className={`text-[10px] pt-1`}>Bachelor's of Computer Application</h1>
                                    <h1 className={`text-[10px] pt-1`}>September 2022 - June 2025</h1>
                                    <h1 className={`text-[10px] pt-1`}>CGPA : 7.6</h1>
                                </div>
                            </Activity>
                            <Activity mode={option === 'projects' ? "visible" : "hidden"}>
                                <div className={`w-full pt-2 h-full flex flex-col justify-start items-start overflow-y-auto scrollbar pb-10`}>
                                    <h1 className={`font-bold text-xl pb-2 w-[95%] border-b border-gray-300`}>Projects</h1>
                                    {projectList.map((item, index) => {
                                        return <div key={index} className={`w-full flex flex-col justify-start items-start`}>
                                            <h1 className={`text-sm pt-2 font-semibold capitalize`}>{item.name}</h1>
                                            <h1 className={`text-[10px] pt-1 italic pb-2`}>{item.tech}</h1>
                                            <h1 className={`text-[10px] pt-1`}>{item.desc}</h1>
                                            <h1 className={`${item.deployed ? "block" : "hidden"} text-[10px] pt-1 font-semibold`}>Github : <span className={`text-blue-600 font-semibold`} onClick={() => navigate(item.github)}>{item.github}</span></h1>
                                            <h1 className={`${item.deployed ? "block" : "hidden"} text-[10px] pt-1 font-semibold`}>Live : <span className={`text-blue-600 font-semibold`} onClick={() => navigate(item.live)}>{item.live}</span></h1>
                                            <hr className={`w-[70%] h-px bg-gray-200 opacity-20 my-2`} />
                                        </div>
                                    })}
                                </div>
                            </Activity>
                            <Activity mode={option === 'skills' ? "visible" : "hidden"}>
                                <div className={`w-full pt-2 pb-12 h-full flex flex-col justify-start items-start overflow-auto scrollbar`}>
                                    <h1 className={`font-bold text-xl pb-2 w-[95%] border-b border-gray-300`}>Skills</h1>
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Frontend</h1>
                                    {frontend.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Backend</h1>
                                    {backend.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Databases</h1>
                                    {databases.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Programming Languages</h1>
                                    {language.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Misc</h1>
                                    {misc.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                    <h1 className={`text-sm pt-2 font-semibold mb-2`}>Design Tools</h1>
                                    {designTools.map((item, index) => {
                                        return <span key={index} className={`w-full text-[10px]`}>● {item}</span>
                                    })}
                                </div>
                            </Activity>
                        </div>
                    </div>

                </div>
            </Rnd>
        </>
    )
}

export default Notes
