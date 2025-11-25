'use client'

import { Rnd } from "react-rnd"
import { BiExpandAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";

function Terminal() {
    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[700px] h-[500px] shadow-2xl rounded-xl flex flex-col justify-start items-center bg-black`}>
                    <div className={`w-full relative shadow-lg px-3 py-2 h-auto flex justify-start items-center gap-2`}>
                        <div className={`w-auto flex justify-center items-center gap-2`}>
                            <span className={` rounded-full cursor-default bg-red-500`}><RxCross2 className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-yellow-400`}><FiMinus className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-green-500`}><BiExpandAlt className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                        </div>
                        <p className={`font-semibold text-sm text-white absolute left-1/2 -translate-x-1/2`}>sudiptodas - zsh</p>
                    </div>

                </div>
            </Rnd>

        </>
    )
}

export default Terminal
