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
    <div className="absolute bottom-0 w-full">
      <div className="px-[20px] md:px-[100px] bg-white relative h-fit overflow-hidden bottom-0">
        <img src="/topography.png" className="absolute right-0 h-full" alt="" />
        <div className="flex flex-col lg:flex-row lg:gap-[70px] gap-[20px]  justify-center items-center py-[30px]">
          <div className="w-full md:w-full lg:w-[55%] xl:w-[40%] relative h-[150px] md:h-[200px] bg-gradient-to-r from-[#9778F6] to-[#7F5AF0]">
            <div className="w-[70%] top-5 left-2 md:left-5 md:top-10 md:leading-9 leading-5 absolute text-white">
              <p
                className={`${poppins.className} text-[1.2rem md:text-[1.8rem]`}
              >
                thank you for visiting my website
              </p>
              <p className={`${inter.className} text-[.5rem] md:text-[.8rem] `}>
                I hope this website can be useful for you
              </p>
            </div>

            <img
              src="/baal.png"
              className="absolute bottom-0 h-full right-[-50px]"
              alt="baal raiden shogun"
            />
          </div>

          <div className="w-fit relative md:leading-9 leading-5">
            <p className={`${poppins.className} text-[1.2rem] text-slate-800`}>
              support me on saweria here
            </p>
            <a href="https://saweria.co/dikaaajs">
              <img
                src="/saweria.png"
                className="w-[30px] mx-auto py-[10px] md:w-[40px]"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="py-[5px] text-center text-[.5rem] bg-slate-950 text-white md:text-[.8rem]">
        2023, dikaaa.tech
      </div>
    </div>
  );
}
