"use client";
import { Poppins, Roboto, Roboto_Mono, Inter } from "next/font/google";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  preload: true,
});

const PoppinsText = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function Home() {
  const judulValoin = useRef();
  const judulTengah = useRef();
  const judulBawah = useRef();
  const agentSection = useRef();
  const [tinggi, setTinggi] = useState();
  const [lineupCount, setLineupCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [versiApp, setVersiApp] = useState(0);

  const getStats = async () => {
    const response = await axios.get("/api/stats/general");
    const data = response.data;
    setLineupCount(data.lineupCount);
    setUserCount(data.userCount);
    setVersiApp(data.versi);
  };

  useEffect(() => {
    getStats();
    if (judulBawah !== undefined && judulValoin !== undefined) {
      setTinggi(judulBawah.current.offsetTop - judulValoin.current.offsetTop);
    }
  }, [judulBawah]);

  return (
    <main className="overflow-hidden relative">
      {judulBawah.current !== undefined &&
        judulValoin.current !== undefined && (
          <>
            <img
              src="/ellipse.png"
              alt=""
              className="absolute left-[40px] z-20"
              style={{ top: judulValoin.current.offsetTop + 15 }}
            />
            <img
              src="/ellipse.png"
              alt=""
              className="absolute left-[40px] z-20"
              style={{ top: judulTengah.current.offsetTop + 10 }}
              id="tengah"
            />
            <img
              src="/ellipse.png"
              alt=""
              className="absolute left-[40px] z-20"
              style={{ top: judulBawah.current.offsetTop }}
            />
            <div
              className={`z-[10] absolute top-[120px] left-[-20px] w-[80px] border-white border-b-[0px] border-[4px] bg-opacity-0 rounded-tr-[10px]`}
              style={{ height: `${tinggi + 150}px` }}
            ></div>
            <div
              className="border-[4px] border-t-[0px] border-r-[0px] h-[50px] border-white w-full absolute rounded-bl-[10px] left-[56px] z-[-1]"
              style={{ top: `${judulBawah.current.offsetTop - 30}px` }}
            ></div>
          </>
        )}

      {/* jumbotron */}
      <div className="flex flex-col md:flex-row gap-y-[100px] items-center px-[3%] justify-center md:h-[750px]">
        <div className="w-full lg:w-1/2">
          <h1
            className={` ${PoppinsJudul.className} text-[3rem] text-white`}
            ref={judulValoin}
          >
            VALO<span className="text-[#7F5AF0]">IN </span>
          </h1>
          <p
            className={`!${inter.className} text-[#94A1B2] text-[.8rem] md:text-[1rem] opacity-70 leading-[18px] md:leading-6`}
          >
            susah menghafal lineup ? pakai website ini untuk mendapatkan
            informasi sekitaran lineup.
          </p>
          <div className={`w-fit mt-[20px] relative ${robotoMono.className}`}>
            <img
              src="/satchel.webp"
              className="absolute bottom-[-30px] right-[-40px]"
              alt=""
            />
            <Link
              href={"/main"}
              className={`${robotoMono.className} text-[.8rem] bg-white px-[17px] py-[10px] w-fit flex items-center text-slate-800`}
            >
              coba{" "}
              <span className="material-symbols-outlined opacity-90">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        <div>
          <img src="/jumbotronImg.webp" className="w-[450px]" alt="valoin" />
        </div>
      </div>

      {/* agent */}
      <div
        className="h-[850px] bg-[#242629] text-white flex flex-col lg:flex-row gap-[20px] px-[20px] md:px-[50px] items-center text-center lg:text-left"
        ref={agentSection}
      >
        {/* stats website */}
        <div
          className="bg-white h-[150px] w-[80%] lg:w-[70%] rounded-[10px] mx-auto absolute top-[-70px] left-1/2 transform -translate-x-1/2 text-black flex gap-[90px] justify-center px-[20px] items-center"
          style={{ top: agentSection?.current?.offsetTop - 70 }}
        >
          <div className="text-center">
            <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
              {lineupCount}
            </p>
            <h1 className={`${robotoMono.className} text-[.8rem]`}>
              lineup dibuat
            </h1>
          </div>
          <div className="text-center">
            <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
              {userCount}
            </p>
            <h1 className={`${robotoMono.className} text-[.8rem]`}>
              user terdaftar
            </h1>
          </div>
          <div className="text-center">
            <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
              {versiApp}
            </p>
            <h1 className={`${robotoMono.className} text-[.8rem]`}>
              versi aplikasi
            </h1>
          </div>
        </div>

        <div className="w-full lg:w-2/5 mx-auto">
          <h1
            className={`${PoppinsJudul.className} text-[2rem] md:text-[2.5rem] leading-[35px]`}
            ref={judulTengah}
          >
            Agent Dalam <span className="text-red-600">Valorant</span>
          </h1>
          <p
            className={`${inter.className} text-[.8rem] md:text-[1rem] opacity-70 leading-5 pt-[15px]`}
          >
            kamu pemain baru, dan bingung dengan banyaknya ability tiap agent
            yang berbeda beda ? eitss tenang. Disini kamu bisa memahami ability
            tiap agent dengan mudah
          </p>
        </div>
        <div className="w-full lg:w-3/5 xl:w-[50%]">
          <img
            src="/valorantCharacter.webp"
            alt="character valorant"
            className="w-full rounded-[3px]"
          />
        </div>
      </div>

      {/* buat lineup */}
      <div className="h-[700px] px-[20px] md:px-[50px] mb-[200px]">
        <div className="pt-[130px] w-fit px-[50px] bg-[#16161A] mx-auto">
          <h1
            className={`${PoppinsJudul.className} text-[2rem] md:text-[2.5rem] leading-[35px] text-white text-center `}
            ref={judulBawah}
          >
            Sharing Lineup
          </h1>
        </div>

        <div className="flex py-[150px] items-center pb-[100px] gap-[30px] px-[20px] md:px-[50px] ">
          <img
            src="/addLineup.png"
            className="w-[50%] shadow-xl shadow-[#7F5AF0]"
            alt="upload your lineup"
          />
          <div className="flex flex-col gap-[10px]">
            <p
              className={`${inter.className} text-[.8rem] md:text-[1rem] opacity-70 text-white`}
            >
              kamu bisa sharing lineup yang kamu punya disini. dengan cara
              daftar terlebih dahulu
            </p>
            <Link
              className={`btn rounded-[3px] ${PoppinsText.className} text-slate-800 w-fit`}
              href={"/auth/register"}
            >
              signup
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
