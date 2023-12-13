"use client";
import React, { useState } from "react";
import { Poppins, Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

  const usernameChecker = () => {
    const regex = /^[a-zA-Z0-9]{1,13}$/;
    return regex.test(username);
  };

  const passwordChecker = () => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPesan("loading ...");
    if (!username || !password || !email) {
      return setPesan("harap isi semua kolom dengan benar!");
    }

    if (usernameChecker() === false) {
      setPesan("username tidak sesuai aturan");
      let tmp = inputError;
      tmp[0] = true;
      setInputError(tmp);
    } else if (usernameChecker() === true) {
      let tmp = inputError;
      tmp[0] = false;
      setInputError(tmp);
    }

    if (passwordChecker() === false) {
      setPesan("password tidak sesuai aturan");
      let tmp = inputError;
      tmp[1] = true;
      setInputError(tmp);
    } else if (passwordChecker() === true) {
      let tmp = inputError;
      tmp[1] = false;
      setInputError(tmp);
    }

    try {
      const res = await axios.post("/api/register", {
        username,
        password,
        email,
        pp: "/defaultpp.jpg",
        deskripsi: "tidak bisa bicara, valo saja",
        tag: ["pemula"],
      });

      if (res.status === 201) {
        const login = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (login.ok === true) {
          router.replace(`/profile/${username}`);
        }
      } else if (res.status === 409) {
        setPesan(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setPesan(error.response.data.message);
    }
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
              onChange={(e) => setUsername(e.target.value)}
              maxLength={14}
            />
            <p
              className={`text-red-500 font-semibold ${
                inputError[0] === false ? "hidden" : ""
              }`}
            >
              username tidak boleh menggunakan symbol dan lebih dari 13 huruf
            </p>
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
            <p
              className={`text-red-500 font-semibold ${
                inputError[1] === false ? "hidden" : ""
              }`}
            >
              password minimal memiliki 8 karakter
            </p>
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
              onChange={(e) => setEmail(e.target.value)}
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
