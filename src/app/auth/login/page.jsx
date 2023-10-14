"use client";
import React, { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState(
    "akun diperlukan untuk melakukan interaksi pada web. seperti menambahkan lineup, memberi like, memberi dislike, dll"
  );
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    console.log(res);

    if (res.ok === true) {
      router.replace(`/profile/${username}`);
    }

    setPesan("ada yang salah");
  };
  return (
    <div className="py-[50px]">
      <div className="flex w-full">
        <div className="w-1/2 flex items-center justify-center px-[60px] text-center">
          <h1 className={`text-white ${inter.className} text-[.8rem]`}>
            " {pesan} "
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`w-1/2 bg-white flex flex-col py-[50px] px-[40px] mx-[30px] my-[50px] rounded-[4px] gap-[20px] ${inter.className} text-[.8rem]`}
        >
          <h1
            className={`${poppins.className} text-[1.2rem] md:text-[1.8rem] text-slate-800`}
          >
            Login
          </h1>

          <div className="flex flex-col">
            <label htmlFor="username" className="font-[600] text-slate-800">
              username*
            </label>
            <input
              className={`border-slate-500 rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem]`}
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-[600] text-slate-800">
              password*
            </label>
            <input
              className={`border-slate-500 rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem]`}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-[3px]">
            <button
              className="btn !bg-[#9778F6] !text-white w-fit"
              type="submit"
            >
              login
            </button>
            <Link
              className={`${inter.className} text-[.7rem]`}
              href={"/auth/register"}
            >
              *belum punya akun ? <span className="underline">daftar</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
