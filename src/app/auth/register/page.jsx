"use client";
import React, { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState([false, false, false]);
  const [pesan, setPesan] = useState(
    "akun diperlukan untuk melakukan interaksi pada web. seperti menambahkan lineup, memberi like, memberi dislike, dll"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    if (!username || !password || !email) {
      return setPesan("harap isi semua kolom dengan benar!");
    }

    try {
      const user = await axios.post("/api/user", {
        email,
      });
      console.log(user);

      if (user.data === null) {
        const update = inputError;
        update[2] = true;
        setInputError(update);
        return setPesan("email sudah digunakan !");
      }

      const res = await axios.post("/api/register", {
        username,
        password,
        email,
      });
      console.log(res);
      router.push("/profile");
    } catch (error) {
      setPesan("gagal mendaftar");
    }
  };
  console.log(inputError);
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
            Register
          </h1>

          <div className="flex flex-col">
            <label htmlFor="username" className="font-[600] text-slate-800">
              username*
            </label>
            <input
              className={`border-slate-500 rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem]`}
              type="text"
              name="username"
              onBlur={(e) => setUsername(e.target.value)}
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
              onBlur={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-[600] text-slate-800">
              email*
            </label>
            <input
              className={` rounded-[3px] border-opacity-50 py-[5px] text-slate-700 text-[.8rem] ${
                inputError[2] ? "border-red-600" : "border-slate-500"
              }`}
              type="email"
              name="email"
              onBlur={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-[3px]">
            <button
              className="btn !bg-[#9778F6] !text-white w-fit"
              type="submit"
            >
              register
            </button>
          </div>
          <Link
            className={`${inter.className} text-[.7rem] inline-block`}
            href={"/auth/login"}
          >
            *udah punya akun ? <span className="underline">login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
