import { Poppins, Roboto, Roboto_Mono, Inter } from "next/font/google";
import Link from "next/link";

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
  preload: true,
});

export const metadata = {
  title: "VALOIN dulu aja",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-y-[100px] items-center px-[5%] justify-center py-[150px]">
        <div className="w-full lg:w-1/2">
          <span
            className={`text-center ${PoppinsJudul.className} text-[3rem] text-white`}
          >
            VALO<span className="text-[#7F5AF0]">IN </span>
          </span>
          <p
            className={`${inter.className} text-[#94A1B2] text-[.8rem] md:text-[1rem] opacity-70 leading-[18px] md:leading-6`}
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
            <Link href={"/main"}>try now</Link>
          </div>
        </div>

        <div>
          <img src="/jumbotronImg.png" className="w-[450px]" alt="" />
        </div>
      </div>

      <div className="py-[100px] md:py-[180px] bg-[#242629] text-white relative flex flex-col lg:flex-row gap-[20px] px-[20px] md:px-[50px] items-center text-center lg:text-left">
        <div className="w-full lg:w-2/5 mx-auto">
          <h1
            className={`${PoppinsJudul.className} text-[2rem] md:text-[2.5rem] leading-[35px]`}
          >
            Agent in <span className="text-red-600">Valorant</span>
          </h1>
          <p
            className={`${PoppinsText.className} text-[.7rem] opacity-70 leading-5 pt-[15px]`}
          >
            kamu pemain baru, dan bingung dengan banyaknya ability tiap agent
            yang berbeda beda ? eitss tenang. Disini kamu bisa memahami ability
            tiap agent dengan mudah
          </p>
        </div>
        <div className="w-full lg:w-3/5 xl:w-[50%]">
          <img
            src="/valorantCharacter.jpg"
            alt=""
            className="w-full rounded-[3px]"
          />
        </div>
      </div>
    </main>
  );
}
