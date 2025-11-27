'use client'
import { FaApple } from "react-icons/fa";
import ProgressBar from "@ramonak/react-progress-bar";
import { Activity, useEffect, useState } from "react";
import { FaBatteryFull } from "react-icons/fa6";
import { IoWifi } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { dockList } from "@/data/dock";
import { Tooltip } from 'react-tooltip';
import Terminal from "@/components/Terminal";
import Settings from "@/components/Settings";
import Notes from "@/components/Notes";
import { FaCircleExclamation } from "react-icons/fa6";

function page() {

    const [percentage, setPercentage] = useState<number>(0);
    const [macosVisible, setMacosVisible] = useState(false);
    const [hideLoading, setHideLoading] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const date = new Date();
    const formattedDate = date.toLocaleString('en-us', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    const [openedApps, setOpenedApps] = useState<string[]>([]);

    useEffect(() => {

        const timer = setInterval(() => {
            setPercentage(prev => prev + 20);
        }, 500);

        const stop = setTimeout(() => {
            clearInterval(timer);
            setMacosVisible(true);
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

    const navigate = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <>
            <div className={`w-full h-screen bg-zinc-950 flex flex-col justify-center items-center gap-3 xl:hidden`}>
                <span className={`text-3xl md:text-5xl text-white opacity-30`}><FaCircleExclamation /></span>
                <p className={`w-full text-center px-4 font-semibold text-xl md:text-2xl text-white opacity-30`}>This page is only available for desktop screens</p>
            </div>

            <div className={`w-full ${hideLoading ? "hidden" : "block"} absolute top-0 ${macosVisible ? "opacity-0" : "opacity-100"} duration-300 ease-in-out h-screen hidden bg-zinc-950 xl:flex justify-center items-center gap-3`}>
                <span><FaApple className={`text-white text-2xl`} /></span>
                <ProgressBar
                    completed={percentage as number}
                    width="100px"
                    height="5px"
                    bgColor="#ffffff"
                    baseBgColor="#000000" />
            </div>

            {/* search popup */}
            <div className={`${searchVisible ? "block" : "hidden"} absolute h-screen top-0 z-10 w-full flex justify-center items-center`}>
                <div className={`w-full h-full backdrop-blur-md bg-black/20`} onClick={() => setSearchVisible(false)}>
                    <div onClick={(e) => e.stopPropagation()} className={`w-1/2 h-auto z-20 backdrop-blur-3xl bg-white/40 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-lg flex flex-col justify-start items-center`}>
                        <div className={`w-full h-auto flex justify-between items-center gap-3 px-4 py-4 border-b border-zinc-300`}>
                            <span><FaSearch /></span>
                            <input type="text" className={`w-full outline-none text-lg pl-4`} placeholder="Search Education, Projects, Skills" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`w-full h-screen hidden relative xl:flex justify-center items-center overflow-hidden`}>
                <img src="/assets/macos-sudipto.jpg" className={`absolute top-0 h-full w-full object-top`} />

                <nav className={`w-full h-auto px-3 py-3 flex justify-between items-center backdrop-blur-3xl bg-black/10 fixed top-0`}>
                    <div className={`w-auto flex justify-center items-center gap-4`}>
                        <span><FaApple className={`text-lg cursor-pointer`} /></span>
                        <p className={`font-bold text-sm cursor-pointer`}>Sudipto's Portfolio</p>
                        <p className={`text-sm cursor-pointer`}>File</p>
                        <p className={`text-sm cursor-pointer`}>Edit</p>
                        <p className={`text-sm cursor-pointer`}>View</p>
                        <p className={`text-sm cursor-pointer`}>Help</p>
                    </div>

                    <div className={`w-auto flex justify-center items-center gap-4`}>
                        <span data-tooltip-content="Spotlight Search" data-tooltip-id="search"><FaSearch onClick={() => setSearchVisible(true)} className={`text-[14px] cursor-pointer`} /></span>
                        <span><IoWifi className={`text-lg cursor-pointer`} /></span>
                        <span data-tooltip-content="Battery : 100%" data-tooltip-id="battery"><FaBatteryFull className={`text-lg cursor-pointer`} /></span>
                        <Tooltip id="battery" />
                        <Tooltip id="search" />
                        <p className={`text-sm cursor-pointer`}>{formattedDate}</p>
                    </div>
                </nav>

                <Activity mode={openedApps.length > 0 && openedApps.includes("Terminal") ? "visible" : "hidden"}>
                    <Terminal />
                </Activity>
                <Activity mode={openedApps.length > 0 && openedApps.includes("Notes") ? "visible" : "hidden"}>
                    <Notes />
                </Activity>
                <Activity mode={openedApps.length > 0 && openedApps.includes("Settings") ? "visible" : "hidden"}>
                    <Settings />
                </Activity>

                {/* dock list */}
                <div className={`w-full z-30 fixed bottom-5 flex justify-center items-center`}>
                    <div className={`w-auto backdrop-blur-3xl bg-white/20 rounded-xl flex justify-evenly items-center`}>
                        {dockList.map((dock) => {
                            return <div key={dock.name} className={`h-auto relative w-auto flex justify-center items-center`}>
                                <img onClick={() => {
                                    if(!(dock.name === 'Github' || dock.name === 'LinkedIn' || dock.name === 'Mail')){
                                        if(openedApps.includes(dock.name)){
                                            setOpenedApps(openedApps.filter((app) => app !== dock.name));
                                        }
                                        else{
                                            setOpenedApps(prev => [...(prev ?? []), dock.name as string]);
                                        }
                                    }
                                    if(dock.clickable && dock.link){
                                        navigate(dock?.link)
                                    }
                                }} src={dock.icon} data-tooltip-id="icon-tooltip" data-tooltip-content={dock.name} className={`h-16 cursor-pointer group hover:scale-125 hover:-translate-y-3 duration-200 ease-in-out`} />
                                <Tooltip id="icon-tooltip" />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
