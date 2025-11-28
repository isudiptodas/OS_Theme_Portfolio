'use client'

import { Rnd } from "react-rnd"
import { BsFiles } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Activity, useState } from "react";
import { backend, databases, designTools, frontend, language, misc } from "@/data/skills";
import { projectList } from "@/data/projectList";

function TextFile({ closeFile }: { closeFile: () => void }) {

    const [option, setOption] = useState('Education');

    const infoList = [
        'Education',
        'Skills',
        'Projects',
    ];

    const navigate = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <>
            <Rnd dragAxis="both" bounds="">
                <div className={`w-[600px] h-[400px] flex flex-col justify-start items-center bg-zinc-950 rounded-md shadow-2xl overflow-hidden border border-gray-700 relative`}>
                    {/* minimize, close */}
                    <div className={`fixed top-0 right-0 w-auto flex justify-center items-center`}>
                        <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white rotate-90`}>|</span>
                        <span className={`text-[10px] px-4 py-2 hover:bg-white/10 duration-150 ease-in-out cursor-default text-white`}><BsFiles /></span>
                        <span onClick={closeFile} className={`text-[10px] px-4 py-2 hover:bg-red-500 duration-150 ease-in-out cursor-default text-white`}><RxCross1 /></span>
                    </div>

                    <div className={`w-full pt-2 px-4 h-auto flex justify-start items-center gap-1`}>
                        <img src="/assets/windows-icons/notepad.png" className={`h-5 mr-3`} />
                        {infoList.map((info) => {
                            return <p onClick={() => setOption(info)} key={info} className={`${option === info ? "text-white bg-zinc-900" : "text-zinc-400"} rounded-t-lg cursor-default hover:bg-zinc-800 duration-150 ease-in-out px-3 py-2 text-[12px]`}>{info}</p>
                        })}
                    </div>

                    <div className={`w-full h-full bg-zinc-800 flex flex-col justify-start items-center`}>
                        <div className={`w-full px-4 bg-zinc-900 flex justify-start items-center gap-1`}>
                            <p className={`text-white text-[12px] cursor-default px-3 py-2 hover:bg-zinc-800 duration-150 ease-in-out`}>File</p>
                            <p className={`text-white text-[12px] cursor-default px-3 py-2 hover:bg-zinc-800 duration-150 ease-in-out`}>Edit</p>
                            <p className={`text-white text-[12px] cursor-default px-3 py-2 hover:bg-zinc-800 duration-150 ease-in-out`}>View</p>
                        </div>

                        {/* education */}
                        <Activity mode={option === 'Education' ? "visible" : "hidden"}>
                            <div className={`w-full h-full flex flex-col justify-start items-start`}>
                                <p className={`text-white text-sm px-4 pt-3 font-semibold`}>Techno Main Salt Lake</p>
                                <p className={`text-white text-sm px-4 font-light italic`}>Bachelor's of Computer Application</p>
                                <p className={`text-white text-sm px-4 pt-3 font-light`}><span className={`font-semibold`}>CGPA :</span> 7.6</p>
                                <p className={`text-white text-sm px-4 font-light`}><span className={`font-semibold`}>Duration :</span> September 2022 - June 2025</p>
                            </div>
                        </Activity>

                        {/* skills */}
                        <Activity mode={option === 'Skills' ? "visible" : "hidden"}>
                            <div className={`w-full h-full flex flex-col justify-start items-start overflow-y-auto scrollbar pb-20`}>
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Frontend</p>
                                {frontend.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Backend</p>
                                {backend.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Databases</p>
                                {databases.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Programming Language</p>
                                {language.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Design Tools</p>
                                {designTools.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                                <p className={`text-white text-sm px-4 py-3 font-semibold`}>Misc</p>
                                {misc.map((item) => {
                                    return <p key={item} className={`text-white text-[12px] px-4 font-light`}>● {item}</p>
                                })}
                            </div>
                        </Activity>

                        {/* projects */}
                        <Activity mode={option === 'Projects' ? "visible" : "hidden"}>
                            <div className={`w-full h-full flex flex-col justify-start items-start overflow-y-auto scrollbar pt-3 pb-20`}>
                                {projectList.map((item) => {
                                    return <div key={item.name} className={`w-full flex flex-col justify-start items-start`}>
                                        <p className={`text-white text-sm px-4 font-semibold capitalize`}>{item.name}</p>
                                        <p className={`text-white text-[10px] px-4 font-light italic`}>{item.tech}</p>
                                        <p className={`text-white text-[12px] px-4 pt-4 font-light `}>{item.desc}</p>

                                        <p onClick={() => navigate(item.github)} className={`text-white text-[12px] px-4 pt-4 cursor-pointer font-light flex`}>Github : <span className={`text-blue-400 italic`}>{item.github}</span></p>
                                        <p onClick={() => navigate(item.live)} className={`text-white ${item?.deployed ? "block" : "hidden"} cursor-pointer text-[12px] px-4 pb-4 font-light `}>Live : <span className={`text-blue-400 italic`}>{item?.live}</span></p>
                                    </div>
                                })}
                                
                            </div>
                        </Activity>
                    </div>


                </div>
            </Rnd>
        </>
    )
}

export default TextFile
