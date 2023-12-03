"use client";
import React, { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Message from "./Message";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <nav className="flex mx-[15px] md:mx-[20px] pt-[8px] pb-[10px] border-b-[1px] border-white border-opacity-50 items-center justify-between relative">
      <div className="w-1/3 flex gap-[20px] items-center">
        <Link
          href={status === "authenticated" ? "/main/upload" : "#"}
          className={`btn rounded-[3px] ${
            PoppinsP.className
          } text-slate-800 !text-[.7rem] !px-[10px] !py-[5px] ${
            status === "authenticated" ? "" : "cursor-not-allowed opacity-50"
          }`}
        >
          <p className="flex items-center gap-[5px]">
            <span className="material-symbols-outlined">upload</span> upload
          </p>
        </Link>
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
        {status === "authenticated" ? (
          <img
            src={session?.user.image}
            alt="profile picture"
            onClick={() => router.push(`/profile/${session?.user.name}`)}
            className="w-[45px] h-[45px] bg-white rounded-full cursor-pointer"
          />
        ) : (
          <>
            <Link
              className={`btn rounded-[3px] ${PoppinsP.className} text-slate-800`}
              href={"/auth/register"}
            >
              signup
            </Link>
            <Link
              className={`btn rounded-[3px] ${PoppinsP.className} text-slate-800`}
              href={"/api/auth/signin"}
            >
              login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
