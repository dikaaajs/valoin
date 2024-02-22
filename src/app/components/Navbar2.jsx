"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar2() {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`${
        active
          ? "w-full h-full fixed backdrop-blur-sm bg-white/30 z-40 inset-0"
          : ""
      }`}
    >
      <div
        className={`fixed bottom-5 left-5 w-[45px] p-[10px] bg-purple-500 rounded-full duration-300 z-50 ${
          active ? "tdrotation" : ""
        }`}
        onClick={() => setActive(!active)}
      >
        <img
          src={`/svg/${active ? "close-3" : "nav"}.svg`}
          className={`duration-300`}
        />
      </div>

      <div
        className={`w-full fixed bottom-[23px] duration-300 left-[40px] z-40 ${
          active ? "h-[250px]" : "h-[0px]"
        }`}
      >
        <div className="w-[5px] h-full bg-white rounded absolute left-0"></div>

        <div className="flex flex-col gap-[30px] pt-[15px] px-[10px]">
          <Link
            href={"/main"}
            onClick={() => setActive(false)}
            className={`px-[10px] py-[5px] text-white bg-purple-500 underline text-[1rem] rounded font-poppins-bold w-fit uppercase duration-500 delay-300 ${
              active ? "translate-x-[0px]" : "translate-x-[-300px]"
            }`}
          >
            lineup
          </Link>

          <Link
            href={"/blindpick"}
            onClick={() => setActive(false)}
            className={`px-[10px] py-[5px] text-white bg-purple-500 underline text-[1rem] rounded font-poppins-bold w-fit uppercase duration-500 delay-500 ${
              active ? "translate-x-[0px]" : "translate-x-[-300px]"
            }`}
          >
            blind pick agent
          </Link>

          <Link
            href={"/"}
            onClick={() => setActive(false)}
            className={`px-[10px] py-[5px] text-white bg-purple-500 underline text-[1rem] rounded font-poppins-bold w-fit uppercase duration-500 delay-700 ${
              active ? "translate-x-[0px]" : "translate-x-[-300px]"
            }`}
          >
            home
          </Link>
        </div>
      </div>
    </div>
  );
}
