"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";

export default function page() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterUsername, setFilterUsername] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filterUsername);
  };

  const getData = async () => {
    const response = await axios.post("/api/user/getAll", {
      page,
    });
    setUsers(response.data.users);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="py-[40px] px-[15px]">
      {/* search bar */}
      <div className="pb-[20px] ">
        <form className="flex justify-between" onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded-[9px] w-[80%] bg-transparent text-white"
            placeholder="username ..."
            onChange={(e) => setFilterUsername(e.target.value)}
          />
          <button className="" type="submit">
            <img src="/search.svg" className="w-[40px]" alt="" />
          </button>
        </form>
      </div>

      {/* user */}
      <div className="flex flex-col md:flex-wrap gap-[20px]">
        {users.map((i, idx) => {
          return (
            <div key={idx} className="text-white flex gap-[10px] items-center">
              <div className="w-fit">
                <img src={i.pp} className="w-[30px] rounded-full" />
              </div>
              <div>
                <Link href={`/profile/${i.username}`} className="underline">
                  <p>{i.username}</p>
                </Link>
                <p className="text-[.7rem]">{i.deskripsi}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
