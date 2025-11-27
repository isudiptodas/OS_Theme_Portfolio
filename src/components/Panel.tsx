'use client'
import { FaBatteryFull } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaWifi } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaBluetoothB } from "react-icons/fa";
import { IoAirplaneOutline } from "react-icons/io5";
import { TbBatteryEco } from "react-icons/tb";
import { ImBrightnessContrast } from "react-icons/im";
import { IoAccessibilityOutline } from "react-icons/io5";
import { CiBrightnessUp } from "react-icons/ci";
import { IoVolumeHighOutline } from "react-icons/io5";

function Panel({ className, visible }: { className: string, visible: boolean }) {
  return (
    <>
      <div className={`w-[25%] shadow-2xl border border-gray-600 z-30 flex flex-col justify-between items-center ${visible ? "-translate-y-14" : "translate-y-full"} duration-200 bottom-0 ease-in-out h-[55%] absolute right-5 ${className} bg-zinc-800 rounded-md`}>

        {/* network controls */}
        <div className={`w-full h-full flex flex-col justify-start items-center`}>
            <div className={`w-full h-[65%] border-b border-gray-600 pb-3 pt-5 grid grid-cols-3 justify-items-center px-3 gap-3`}>
              
              {/* indivisual boxes */}
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-evenly items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><FaWifi/></span>
                  <span className={`text-lg`}><MdOutlineKeyboardArrowRight /></span>
                </div>
                <p className={`text-white text-[10px]`}>Wi-Fi</p>
              </div>
              
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-evenly items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><FaBluetoothB/></span>
                  <span className={`text-lg`}><MdOutlineKeyboardArrowRight /></span>
                </div>
                <p className={`text-white text-[10px]`}>Bluetooth</p>
              </div>
              
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-center items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><IoAirplaneOutline /></span>
                </div>
                <p className={`text-white text-[10px]`}>Airplane Mode</p>
              </div>
              
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-center items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><TbBatteryEco/></span>
                </div>
                <p className={`text-white text-[10px]`}>Energy Saver</p>
              </div>
              
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-center items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><ImBrightnessContrast/></span>
                </div>
                <p className={`text-white text-[10px]`}>Night Light</p>
              </div>
              
              <div className={`w-full flex flex-col justify-center items-center gap-1`}>
                <div className={`w-full text-white flex justify-evenly items-center rounded-md border border-gray-600 py-3 px-2 cursor-pointer hover:bg-white/5 duration-150 ease-in-out`}>
                  <span><IoAccessibilityOutline/></span>
                  <span className={`text-lg`}><MdOutlineKeyboardArrowRight /></span>
                </div>
                <p className={`text-white text-[10px]`}>Accessibility</p>
              </div>
            </div>

            {/* volume and brightness */}
            <div className={`h-[25%] w-full flex flex-col justify-end items-center gap-3`}>
              <div className={`w-full h-auto flex justify-between items-center px-5`}>
                <span className={`w-auto text-white text-xl`}><CiBrightnessUp /></span>
                <input type="range" min='0' max='100' className={`w-[85%]`} />
              </div>
              <div className={`w-full h-auto flex justify-between items-center px-5`}>
                <span className={`w-auto text-white text-xl`}><IoVolumeHighOutline  /></span>
                <input type="range" min='0' max='100' className={`w-[85%]`} />
              </div>
            </div>
        </div>

        {/* battery */}
        <div className={`w-full h-[20%] bg-zinc-900 rounded-b-md flex justify-between items-center pl-5 pr-1`}>
          <p className={`w-auto flex justify-center items-center gap-1 text-white text-[12px]`}><span className={`text-white text-xl`}><FaBatteryFull /></span> 70%</p>
          <span className={`text-white cursor-pointer hover:bg-black/20 duration-150 ease-in-out p-3 rounded-md`}><IoSettingsOutline /></span>
        </div>
      </div>
    </>
  )
}

export default Panel
