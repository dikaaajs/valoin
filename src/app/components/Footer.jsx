"use client";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";

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
        <img
          src="/topography.png"
          className="absolute md:right-0 rotate-90 md:rotate-0 bottom-[-20px] md:bottom-0"
          alt=""
        />

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
                <li className="underline">
                  <Link href={"/blog/about"}>tentang valoin</Link>
                </li>
                <li className="underline">
                  <Link href={"/blog/tujuan"}>tujuan aplikasi</Link>
                </li>
                <li className="underline">
                  <Link href={"/main"}>lineup</Link>
                </li>
                <li className="underline">
                  <Link href={"https://playvalorant.com/"}>Valorant</Link>
                </li>
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
                <li className="underline">
                  <Link href={"/blog/howtouse"}>cara pake</Link>
                </li>
                <li className="underline">
                  <Link href={"/blog/privasi"}>kebijakan privasi</Link>
                </li>
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
                  <Link href={"https://www.instagram.com/dikaaa.js/"}>
                    <img src="/logo/instagram.svg" alt="" />
                  </Link>
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
