"use client";

import axios from "axios";
import { Poppins, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import Lineup from "../components/Lineup";
import Loading from "../components/Loading";
import { allAgent } from "../agent";
const Map = dynamic(() => import("./map"), { ssr: false });

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
  const { data: session, status } = useSession();

  const [map, setMap] = useState("ascent");
  const [agent, setAgent] = useState(undefined);
  const [dataAgent, setDataAgent] = useState(null);
  const [statusNya, setStatus] = useState("defender");
  const [mode, setMode] = useState("post");
  const [lineup, setLineup] = useState(null);
  const [rawLineup, setRawLineup] = useState(null);
  const [abilityFilter, setAbilityFilter] = useState([true, true, true, true]);
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectAgentHandle = async (e) => {
    setAgent(e.target.alt);
  };

  const filterLineup = (field, value, lineup) => {
    const result = lineup.filter((i) => {
      if (i[field] === value) {
        return i;
      }
    });

    return result;
  };

  const getLineup = async () => {
    try {
      if (agent === undefined) {
        return setLoading(false);
      }

      const res = await axios.post("/api/lineup/get", {
        agent,
        map,
        status: statusNya,
      });
      if (status === "authenticated") {
        const getId = await axios.post("/api/user/byEmail", {
          email: session.user.email,
        });

        const tmpIdUser = getId.data.user._id;
        setIdUser(tmpIdUser);
      }
      setRawLineup(res.data.result);
      setLineup(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const selectMapHandle = (e) => {
    setMap(e.target.value);
  };

  const handleAbility = (val) => {
    let tmp = [...abilityFilter];
    tmp[val] = !tmp[val];

    setAbilityFilter(tmp);

    let wadah = [];
    tmp.map((i, index) => {
      if (i === true) {
        const p = rawLineup.filter((j) => {
          if (j.ability === index) {
            return j;
          }
        });

        wadah = [...wadah, ...p];
      }
    });

    setLineup(wadah);
  };

  // get data
  useEffect(() => {
    setLoading(true);
    getLineup();
  }, [map, agent, statusNya]);

  return (
    <div className="md:py-[100px] py-[50px] w-full relative">
      {/* loading */}
      {loading && <Loading />}

      {/* navbar */}
      {/* display data */}
      <div className="flex justify-between items-start px-[10px] md:px-[50px]">
        <div className="text-white">
          <h1 className={`font-poppins-bold text-[1.5rem] md:text-[2rem]`}>
            {map.toUpperCase()}
          </h1>

          {/* statusNya picker */}
          <div
            className={`px-[10px] py-[5px] flex gap-[10px] md:gap-[20px] border-solid border-white border-[1px] w-fit font-robotomono-medium text-[.6rem] md:text-[.8rem]`}
          >
            <button
              className={statusNya === "attacker" ? "text-blue-400" : ""}
              onClick={() => {
                setStatus("attacker");
              }}
            >
              attacker
            </button>
            <button
              className={statusNya === "defender" ? "text-blue-400" : ""}
              onClick={() => {
                setStatus("defender");
              }}
            >
              defender
            </button>
          </div>

          {/* ability filter */}
          {agent !== undefined ? (
            <div className="flex gap-[10px] py-[10px] md:pt-[20px]">
              <button
                className="w-fit relative"
                onClick={() => handleAbility(0)}
              >
                <img
                  src={`/agent/${agent}/ability/1.png`}
                  className="md:w-[2.5rem] w-[1.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
                <img
                  src="/x.png"
                  className={`absolute top-0 ${
                    abilityFilter[0] === false ? "" : "hidden"
                  }`}
                />
              </button>

              <button
                className="w-fit relative"
                onClick={() => handleAbility(1)}
              >
                <img
                  src={`/agent/${agent}/ability/2.png`}
                  className="md:w-[2.5rem] w-[1.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
                <img
                  src="/x.png"
                  className={`absolute top-0 ${
                    abilityFilter[1] === false ? "" : "hidden"
                  }`}
                />
              </button>

              <button
                className="w-fit relative"
                onClick={() => handleAbility(2)}
              >
                <img
                  src={`/agent/${agent}/ability/3.png`}
                  className="md:w-[2.5rem] w-[1.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
                <img
                  src="/x.png"
                  className={`absolute top-0 ${
                    abilityFilter[2] === false ? "" : "hidden"
                  }`}
                />
              </button>

              <button
                className="w-fit relative"
                onClick={() => handleAbility(3)}
              >
                <img
                  src={`/agent/${agent}/ability/4.png`}
                  className="md:w-[2.5rem] w-[1.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
                <img
                  src="/x.png"
                  className={`absolute top-0 ${
                    abilityFilter[3] === false ? "" : "hidden"
                  }`}
                />
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/* maps pick */}
        <div className="flex flex-col gap-[20px]">
          <div className="w-fit text-white">
            <h2
              className={`font-poppins-medium text-[.6rem] md:text-[.8rem] text-white`}
            >
              mode :
            </h2>
            <div
              className={`px-[10px] py-[5px] flex gap-[20px] border-solid border-white border-[1px] w-fit font-robotomono-medium text-[.6rem] md:text-[.8rem]`}
            >
              <button
                className={`${mode === "post" ? "text-blue-400" : ""}`}
                onClick={() => setMode("post")}
              >
                post
              </button>
              <button
                className={`${mode === "map" ? "text-blue-400" : ""}`}
                onClick={() => setMode("map")}
              >
                map
              </button>
            </div>
          </div>
          <select
            name="maps"
            id="selectMap"
            className={`font-robotomono-medium text-[.6rem] text-center !py-[5px] rounded-[5px] `}
            onChange={(e) => selectMapHandle(e)}
          >
            <option value="ascent">ascent</option>
            <option value="bind">bind</option>
            <option value="breeze">breeze</option>
            <option value="fracture">fracture</option>
            <option value="haven">haven</option>
            <option value="icebox">icebox</option>
            <option value="lotus">lotus</option>
            <option value="pearl">pearl</option>
            <option value="split">split</option>
            <option value="sunset">sunset</option>
          </select>
        </div>
      </div>

      {/* map container */}
      <div
        className={`w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] lg:w-[40vw] lg:h-[40vw] mx-auto relative cursor-move my-[100px] ${
          mode === "map" ? "" : "hidden"
        }`}
      >
        <p className="text-red-500 text-center">
          mode map sedang tahap pengembangan
        </p>
        <Map selectedMap={map} lineup={lineup} />
      </div>
      {/* post container */}
      <div className={`${mode === "post" ? "" : "hidden"}`}>
        {lineup === null ? (
          <div className="py-[100px]">
            <h1 className={`${poppins.className} text-white text-center`}>
              silahkan pick agent dan map terlebih dahulu
            </h1>
          </div>
        ) : (
          <div className="w-[90%] mx-auto my-[100px] flex flex-wrap justify-center gap-[30px]">
            {lineup.result[0] === undefined && (
              <div>
                <h1 className={`${poppins.className} text-white text-center`}>
                  lineup kosong
                </h1>
              </div>
            )}

            <Lineup lineup={lineup} clientUsername={session.user.name} />
          </div>
        )}
      </div>
      {/* agent pick */}
      <div className="flex flex-wrap gap-[5px] py-[90px] w-[90%] md:w-[70%] mx-auto justify-center">
        {allAgent.map((e, index) => {
          return (
            <div
              className={`w-[60px] relative z-[10] cursor-pointer ${
                agent === e.name ? "agent-active" : ""
              }`}
              onClick={(evn) => {
                if (loading === false) {
                  selectAgentHandle(evn);
                }
              }}
              id={e.name}
              key={index}
            >
              <div
                className={`w-[60px] h-[60px] bg-white opacity-20 z-[1] absolute ${
                  agent === e.name ? "" : "hidden"
                }`}
              ></div>
              <img
                src={`/agent/${e.name}/${e.name}.svg`}
                className="w-full"
                alt={e.name}
                id={e.uuid}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
