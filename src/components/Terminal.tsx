'use client'

import { Rnd } from "react-rnd"
import { BiExpandAlt } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoogleGenAI } from '@google/genai';

type AiChat = {
    name: string | undefined,
    message: string | undefined,
}

function Terminal() {

    const [input, setInput] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [chat, setChat] = useState<[] | AiChat[]>([]);

    useEffect(() => {

        if (!submitted) return;

        const generateResponse = async () => {
            const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API as string;
            const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
            const data = process.env.NEXT_PUBLIC_PROMPT as string;
            const systemPrompt = process.env.NEXT_PUBLIC_SYSTEM_PROMPT as string;
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: `DATA: ${data}, question : ${input}`,
                    config: {
                        systemInstruction: systemPrompt,
                    },
                });

                console.log(response.text);
                setChat(prev => [...prev, { name: 'you', message: input as string }, { name: 'system', message: response.text as string }]);
            } catch (err: any) {
                console.log(err);
            }
            finally {
                setSubmitted(false);
                setInput('');
            }
        }

        generateResponse();
    }, [submitted]);

    return (
        <>
            <Rnd dragAxis="both" bounds="window">
                <div className={`w-[600px] h-[450px] shadow-2xl rounded-xl flex flex-col justify-start items-center bg-black overflow-y-auto scrollbar`}>
                    <div className={`w-full fixed top-0 shadow-lg px-3 py-3 h-auto flex justify-start items-center gap-2 rounded-t-xl bg-zinc-900`}>
                        <div className={`w-auto flex justify-center items-center gap-2`}>
                            <span className={` rounded-full cursor-default bg-red-500`}><RxCross2 className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-yellow-400`}><FiMinus className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                            <span className={` rounded-full cursor-default bg-green-500`}><BiExpandAlt className={`opacity-0 hover:opacity-100 duration-150 ease-in-out text-zinc-900 text-[12px] p-px`} /></span>
                        </div>
                        <p className={`font-semibold text-sm text-white absolute left-1/2 -translate-x-1/2`}>sudiptodas - zsh</p>
                    </div>

                    <p className={`w-full text-green-400 text-[10px] mt-10 px-2 pt-2 font-mono`}>Last login : Thursday  Nov 27 21:34:08</p>
                    {chat.length > 0 && chat.map((item, index) => {
                        return <p key={index} className={`w-full pb-2 px-2 pr-4 font-mono text-[10px] text-white`}><span className={`text-green-400 font-mono font-semibold`}>{item.name}</span> : {item.message}</p>
                    })}
                    <p className={`w-full text-green-400 text-[10px] px-2 font-mono flex gap-2 pb-10`}>MacBook-Air-sudipto : ~ <span className={`animate-blink text-white ${input === '' ? "block" : "hidden"}`}>|</span><input value={input} onKeyDown={(e) => { if (e.key === 'Enter') { setSubmitted(true); } }} onChange={(e) => setInput(e.target.value)} type="text" className={`font-mono w-[70%] text-white placeholder-gray-300 outline-none`} placeholder="Ask any question" /></p>

                </div>
            </Rnd>

        </>
    )
}

export default Terminal
