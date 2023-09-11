import Image from "next/image";
import { Poppins, Roboto, Roboto_Mono, Inter } from "next/font/google";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
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
  preload: true,
});

export default function Home() {
  return (
    <main>
      <div className="flex items-center px-[5%] justify-center py-[150px]">
        <div className="w-1/2">
          <span
            className={`text-center ${PoppinsJudul.className} text-[3rem] text-white`}
          >
            VALO<span className="text-[#7F5AF0]">IN </span>
          </span>
          <p
            className={`${inter.className} text-[#94A1B2] text-[1rem] opacity-70 leading-6`}
          >
            adalah website yang bisa memudahkan player valorant untuk
            mendapatkan trik trik valorant, contohnya seperti lineup untuk
            menjaga spike, set up untuk sentinel dan lain lain
          </p>
          <div
            className={`bg-white px-[17px] py-[10px] w-fit mt-[20px] relative ${robotoMono.className}`}
          >
            <img
              src="/satchel.png"
              className="absolute bottom-[-30px] right-[-40px]"
              alt=""
            />
            <p>try now</p>
          </div>
        </div>

        <div>
          <img src="/jumbotronImg.png" className="w-[450px]" alt="" />
        </div>
      </div>

      <div className="py-[180px] bg-[#242629] text-white relative flex px-[100px] items-center">
        <div className="w-[50%] mx-auto">
          <h1 className={`${PoppinsJudul.className} text-[2.5rem]`}>
            Agent in <span className="text-red-600">Valorant</span>
          </h1>
          <p
            className={`${inter.className} text-[#94A1B2] text-[1rem] opacity-70 leading-6`}
          >
            kamu pemain baru, dan bingung dengan banyaknya ability tiap agent
            yang berbeda beda ? eitss tenang. Disini kamu bisa memahami ability
            tiap agent dengan mudah
          </p>
        </div>
        <div className="w-1/2">
          <img
            src="/valorantCharacter.jpg"
            alt=""
            className="mx-auto w-[80%] mt-[80px] rounded-[3px]"
          />
        </div>
      </div>
    </main>
  );
}