import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

export default function Leadboard() {
  const getData = async () => {
    const res = await axios.get("/api/user/all");
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="fixed w-[80%] md:w-[25%] bg-white py-[10px] px-[10px] rounded-[3px] right-10 bottom-10 z-50 border-[2px] border-black">
      <h1 className="font-montserrat-bold text-black text-[1rem] pb-[10px]">
        Leadboard
      </h1>

      <div className="flex flex-col gap-[15px] pb-[10px]">
        <div className="flex gap-[10px]">
          <img
            src="/defaultpp.jpg"
            className="rounded-full w-[25px] items-center"
            alt=""
          />
          <Link
            href={`/profile/kopihanet`}
            className="font-rethink font-[500] text-[.8rem]"
          >
            kopihanet
          </Link>
        </div>
        <div className="flex gap-[10px]">
          <img
            src="/defaultpp.jpg"
            className="rounded-full w-[25px] items-center"
            alt=""
          />
          <Link
            href={`/profile/kopihanet`}
            className="font-rethink font-[500] text-[.8rem]"
          >
            kopihanet
          </Link>
        </div>
        <div className="flex gap-[10px]">
          <img
            src="/defaultpp.jpg"
            className="rounded-full w-[25px] items-center"
            alt=""
          />
          <Link
            href={`/profile/kopihanet`}
            className="font-rethink font-[500] text-[.8rem]"
          >
            kopihanet
          </Link>
        </div>
      </div>
    </div>
  );
}
