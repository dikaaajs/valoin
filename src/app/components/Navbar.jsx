import React from "react";
import Image from "next/legacy/image";
import { Poppins } from "next/font/google";
import Link from "next/link";

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
      <div className="w-1/3 flex gap-[20px] items-center">
        <img src="/humberger.svg" className="w-[33px] h-fit" />
      </div>

      <Link
        href={"/"}
        className={`w-fit ${[
          PoppinsJudul.className,
        ]} text-[1.5rem] md:text-[2.5rem] w-1/3`}
      >
        <h1 className="text-white text-center">
          VALO<span className="text-[#7F5AF0]">IN</span>
        </h1>
      </Link>

      <div className="w-1/3 flex justify-end items-center relative text-[.8rem] gap-[10px]">
        <Link
          className={`btn rounded-[3px] ${PoppinsP.className} text-slate-800`}
          href={"/auth/register"}
        >
          signup
        </Link>
        <Link
          className={`btn rounded-[3px] ${PoppinsP.className} text-slate-800`}
          href={"login"}
        >
          login
        </Link>
      </div>
    </nav>
  );
}
