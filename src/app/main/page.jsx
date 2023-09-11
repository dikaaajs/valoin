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

export default function page() {
  return (
    <div className="py-[100px] w-full relative">
      <div className="w-1/3 h-fit mx-auto">
        <img src="/map.png" className="w-full" alt="" />
        <div className="w-[20px] rounded-full bg-white"></div>
      </div>
      <div className="flex flex-wrap gap-[5px] py-[90px] w-[70%] mx-auto justify-center">
        <img src="/agent/astra.svg" className="w-[60px]" alt="" />
        <img src="/agent/breach.svg" className="w-[60px]" alt="" />
        <img src="/agent/brimstone.svg" className="w-[60px]" alt="" />
        <img src="/agent/chamber.svg" className="w-[60px]" alt="" />
        <img src="/agent/cyper.svg" className="w-[60px]" alt="" />
        <img src="/agent/deadlock.svg" className="w-[60px]" alt="" />
        <img src="/agent/fade.svg" className="w-[60px]" alt="" />
        <img src="/agent/gekko.svg" className="w-[60px]" alt="" />
        <img src="/agent/harbor.svg" className="w-[60px]" alt="" />
        <img src="/agent/jett.svg" className="w-[60px]" alt="" />
        <img src="/agent/kayo.svg" className="w-[60px]" alt="" />
        <img src="/agent/killjoy.svg" className="w-[60px]" alt="" />
        <img src="/agent/neon.svg" className="w-[60px]" alt="" />
        <img src="/agent/omen.svg" className="w-[60px]" alt="" />
        <img src="/agent/phonix.svg" className="w-[60px]" alt="" />
        <img src="/agent/raze.svg" className="w-[60px]" alt="" />
        <img src="/agent/reyna.svg" className="w-[60px]" alt="" />
        <img src="/agent/sage.svg" className="w-[60px]" alt="" />
        <img src="/agent/sky.svg" className="w-[60px]" alt="" />
        <img src="/agent/sova.svg" className="w-[60px]" alt="" />
        <img src="/agent/viper.svg" className="w-[60px]" alt="" />
        <img src="/agent/yoru.svg" className="w-[60px]" alt="" />
      </div>

      <div className="absolute top-[50px] left-[50px] text-white">
        <h1 className={`${poppins.className} text-[2rem]`}>ASCENT</h1>
        <div
          className={`px-[10px] py-[5px] flex gap-[20px] border-solid border-white border-[1px] w-fit ${inter.className} text-[.8rem]`}
        >
          <button>attacking</button>
          <button className="text-blue-300">defending</button>
        </div>
      </div>
    </div>
  );
}
