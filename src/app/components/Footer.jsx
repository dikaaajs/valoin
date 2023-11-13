"use client";
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "700",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Footer() {
  return (
    <div className="w-full">
      <div className="px-[10px] md:px-[50px] bg-white relative h-fit overflow-hidden bottom-0">
        <img src="/topography.png" className="absolute right-0 h-full" alt="" />

        {/* parent components */}
        {/* support */}
        <div className="flex flex-col lg:flex-row lg:gap-[70px] gap-[20px] py-[50px] justify-center">
          <div className="w-fit relative md:leading-7 leading-5">
            <p className={`${poppins.className} text-[1.2rem]`}>support me</p>
            <a href="https://saweria.co/dikaaajs">
              <img
                src="/saweria.png"
                className="w-[20px] py-[10px] md:w-[30px]"
              />
            </a>
          </div>

          {/* section tq */}
          <div className="w-full md:w-fit relative">
            <div className="w-fit md:leading-7 leading-5 text-black">
              <p className={`${poppins.className} text-[1.2rem]`}>thank you</p>
              <p className={`${inter.className} text-[.5rem] md:text-[.8rem] `}>
                I hope this website can be useful for you
              </p>
            </div>
          </div>

          {/* valoin */}
          <div className="w-full md:w-fit relative">
            <div className="w-fit md:leading-7 leading-5 text-black">
              <p className={`${poppins.className} text-[1.2rem]`}>valoin</p>
              <ul
                className={`${inter.className} text-[.5rem] md:text-[.8rem] `}
              >
                <li className="underline">tentang valoin</li>
                <li className="underline">tujuan aplikasi</li>
                <li className="underline">lineup</li>
                <li className="underline">valorant</li>
              </ul>
            </div>
          </div>

          {/* bantuan */}
          <div className="w-full md:w-fit relative">
            <div className="w-fit md:leading-7 leading-5 text-black">
              <p className={`${poppins.className} text-[1.2rem]`}>
                bantuan & panduan
              </p>
              <ul
                className={`${inter.className} text-[.5rem] md:text-[.8rem] `}
              >
                <li className="underline">cara pake</li>
                <li className="underline">syarat dan ketentuan</li>
                <li className="underline">kebijakan privasi</li>
              </ul>
            </div>
          </div>

          {/* sosmed */}
          <div className="w-full md:w-fit relative">
            <div className="w-fit md:leading-7 leading-5 text-black">
              <p className={`${poppins.className} text-[1.2rem]`}>
                ikuti kami (saya)
              </p>
              <ul
                className={`${inter.className} text-[.5rem] md:text-[.8rem] flex gap-[5px]`}
              >
                <li className="underline">
                  <img src="/logo/instagram.svg" alt="" />
                </li>
                <li className="underline">
                  <img src="/logo/facebook.svg" alt="" />
                </li>
                <li className="underline">
                  <img src="/logo/twetter.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[5px] text-center text-[.5rem] bg-slate-950 text-white md:text-[.8rem]">
        2023, dikaaa.tech
      </div>
    </div>
  );
}
