'use client'

import { FaWindows } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import ProgressBar from "@ramonak/react-progress-bar";
import { Activity, useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip';
import { taskbar } from "@/data/taskbar";
import { CiSearch } from "react-icons/ci";
import { CiBatteryFull } from "react-icons/ci";
import { IoIosVolumeHigh } from "react-icons/io";
import { IoIosWifi } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoPower } from "react-icons/io5";
import Panel from "@/components/Panel";
import WindowsSettings from "@/components/WindowsSettings";
import FileExplorer from "@/components/FileExplorer";
import TextFile from "@/components/TextFile";
import { GoogleGenAI } from '@google/genai';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type AiChat = {
  name: string | undefined,
  message: string | undefined,
}

function page() {

  const [percentage, setPercentage] = useState<number>(0);
  const [windowsVisible, setWindowsVisible] = useState(true);
  const [hideLoading, setHideLoading] = useState(false);
  const [startVisible, setStartVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [input, setInput] = useState<null | string>('');
  const [panelVisible, setPanelVisible] = useState(false);
  const [explorerVisible, setExplorerVisible] = useState(false);
  const [txtVisible, setTxtVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chat, setChat] = useState<[] | AiChat[]>([]);

  const date = new Date();
  const time = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  const today = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`

  useEffect(() => {

    const timer = setInterval(() => {
      setPercentage(prev => prev + 20);
    }, 500);

    const stop = setTimeout(() => {
      clearInterval(timer);
      setWindowsVisible(true);
    }, 5000);

    const hideLoading = setTimeout(() => {
      setHideLoading(true);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(stop);
      clearTimeout(hideLoading);
    };

  }, []);

  useEffect(() => {

    if (!submitted) return;
    if (!input) return;

    const generateResponse = async () => {
      const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API as string;
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const data = process.env.NEXT_PUBLIC_PROMPT as string;
      const systemPrompt = process.env.NEXT_PUBLIC_SYSTEM_PROMPT_2 as string;
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `DATA: ${data}, question : ${input}`,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        console.log(response.text);
        setChat(prev => [...prev, { name: 'you', message: input as string }, { name: 'ai', message: response.text as string }]);
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
      <div className={`w-full h-screen bg-blue-600 flex flex-col justify-center items-center gap-3 xl:hidden`}>
        <span className={`text-3xl md:text-5xl text-white opacity-60`}><FaCircleExclamation /></span>
        <p className={`w-full text-center px-4 font-semibold text-xl md:text-2xl text-white opacity-60`}>This page is only available for desktop screens</p>
      </div>

      <div className={`w-full ${hideLoading ? "hidden" : "block"} absolute top-0 ${windowsVisible ? "opacity-0" : "opacity-100"} duration-300 ease-in-out h-screen hidden bg-blue-600 xl:flex justify-center items-center gap-3`}>
        <span><FaWindows className={`text-white text-2xl`} /></span>
        <ProgressBar
          completed={percentage as number}
          width="100px"
          height="5px"
          bgColor="#ffffff"
          baseBgColor="#00000000" />
      </div>

      <div className={`w-full h-screen hidden xl:flex justify-center items-center relative overflow-hidden`}>
        <img src="/assets/windows-sudipto.jpg" className={`absolute top-0 h-full w-full object-top`} />

        {/* windows start */}/
        <div className={`w-1/2 ${startVisible ? "-translate-y-24" : "translate-y-full"} duration-200 ease-in-out h-[500px] absolute bottom-0 z-20 rounded-md flex flex-col justify-between items-center bg-zinc-800 border border-gray-600`}>
          <div className={`w-full h-full flex flex-col justify-start items-center overflow-hidden`}>
            <div className={`w-[95%] h-auto relative flex justify-center items-center`}>
              <span className={` text-gray-400 rounded-l-full mt-5 bg-black/25 p-2`}><CiSearch /></span>
              <p className={`w-[90%] mt-5 bg-black/25 rounded-r-full py-[3px] flex justify-start items-center gap-2`}><input type="text" className={`w-[85%] placeholder-gray-400 text-white text-[12px] px-3 py-1 rounded-r-full outline-none`} onKeyDown={(e) => { if (e.key === 'Enter') { setSubmitted(true); } }} onChange={(e) => setInput(e.target.value)} value={input as string} placeholder="Ask AI for anything" /></p>
              <span className={`text-white ${submitted ? "opacity-100" : "opacity-0"} duration-150 ease-in-out fixed top-7 animate-revolve right-10`}><AiOutlineLoading3Quarters/></span>
            </div>

            {/* apps list */}
            <Activity mode={input !== '' || chat.length > 0 ? "hidden" : "visible"}>
              <div className={`w-full h-auto pt-10 grid grid-cols-6 justify-items-center gap-5 px-8`}>
                {taskbar.map((icon) => {
                  return <div key={icon.name} onClick={() => {
                    if (icon.clickable && icon.link) {
                      window.open(icon.link, '_blank');
                    }
                  }} className={`hover:bg-black/15 rounded-md py-2 px-4 flex flex-col justify-center items-center gap-1`}>
                    <img src={icon.icon} className={`h-10 cursor-pointer`} />
                    <p className={`w-auto text-center text-[10px] text-white`}>{icon.shortName}</p>
                  </div>
                })}
              </div>
            </Activity>

            <div className={`w-full h-full ${chat.length > 0 ? "block" : "hidden"} flex flex-col pt-5 pb-10 px-10 justify-start items-center overflow-y-auto scrollbar`}>
              {chat.length > 0 && chat.map((item, index) => {
                return <p key={index} className={`w-full pb-2 px-2 pr-4 text-[12px] text-white flex gap-3`}><span className={`text-blue-500 text-[12px] font-mono font-semibold`}>{item.name}</span>: {item.message}</p>
              })}
            </div>
          </div>

          <div className={`w-full h-[15%] flex justify-between items-center bg-zinc-900 rounded-b-md`}>
            <span className={`text-white text-[12px] px-10 cursor-pointer flex justify-center items-center gap-2`}><RiAccountCircleFill className={`opacity-50 text-3xl`} /> Sudipto Das</span>
            <span className={`text-white text-[12px] px-10 cursor-pointer`}><IoPower className={`opacity-50 text-xl`} /></span>
          </div>
        </div>

        {/* settings box */}
        <Activity mode={settingsVisible ? "visible" : "hidden"}>
          <WindowsSettings showSettings={() => setSettingsVisible(!settingsVisible)} />
        </Activity>

        <Activity mode={explorerVisible ? "visible" : "hidden"}>
          <FileExplorer showNotepad={() => setTxtVisible(!txtVisible)} showSettings={() => setExplorerVisible(!explorerVisible)} />
        </Activity>

        {/* control panel  */}
        <Panel showSettings={() => setSettingsVisible(!settingsVisible)} visible={panelVisible} className={``} />

        {/* txt file */}
        <Activity mode={txtVisible ? "visible" : "hidden"}>
          <TextFile closeFile={() => setTxtVisible(!txtVisible)} />
        </Activity>

        {/* taskbar */}
        <div className={`w-full fixed bottom-0 h-auto backdrop-blur-3xl bg-black/45 py-px flex justify-between items-center`}>
          <div className={`w-full flex justify-end items-center py-px gap-2`}>
            <div onClick={() => setStartVisible(!startVisible)} className={`p-1 hover:bg-black/20 duration-150 ease-in-out rounded-md`}>
              <Tooltip id="icon-tooltip" />
              <img data-tooltip-id="icon-tooltip" data-tooltip-content="Start" src="/assets/windows-icons/windows.png" className={`h-7 active:scale-95 cursor-pointer duration-150 ease-in-out`} />
            </div>
            <p className={`h-full flex justify-start items-center rounded-full text-[12px] backdrop-blur-3xl pl-3 pr-24 mr-3 ml-2 text-white border border-gray-300 py-1 bg-white/25 gap-2`}><span className={`font-bold text-[16px]`}><CiSearch className={`text-white font-bold`} /></span> Search</p>
            {taskbar.map((icon) => {
              return <div key={icon.name} onClick={() => {
                if (icon.clickable && icon.link) {
                  window.open(icon.link, '_blank');
                }

                if (icon.name === 'Notepad') {
                  setTxtVisible(!txtVisible);
                }

                if (icon.name === 'File Explorer') {
                  setExplorerVisible(!explorerVisible);
                }
              }} className={`p-1 hover:bg-black/20 duration-150 ease-in-out rounded-md`}>
                <Tooltip id="icon-tooltip" />
                <img src={icon.icon} data-tooltip-id="icon-tooltip" data-tooltip-content={icon.name} className={`h-8 active:scale-95 duration-150 ease-in-out cursor-pointer rounded-md`} />
              </div>
            })}
          </div>

          <div className={`w-auto pr-8 pl-32 flex justify-center items-center`}>
            <div className={`w-auto mr-5 cursor-pointer shrink-0 flex flex-col justify-center items-center`}>
              <span className={`text-white text-[12px]`}>ENG</span>
              <span className={`text-white text-[12px] `}>IN</span>
            </div>

            <div onClick={() => setPanelVisible(!panelVisible)} className={`w-auto flex justify-center cursor-pointer duration-150 ease-in-out items-center gap-2`}>
              <span className={`text-white cursor-pointer`}><IoIosWifi /></span>
              <span className={`text-white cursor-pointer`}><IoIosVolumeHigh /></span>
              <span className={`text-white cursor-pointer`}><CiBatteryFull /></span>
            </div>

            <div className={`w-auto ml-5 cursor-pointer shrink-0 flex flex-col justify-center items-end`}>
              <span className={`text-white text-[12px]`}>{time}</span>
              <span className={`text-white text-[12px] `}>{today}</span>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default page
