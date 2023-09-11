import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Footer() {
  return (
    <>
      <div className="px-[100px] bg-white relative h-[300px]">
        <img
          src="/topography.png"
          className="absolute right-0 h-[300px]"
          alt=""
        />
        <div className="flex gap-[50px] justify-center items-center py-[50px]">
          <div className="w-1/2 relative">
            <img src="/purple.svg" className="h-[210px]" alt="" />

            <div className="w-[70%] left-5 top-10 leading-9 absolute text-white">
              <p className={`${poppins.className}  text-[1.8rem]`}>
                thank you for visiting my website
              </p>
              <p className={`${inter.className} text-[.8rem] `}>
                I hope this website can be useful for you
              </p>
            </div>

            <img
              src="/baal.png"
              className="absolute bottom-0 h-full right-[0px]"
              alt="baal raiden shogun"
            />
          </div>

          <div className="w-fit relative">
            <p className={`${poppins.className} text-[1.7rem] text-slate-800`}>
              support me on saweria here
            </p>
            <img src="/saweria.png" className="w-[40px]" />
          </div>
        </div>
      </div>
      <div className="py-[5px] text-center bg-slate-950 text-white text-[.8rem]">
        2023, dikaaa.tech
      </div>
    </>
  );
}
