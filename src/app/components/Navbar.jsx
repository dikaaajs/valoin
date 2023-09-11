import React from "react";
import Image from "next/legacy/image";
import { Poppins } from "next/font/google";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  preload: true,
});

const PoppinsP = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "600",
  preload: true,
});

export default function Navbar() {
  return (
    <nav className="flex mx-[20px] pt-[8px] pb-[10px] border-b-[1px] border-white border-opacity-50 items-center">
      <div className="w-1/3 flex gap-[20px] items-center">
        <img src="/humberger.svg" className="w-[33px] h-fit" />
        <h1 className={`text-white text-[.8rem] ${PoppinsP.className}`}>
          contact
        </h1>
      </div>

      <div className={`w-1/3 ${[PoppinsJudul.className]} text-[2.5rem]`}>
        <h1 className="text-white text-center">
          VALO<span className="text-[#7F5AF0]">IN</span>
        </h1>
      </div>

      <div className="w-1/3 flex justify-end items-center relative">
        <img src="/message.svg" className="absolute bottom-[-90px]" alt="" />
        <img
          src="/ikuyo.gif"
          className="w-[50px] h-[50px] rounded-full border-solid border-[2px] border-[#7F5AF0] cursor-pointer"
          alt="ikuyoooo"
        />
      </div>
    </nav>
  );
}
