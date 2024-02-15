"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";
import { Tooltip } from "antd";

const checkRole = (tags) => {
  return (
    <div className="flex gap-[5px]">
      {/* admin role */}
      {tags.includes("admin") && (
        <Tooltip title="admin" color="#a855f7">
          <p>📌</p>
        </Tooltip>
      )}

      {/* developer role */}
      {tags.includes("dev") && (
        <Tooltip title="developer" color="#a855f7">
          <p>🛠</p>
        </Tooltip>
      )}
    </div>
  );
};

export default function page() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterUsername, setFilterUsername] = useState(null);
  const [nextQuery, setNextQuery] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/user/getAll", {
      username: filterUsername,
    });
    setUsers(response.data.users);
  };

  const getData = async () => {
    const response = await axios.post("/api/user/getAll", {
      page,
    });
    setUsers([...users, ...response.data.users]);
    setNextQuery(response.data.nextQuery);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  if (loading) return <Loading />;

  return (
    <div className="py-[40px] px-[15px] min-h-screen">
      {/* search bar */}
      <div className="pb-[20px] md:py-[50px]">
        {/* judul */}
        <div>
          <h1 className="font-poppins-bold text-[2.5rem] text-white uppercase relative py-[15px] w-fit mx-auto">
            <img
              src="/svg/balok.svg"
              className="w-[50px] absolute -z-30 -left-[20px] top-0"
              alt=""
            />{" "}
            cari orang
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative w-[95%] md:w-[80%] mx-auto h-[40px]">
            <input
              type="text"
              className="rounded-[5px] bg-transparent text-white w-full h-full pl-[50px]"
              placeholder="username ..."
              onChange={(e) => setFilterUsername(e.target.value)}
            />
            <button
              className="opacity-50 absolute w-[25px] top-[8px] left-[10px]"
              type="submit"
            >
              <img src="/search.svg" className="w-full" alt="" />
            </button>
          </div>
        </form>
      </div>

      {/* user */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] md:px-[25px]">
        {users.map((i, idx) => {
          return (
            <Link
              href={`/profile/${i.username}`}
              key={idx}
              className="text-white flex gap-[10px] items-center w-full border-[1px] border-white rounded-[5px] py-[3px] px-[10px] relative"
            >
              <img
                src="/blob2.svg"
                className="absolute bottom-[-20px] left-[-20px] w-[60px] z-10 rotate-180"
                alt=""
              />
              <div className="w-fit z-50">
                <img src={i.pp} className="w-[30px] rounded-full z-50" />
              </div>
              <div>
                <span className="flex gap-[5px]">
                  <p className="underline">{i.username}</p>
                  {checkRole(i.tag)}
                </span>
                <p className="text-[.7rem]">{i.deskripsi}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* view more buttton */}
      <div>
        <button
          className={`btn rounded-[5px] !bg-blue-400 !text-white mx-auto block my-[30px] relative ${
            nextQuery ? "" : "hidden"
          }`}
          onClick={() => setPage(page + 1)}
        >
          view more
          <img
            src="/svg/bata.svg"
            className="w-[40px] absolute right-[-25px] top-[-10px] -z-20"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}
