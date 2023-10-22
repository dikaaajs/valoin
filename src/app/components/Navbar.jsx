"use client";
import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUsername } from "../../../libs/redux/useSlice";

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
  const { data: session, status, update } = useSession();
  const [done, setDone] = useState(false);

  const getData = async () => {
    try {
      const user = await axios.post("/api/user/byEmail", {
        email: session.user?.email,
      });
      const data = user.data.user;
      session.user.username = data.username;
      session.user.pp = data.pp;
      setDone(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && done === false) {
      getData();
    }
  }, [session]);

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
        {session !== null ? (
          <img
            src="/ikuyo.gif"
            alt="profile picture"
            className="w-[45px] h-[45px] bg-white rounded-full"
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
              href={"/auth/login"}
            >
              login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
