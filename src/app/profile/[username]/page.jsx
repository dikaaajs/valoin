"use client";
import { Poppins, Roboto_Mono } from "next/font/google";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Post from "@/app/components/Post";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoppinsJudul = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
  preload: true,
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});

const post1 = {
  judul: "viper a site",
  keterangan: "default spike",
  tag: ["easy"],
  imageUrl: "/viperToxin.png",
};

export default function Profile({ params }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(undefined);
  const [itsMe, setItsMe] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [lineup, setLineup] = useState(null);

  const getInfo = async () => {
    try {
      const userRes = await axios.post("/api/user/byUsername", {
        username: params.username,
      });
      const userData = userRes.data.user;

      const lineupRes = await axios.post("/api/lineup/user", {
        idMaker: userData._id,
      });

      let totalTerpilih = 0;
      let totalLikes = 0;

      for (let i = 0; i < lineupRes.data.length; i++) {
        totalLikes += lineupRes.data[i].like.length;
      }

      for (let i = 0; i < lineupRes.data.length; i++) {
        if (lineupRes.data[i].tag.includes("verify") === true) {
          totalTerpilih = totalTerpilih + 1;
        }
      }

      const tmp = {
        lineupDibuat: lineupRes.data.length,
        lineupTerpilih: totalTerpilih,
        lineupDisukai: totalLikes,
      };
      setLineup(lineupRes.data);
      setStats(tmp);
      setItsMe(session?.user?.name === userData.username ? true : false);
      setProfile(userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInfo();
  }, [session]);

  if (status === "loading" || profile === null || itsMe === undefined)
    return (
      <div className="flex items-center h-screen text-center justify-center">
        <h1 className={`text-[2rem] ${PoppinsJudul.className} text-white`}>
          loading ...
        </h1>
      </div>
    );

  if (itsMe !== undefined)
    return (
      <div className="py-[150px] px-[80px]">
        <div className="w-full flex flex-col gap-[150px]">
          <div className="flex justify-between">
            {/* profile */}
            <div className="flex gap-[20px] w-fit">
              <img
                src={profile.pp}
                className="rounded-full w-[150px] h-[150px]"
                alt=""
              />
              <div className="text-white">
                <h1 className={`text-[2rem] ${PoppinsJudul.className} `}>
                  {profile?.username}
                </h1>
                <p className={`text-[.7rem] ${PoppinsJudul.className}`}>
                  {profile.deskripsi}
                </p>
                <div className="flex gap-[15px]">
                  {itsMe ? (
                    <Link
                      className={`${robotoMono.className} text-[.7rem] px-[15px] py-[10px] my-[10px] text-white bg-[#7F5AF0] rounded-[3px] duration-300 hover:scale-125`}
                      href={`/profile/edit`}
                    >
                      edit profile
                    </Link>
                  ) : (
                    <button
                      className={`${robotoMono.className} text-[.7rem] px-[10px] py-[5px] my-[10px] text-white !bg-[#7F5AF0] border-[#7F5AF0] border-2 flex items-center gap-[10px]`}
                    >
                      follow
                      <span className="material-symbols-outlined">
                        person_add
                      </span>
                    </button>
                  )}

                  {itsMe && status === "authenticated" && (
                    <button
                      onClick={() => signOut()}
                      className="text-white material-symbols-outlined"
                    >
                      logout
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* stats */}
            <div className="w-fit bg-[#7F5AF0] ml-auto py-[50px] px-[80px] relative">
              <div className="bg-white py-[8px] px-[15px] absolute top-[-30px] left-[20px] w-fit skew-y-6">
                <h1
                  className={`${PoppinsJudul.className} text-[1.5rem] font-[900]`}
                >
                  stats
                </h1>
              </div>
              <div className="flex gap-[40px] text-white justify-center">
                <div className="text-center">
                  <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
                    {stats.lineupDibuat}
                  </p>
                  <h1 className={`${robotoMono.className} text-[.8rem]`}>
                    lineup dibuat
                  </h1>
                </div>
                <div className="text-center">
                  <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
                    {stats.lineupTerpilih}
                  </p>
                  <h1 className={`${robotoMono.className} text-[.8rem]`}>
                    lineup terpilih
                  </h1>
                </div>
                <div className="text-center">
                  <p className={`${PoppinsJudul.className} text-[1.5rem]`}>
                    {stats.lineupDisukai}
                  </p>
                  <h1 className={`${robotoMono.className} text-[.8rem]`}>
                    lineup disukai
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* achievement */}
          <div className="text-white glass-effect w-[70%] mx-auto py-[30px] px-[15px]">
            <h1 className={`${PoppinsJudul.className} text-center`}>
              achievement
            </h1>
            <div className="flex gap-[20px] py-[30px] justify-center">
              {profile.tag.map((e, idx) => {
                return (
                  <div
                    key={idx}
                    className={`px-[10px] py-[5px] ${PoppinsJudul.className} text-[.6rem] bg-white text-black rounded-[5px]`}
                  >
                    {e}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* postingan */}
        <div className="py-[150px] text-white ">
          <h1 className={`${PoppinsJudul.className} text-[2rem] pb-[50px]`}>
            lineup :
          </h1>
          <div className="w-[90%] mx-auto my-[100px] flex flex-wrap justify-center gap-[30px]">
            {lineup[0] === undefined && (
              <div>
                <img src="/cry.jpg" alt="" />
                <h1 className={`${PoppinsJudul.className} text-white`}>
                  user belum membuat lineup
                </h1>
              </div>
            )}

            {lineup.map((e, idx) => {
              const post = {
                ...e,
                imageUrl: e.imgAndDes[2].img3,
              };
              return <Post post={post} uid={profile._id} key={idx} />;
            })}
          </div>
        </div>

        <ToastContainer />
      </div>
    );
}
