import Link from "next/link";
import { useEffect, useState } from "react";
import { getStats } from "../func/getStats";

export default function StatsWeb() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    getStats(setData);
  }, []);
  console.log(data);

  return (
    <div className="bg-white h-[100px] md:h-[150px] w-[90%] md:w-[80%] lg:w-[70%] rounded-[10px] mx-auto absolute top-[-70px] left-1/2 transform -translate-x-1/2 text-black flex gap-[15px] md:gap-[90px] justify-center px-[20px] items-center">
      {data === undefined ? (
        <p className="text-center text-black font-poppins-bold">loading ...</p>
      ) : (
        <>
          <div className="text-center">
            <p className={`font-poppins-bold text-[1rem] md:text-[1.5rem]`}>
              {data.lineupCount}
            </p>
            <h1
              className={`font-robotomono-medium text-[.6rem] md:text-[.8rem] underline`}
            >
              <Link href="/main">lineup dibuat</Link>
            </h1>
          </div>
          <div className="text-center">
            <p className={`font-poppins-bold text-[1rem] md:text-[1.5rem]`}>
              {data.userCount}
            </p>
            <h1
              className={`font-robotomono-medium text-[.6rem] md:text-[.8rem] underline`}
            >
              <Link href="/profile">user terdaftar</Link>
            </h1>
          </div>
          <div className="text-center">
            <p className={`font-poppins-bold text-[1rem] md:text-[1.5rem]`}>
              {data.versi}
            </p>
            <h1
              className={`font-robotomono-medium text-[.6rem] md:text-[.8rem]`}
            >
              versi aplikasi
            </h1>
          </div>
        </>
      )}
    </div>
  );
}
