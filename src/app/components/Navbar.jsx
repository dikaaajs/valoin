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
    <nav className="flex mx-[15px] md:mx-[20px] pt-[8px] pb-[10px] border-b-[1px] border-white border-opacity-50 items-center justify-between relative">
      <div className="w-fit flex gap-[20px] items-center">
        <img src="/humberger.svg" className="w-[33px] h-fit" />
      </div>

      <div
        className={`w-fit ${[
          PoppinsJudul.className,
        ]} text-[1.5rem] md:text-[2.5rem]`}
      >
        <h1 className="text-white text-center">
          VALO<span className="text-[#7F5AF0]">IN</span>
        </h1>
      </div>

      <div className="w-fit flex justify-end items-center relative">
        <a href="https://saweria.co/dikaaajs">
          <img
            src="/ikuyo.gif"
            className="w-[30px] mdLw-[50px] rounded-full border-solid border-[2px] border-[#7F5AF0] cursor-pointer"
            alt="ikuyoooo"
          />
        </a>
      </div>
      <img
        src="/message.png"
        className="absolute bottom-[-50px] right-0"
        alt=""
      />
    </nav>
  );
}
