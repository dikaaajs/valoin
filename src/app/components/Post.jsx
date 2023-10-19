"use client";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});
const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});
export default function Post(props) {
  const { judul, keterangan, imageUrl, tag } = props.post;

  return (
    <div className="bg-white w-[30%] px-[20px] py-[10px]">
      <h2
        className={`text-[.8rem] ${poppins.className} py-[10px] uppercase text-black`}
      >
        {judul}
      </h2>
      <div className="relative">
        <img src={imageUrl} alt="" />
        {tag.length !== 0 && (
          <>
            {tag.map((i) => {
              if (i === undefined) {
                return;
              }
              return (
                <div
                  key={i}
                  className={`text-[.7rem] text-black bg-white rounded-[5px] px-[10px] py-[5px] absolute bottom-2 right-2`}
                >
                  {i}
                </div>
              );
            })}
          </>
        )}
      </div>
      <p
        className={`${robotoMono.className} text-[.8rem] py-[10px] text-black`}
      >
        {keterangan}
      </p>
      <button
        className={`btn !bg-blue-400 !text-white text-[.8rem] rounded-[3px] ${inter.className} ml-auto block my-[20px]`}
      >
        details
      </button>
    </div>
  );
}
