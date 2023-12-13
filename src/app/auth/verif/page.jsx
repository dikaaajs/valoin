"use client";
import axios from "axios";
import { Poppins, Roboto_Mono } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Verif() {
  const [verified, setVerified] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("e");
  const token = searchParams.get("t");

  const handleVerify = async () => {
    try {
      await axios.post("/api/user/verify/confirm", {
        email,
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    const res = await axios.post("/api/user/byEmail", { email });
    if (res.data.user.tag.includes("verified")) {
      setVerified(true);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="min-h-screen">
      {verified === true ? (
        <div className="py-[50px] border-white border-[1px] rounded-[9px] w-[80%] mx-auto relative top-[250px]">
          <h1
            className={`text-lime-400 text-[2rem] ${PoppinsJudul.className} text-center`}
          >
            Berhasil melakukan verifikasi ✔
          </h1>
          <p className="text-white text-center">
            email {email} telah diverifikasi
          </p>
          <Link
            className={`py-[10px] px-[20px] bg-blue-500 text-white rounded-[5px] mx-auto block ${robotoMono.className} text-[.8rem] my-[20px] w-fit`}
            href={"/"}
          >
            homepage
          </Link>
        </div>
      ) : (
        <div className="py-[50px] border-white border-[1px] rounded-[9px] w-[80%] mx-auto relative top-[250px]">
          <h1
            className={`text-white text-[2rem] ${PoppinsJudul.className} text-center`}
          >
            Verifikasi dengan satu klik
          </h1>
          <p className="text-white text-center">email {email} akan di verify</p>
          <button
            className={`py-[10px] px-[20px] bg-blue-500 text-white rounded-[5px] mx-auto block ${
              robotoMono.className
            } text-[.8rem] my-[20px] ${
              token === null
                ? "cursor-not-allowed bg-slate-600 opacity-80"
                : "cursor-pointer"
            }`}
            onClick={handleVerify}
          >
            verif email
          </button>
        </div>
      )}
    </div>
  );
}
