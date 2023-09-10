import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Footer() {
  return (
    <>
      <div className="py-[60px] px-[100px] bg-white">
        <div className="flex gap-[50px] justify-center">
          <div className="w-1/2 h-fit relative">
            <p
              className={`${poppins.className} text-white absolute text-[1.8rem] w-[70%] left-5 top-10 leading-9`}
            >
              thank you for visiting my website
              <div className={`${inter.className} text-[.8rem] `}>
                I hope this website can be useful for you
              </div>
            </p>
            <img src="/purple.svg" className="h-[250px]" alt="" />
            <img
              src="/baal.png"
              className="absolute bottom-0 right-[-50px]"
              alt="baal raiden shogun"
            />
          </div>

          <div className="w-1/2 relative">
            <p className={`${poppins.className} text-[1.7rem] text-slate-800`}>
              support me on saweria here
            </p>
            <img src="/saweria.png" className="w-[40px]" />
          </div>
        </div>
      </div>
      <div className="py-[5px] text-center bg-slate-950 text-white text-[.8rem]">
        © 2023, dikaaa.tech
      </div>
    </>
  );
}
