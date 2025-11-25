'use client'

import { Rnd } from "react-rnd"
import { BiExpandAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";

function Notes() {
    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[700px] h-[500px] shadow-2xl rounded-xl flex flex-col justify-start items-center bg-white`}>
                    <div className={`w-full shadow-lg px-3 py-2 h-auto flex justify-between items-center gap-2`}>
                        <div className={`w-auto flex justify-center items-center gap-2`}>
                            <span className={` rounded-full cursor-default bg-red-500`}><RxCross2 className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-yellow-400`}><FiMinus className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-green-500`}><BiExpandAlt className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                        </div>
                        <div className={`w-[30%] h-full flex justify-center items-center`}>
                            <input type="text" className={`w-full py-1 px-2 border border-gray-300 text-[10px] rounded-lg outline-none`} placeholder="Search notes" />
                        </div>
                    </div>

                </div>
            </Rnd>
        </>
    )
}

export default Notes
