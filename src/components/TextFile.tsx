'use client'

import { Rnd } from "react-rnd"

function TextFile({closeFile} : {closeFile: () => void}) {
  return (
    <>
      <Rnd dragAxis="both" bounds="">
        <div className={`w-[600px] h-[500px] bg-zinc-900 rounded-md shadow-2xl overflow-hidden border border-gray-700`}>

        </div>
      </Rnd>
    </>
  )
}

export default TextFile
