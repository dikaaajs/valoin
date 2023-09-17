"use client";

import dynamic from "next/dynamic";
import { Poppins, Inter } from "next/font/google";
import { useState } from "react";
const Map = dynamic(() => import("./map"), { ssr: false });

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function page() {
  const [map, setMap] = useState("ascent");
  const [agent, setAgent] = useState("sova");

  const selectMapHandle = (e) => {
    setMap(e.target.value);
  };

  return (
    <div className="py-[100px] w-full relative">
      <div
        className={`w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] lg:w-[40vw] lg:h-[40vw] mx-auto relative cursor-move`}
      >
        <Map selectedMap={map} />
      </div>
      <div className="flex flex-wrap gap-[5px] py-[90px] w-[70%] mx-auto justify-center">
        <img src="/agent/astra/astra.svg" className="w-[60px]" alt="" />
        <img src="/agent/breach/breach.svg" className="w-[60px]" alt="" />
        <img src="/agent/brimstone/brimstone.svg" className="w-[60px]" alt="" />
        <img src="/agent/chamber/chamber.svg" className="w-[60px]" alt="" />
        <img src="/agent/cyper/cyper.svg" className="w-[60px]" alt="" />
        <img src="/agent/deadlock/deadlock.svg" className="w-[60px]" alt="" />
        <img src="/agent/fade/fade.svg" className="w-[60px]" alt="" />
        <img src="/agent/gekko/gekko.svg" className="w-[60px]" alt="" />
        <img src="/agent/harbor/harbor.svg" className="w-[60px]" alt="" />
        <img src="/agent/jett/jett.svg" className="w-[60px]" alt="" />
        <img src="/agent/kayo/kayo.svg" className="w-[60px]" alt="" />
        <img src="/agent/killjoy/killjoy.svg" className="w-[60px]" alt="" />
        <img src="/agent/neon/neon.svg" className="w-[60px]" alt="" />
        <img src="/agent/omen/omen.svg" className="w-[60px]" alt="" />
        <img src="/agent/phonix/phonix.svg" className="w-[60px]" alt="" />
        <img src="/agent/raze/raze.svg" className="w-[60px]" alt="" />
        <img src="/agent/reyna/reyna.svg" className="w-[60px]" alt="" />
        <img src="/agent/sage/sage.svg" className="w-[60px]" alt="" />
        <img src="/agent/sky/sky.svg" className="w-[60px]" alt="" />
        <img src="/agent/sova/sova.svg" className="w-[60px]" alt="" />
        <img src="/agent/viper/viper.svg" className="w-[60px]" alt="" />
        <img src="/agent/yoru/yoru.svg" className="w-[60px]" alt="" />
      </div>

      {/* display data */}
      <div className="absolute top-[50px] left-[50px] text-white">
        <h1 className={`${poppins.className} text-[2rem]`}>
          {map.toUpperCase()}
        </h1>
        <div
          className={`px-[10px] py-[5px] flex gap-[20px] border-solid border-white border-[1px] w-fit ${inter.className} text-[.8rem]`}
        >
          <button>attacking</button>
          <button className="text-blue-300">defending</button>
        </div>
        <div className="flex gap-[10px] pt-[20px]">
          <button>
            <img
              src="/image/displayicon (1) 1.png"
              className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
              alt=""
            />
          </button>
          <button>
            <img
              src="/image/displayicon (2) 1.png"
              className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
              alt=""
            />
          </button>
          <button>
            <img
              src="/image/displayicon (3) 1.png"
              className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
              alt=""
            />
          </button>
          <button>
            <img
              src="/image/displayicon 1.png"
              className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
              alt=""
            />
          </button>
        </div>
      </div>

      <div className="absolute top-[50px] right-[50px]">
        <select
          name="maps"
          id="selectMap"
          className={`${inter.className} rounded-[5px] `}
          onChange={(e) => selectMapHandle(e)}
        >
          <option value="ascent">ascent</option>
          <option value="bind">bind</option>
          <option value="breeze">breeze</option>
          <option value="fracture">fracture</option>
          <option value="haven">haven</option>
          <option value="icebox">icebox</option>
          <option value="lotus">lotus</option>
          <option value="pearl">pearl</option>
          <option value="split">split</option>
          <option value="sunset">sunset</option>
        </select>
      </div>
    </div>
  );
}
