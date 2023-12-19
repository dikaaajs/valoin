"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

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
              alt="1"
              className="absolute left-[40px] z-20"
              style={{ top: judulValoin.current.offsetTop + 15 }}
            />
            <h1
              className={`font-montserrat-bold text-black absolute left-[50px] z-30`}
              style={{ top: judulValoin.current.offsetTop + 20 }}
            >
              #1
            </h1>
            <img
              src="/ellipse.png"
              alt="2"
              className="absolute left-[40px] z-20"
              style={{ top: judulTengah.current.offsetTop + 10 }}
              id="tengah"
            />
            <h1
              className={`font-montserrat-bold text-black absolute left-[48px] z-30`}
              style={{ top: judulTengah.current.offsetTop + 15 }}
            >
              #2
            </h1>
            <img
              src="/ellipse.png"
              alt="3"
              className="absolute left-[40px] z-20"
              style={{ top: judulBawah.current.offsetTop }}
            />
            <h1
              className={`font-montserrat-bold text-black absolute left-[48px] z-30`}
              style={{ top: judulBawah.current.offsetTop + 7 }}
            >
              #3
            </h1>
            <div
              className={`z-[10] absolute top-[120px] left-[-20px] w-[80px] border-lime-400 border-b-[0px] border-[3px] bg-opacity-0 rounded-tr-[10px]`}
              style={{ height: `${tinggi + 150}px` }}
            ></div>
            <div
              className="border-[3px] border-t-[0px] border-r-[0px] h-[50px] border-lime-400 w-full absolute rounded-bl-[10px] left-[56.5px] z-[-1]"
              style={{ top: `${judulBawah.current.offsetTop - 30}px` }}
            ></div>
          </>
        )}

      {/* jumbotron */}
      <div className="flex flex-col md:flex-row gap-y-[100px] items-center px-[3%] justify-center md:h-[750px]">
        <div className="w-full lg:w-1/2">
          <h1
            className={`font-poppins-bold text-[2.5rem] text-white`}
            ref={judulValoin}
          >
            valoin - temukan lineup valorant mu disini !
          </h1>
          <div className={`w-fit mt-[20px] relative font-robotomono-medium`}>
            <Link
              href={"/main"}
              className={` text-[1rem] bg-blue-500 hover:scale-125 duration-300 px-[17px] py-[8px] w-fit flex items-center text-white rounded-[5px]`}
            >
              mulai
            </Link>
          </div>
        </div>

        <div>
          <img src="/jumbotronImg.webp" className="w-[450px]" alt="valoin" />
        </div>
      </div>

      {/* apa itu valoin */}
      <div
        className="h-[850px] bg-[#2e2d2e] text-white flex flex-col lg:flex-row gap-[20px] px-[20px] md:px-[50px] items-center text-center lg:text-left"
        ref={agentSection}
      >
        {/* stats website */}
        <div
          className="bg-white h-[150px] w-[80%] lg:w-[70%] rounded-[10px] mx-auto absolute top-[-70px] left-1/2 transform -translate-x-1/2 text-black flex gap-[90px] justify-center px-[20px] items-center"
          style={{ top: agentSection?.current?.offsetTop - 70 }}
        >
          <div className="text-center">
            <p className={`font-poppins-bold text-[1.5rem]`}>{lineupCount}</p>
            <h1 className={`font-robotomono-medium text-[.8rem]`}>
              lineup dibuat
            </h1>
          </div>
          <div className="text-center">
            <p className={`font-poppins-bold text-[1.5rem]`}>{userCount}</p>
            <h1 className={`font-robotomono-medium text-[.8rem]`}>
              user terdaftar
            </h1>
          </div>
          <div className="text-center">
            <p className={`font-poppins-bold text-[1.5rem]`}>{versiApp}</p>
            <h1 className={`font-robotomono-medium text-[.8rem]`}>
              versi aplikasi
            </h1>
          </div>
        </div>

        <div className="w-full lg:w-2/5 mx-auto">
          <h1
            className={`font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px]`}
            ref={judulTengah}
          >
            apa itu valoin ?
          </h1>
          <p className={`text-[1rem] md:text-[1rem] pt-[15px]`}>
            valoin, tempat utama kamu untuk menemukan dan menguasai lineup
            terbaik dalam game Valorant. untuk meraih kemenangan dalam
            pertempuran, strategi dan koordinasi tim sangat penting. Itulah
            mengapa kami hadir untuk membantu Anda meningkatkan permainan Anda
            melalui panduan lineup yang tepat.
          </p>
          <p className={`text-[1rem] md:text-[1rem] pt-[15px]`}>
            fitur utama pada website ini ada pada guide lineup menggunakan
            gambar. jadi kalian tidak perlu memuat video untuk melihat guide
            lineup
          </p>
        </div>
        <div className="w-full lg:w-3/5 xl:w-[50%] relative hover:scale-110 duration-300 group">
          <img
            src="/jett-bingung.png"
            alt="jett emoji"
            className="absolute z-[10] top-[-150px] left-[-50px] scale-75 group-hover:rotate-12 duration-200"
          />
          <img
            src="/card-lineup.png"
            alt="character valorant"
            className="rounded-[3px] mx-auto"
          />
        </div>
      </div>

      {/* buat lineup */}
      <div className="h-[700px] px-[20px] md:px-[50px] mb-[200px]">
        <div className="pt-[130px] w-fit px-[50px] bg-[#16161A] mx-auto">
          <h1
            className={`font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px] text-white text-center `}
            ref={judulBawah}
          >
            Bagikan Lineup mu !
          </h1>
        </div>

        <div className="flex flex-col my-[150px] items-center gap-[50px] px-[20px] md:px-[50px] ">
          <div className="relative w-[50%]">
            <img
              src="/brimstone-meme.png"
              alt="brimstone meme"
              className="absolute bottom-[-120px] right-[-170px] scale-50"
            />
            <img
              src="/addLineup.png"
              className="w-full mx-auto shadow-md shadow-[#7F5AF0] hover:shadow-white hover:shadow-xl duration-300 py-[20px]"
              alt="upload your lineup"
            />
          </div>
          <div className="flex flex-col gap-[20px] justify-center text-center">
            <p
              className={`text-[.8rem] md:text-[1rem] text-white w-[80%] mx-auto`}
            >
              ingin berkontribusi dalam pembuatan lineup ? gabunglah bersama
              kami sebagai creator. cukup dengan daftar kamu bisa membagikan
              lineup yang kamu punya !
            </p>
            <Link
              className={`btn rounded-[3px] font-poppins-medium text-slate-800 w-fit mx-auto duration-300 hover:scale-110 hover:text-white hover:bg-blue-400`}
              href={"/auth/register"}
            >
              daftar
            </Link>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </main>
  );
}
