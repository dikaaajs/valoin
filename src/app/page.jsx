"use client";
import Link from "next/link";
import StatsWeb from "./components/StatsWeb";

export default function Home() {
  return (
    <main className="overflow-hidden relative">
      {/* jumbotron */}
      <div className="flex flex-col md:flex-row md:gap-y-[100px] gap-y-[30px] items-center px-[3%] py-[100px] justify-center">
        <div className="w-full lg:w-1/2 order-2">
          <h1
            className={`font-poppins-bold text-[2rem] md:text-[2.5rem] text-center md:text-left text-white`}
          >
            valoin - temukan lineup valorant mu disini !
          </h1>
          <Link
            href={"/main"}
            className={`font-robotomono-medium text-[1rem] bg-blue-500 hover:scale-125 duration-300 px-[17px] py-[8px] w-fit flex mx-auto md:mx-0 my-[15px] text-white rounded-[5px]`}
          >
            mulai
          </Link>
        </div>

        <div className="order-1">
          <img src="/right main (1).webp" className="w-[95%]" alt="valoin" />
        </div>
      </div>

      {/* apa itu valoin */}
      <div className="h-[850px] relative bg-[#2e2d2e] text-white flex flex-col lg:flex-row gap-[20px] px-[20px] md:px-[50px] py-[100px] items-center text-center lg:text-left">
        <StatsWeb />

        <div className="w-full lg:w-2/5 mx-auto">
          <h1
            className={`font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px]`}
          >
            apa itu valoin ?
          </h1>
          <p className={`text-[.7rem] md:text-[1rem] pt-[15px]`}>
            valoin, tempat utama kamu untuk menemukan dan menguasai lineup
            terbaik dalam game Valorant. untuk meraih kemenangan dalam
            pertempuran, strategi dan koordinasi tim sangat penting. Itulah
            mengapa kami hadir untuk membantu Anda meningkatkan permainan Anda
            melalui panduan lineup yang tepat.
          </p>
          <p className={`text-[.7rem] md:text-[1rem] pt-[15px]`}>
            fitur utama pada website ini ada pada guide lineup menggunakan
            gambar. jadi kalian tidak perlu memuat video untuk melihat guide
            lineup
          </p>
        </div>
        <div className="w-[80%] md:w-full lg:w-3/5 xl:w-[50%] relative hover:scale-110 duration-300 group top-[150px] md:top-0">
          <img
            src="/jett-bingung.webp"
            alt="jett emoji"
            className="absolute z-[10] top-[-50px] left-0 w-[50%] md:w-[35%] group-hover:rotate-12 duration-200"
          />
          <img
            src="/card-lineup.webp"
            alt="character valorant"
            className="rounded-[3px] mx-auto"
          />
        </div>
      </div>

      {/* buat lineup */}
      <div className="h-[700px] px-[20px] md:px-[50px] mb-[200px]">
        <div className="pt-[130px] w-fit md:px-[50px] bg-[#16161A] mx-auto">
          <h1
            className={`font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px] text-white text-center `}
          >
            Share Lineup !
          </h1>
        </div>

        <div className="flex flex-col my-[150px] items-center gap-[50px] px-[20px] md:px-[50px] ">
          <div className="relative w-full md:w-[50%] h-auto">
            <img
              src="/brimstone-meme.webp"
              alt="brimstone meme"
              className="absolute bottom-[0px] right-[0px] w-[50%]"
            />
            <img
              src="/addLineup.webp"
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
    </main>
  );
}
