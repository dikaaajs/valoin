"use client";

import axios from "axios";
import { Poppins, Inter } from "next/font/google";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Post from "../components/Post";
const Map = dynamic(() => import("./map"), { ssr: false });

const allAgent = [
  { name: "astra", uuid: "41fb69c1-4189-7b37-f117-bcaf1e96f1bf" },
  { name: "breach", uuid: "5f8d3a7f-467b-97f3-062c-13acf203c006" },
  { name: "brimstone", uuid: "9f0d8ba9-4140-b941-57d3-a7ad57c6b417" },
  { name: "chamber", uuid: "22697a3d-45bf-8dd7-4fec-84a9e28c69d7" },
  { name: "cypher", uuid: "117ed9e3-49f3-6512-3ccf-0cada7e3823b" },
  { name: "deadlock", uuid: "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235" },
  { name: "fade", uuid: "dade69b4-4f5a-8528-247b-219e5a1facd6" },
  { name: "gekko", uuid: "e370fa57-4757-3604-3648-499e1f642d3f" },
  { name: "harbor", uuid: "95b78ed7-4637-86d9-7e41-71ba8c293152" },
  { name: "jett", uuid: "add6443a-41bd-e414-f6ad-e58d267f4e95" },
  { name: "kayo", uuid: "601dbbe7-43ce-be57-2a40-4abd24953621" },
  { name: "killjoy", uuid: "1e58de9c-4950-5125-93e9-a0aee9f98746" },
  { name: "neon", uuid: "bb2a4828-46eb-8cd1-e765-15848195d751" },
  { name: "omen", uuid: "8e253930-4c05-31dd-1b6c-968525494517" },
  { name: "phonix", uuid: "eb93336a-449b-9c1b-0a54-a891f7921d69" },
  { name: "raze", uuid: "f94c3b30-42be-e959-889c-5aa313dba261" },
  { name: "reyna", uuid: "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc" },
  { name: "sage", uuid: "569fdd95-4d10-43ab-ca70-79becc718b46" },
  { name: "sky", uuid: "6f2a04ca-43e0-be17-7f36-b3908627744d" },
  { name: "sova", uuid: "320b2a48-4d9b-a075-30f1-1f93a9b638fa" },
  { name: "viper", uuid: "707eab51-4836-f488-046a-cda6bf494859" },
  { name: "yoru", uuid: "7f94d92c-4234-0a36-9646-3a87eb8b5c89" },
];

const post1 = {
  judul: "viper a site",
  keterangan: "default spike",
  tag: ["easy"],
  imageUrl: "/viperToxin.png",
};

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
  const [map, setMap] = useState("ascent");
  const [agent, setAgent] = useState(undefined);
  const [dataAgent, setDataAgent] = useState(null);
  const [lineup, setLineup] = useState(null);
  const [status, setStatus] = useState("defender");
  const [mode, setMode] = useState("post");

  const selectMapHandle = (e) => {
    setMap(e.target.value);
  };

  const selectAgentHandle = async (e) => {
    try {
      const res = await axios.get(
        `https://valorant-api.com/v1/agents/${e.target.id}`
      );
      setDataAgent(res.data.data);
      setAgent(e.target.alt);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLineup = async () => {
    try {
      if (agent === undefined) return console.log("agent kosong");
      const response = await axios.post("/api/lineup/get", {
        agent,
        map,
        status,
      });
      console.log(response);
      setLineup(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLineup();
  }, [map, agent]);

  return (
    <div className="py-[100px] w-full relative">
      {/* navbar */}
      <div className="flex justify-between items-center px-[50px]">
        {/* display data */}
        <div className="text-white">
          <h1 className={`${poppins.className} text-[2rem]`}>
            {map.toUpperCase()}
          </h1>
          <div
            className={`px-[10px] py-[5px] flex gap-[20px] border-solid border-white border-[1px] w-fit ${inter.className} text-[.8rem]`}
          >
            <button
              className={status === "attacker" ? "text-blue-400" : ""}
              onClick={() => setStatus("attacker")}
            >
              attacker
            </button>
            <button
              className={status === "defender" ? "text-blue-400" : ""}
              onClick={() => setStatus("defender")}
            >
              defender
            </button>
          </div>
          {dataAgent !== null ? (
            <div className="flex gap-[10px] pt-[20px]">
              <button>
                <img
                  src={dataAgent.abilities[0].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.abilities[1].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.abilities[2].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
                />
              </button>
              <button>
                <img
                  src={dataAgent.abilities[3].displayIcon}
                  className="w-[2.5rem] border-solid border-white border-[1px] py-[5px] px-[5px]"
                  alt=""
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
            <h2 className={`${poppins.className} text-[.8rem] text-white`}>
              mode :
            </h2>
            <div
              className={`px-[10px] py-[5px] flex gap-[20px] border-solid border-white border-[1px] w-fit ${inter.className} text-[.8rem]`}
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
            className={`${inter.className} rounded-[5px] `}
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
            {lineup[0] === undefined && (
              <div>
                <h1 className={`${poppins.className} text-white text-center`}>
                  lineup kosong
                </h1>
              </div>
            )}

            {lineup.map((e, idx) => {
              const post = {
                ...e,
                imageUrl: e.imgAndDes[2].img3,
              };
              console.log(e);
              return <Post post={post} key={idx} />;
            })}
          </div>
        )}
      </div>

      {/* agent pick */}
      <div className="flex flex-wrap gap-[5px] py-[90px] w-[70%] mx-auto justify-center">
        {allAgent.map((e, index) => {
          return (
            <div
              className={`w-[60px] relative z-[10] cursor-pointer ${
                agent === e.name ? "agent-active" : ""
              }`}
              onClick={(evn) => selectAgentHandle(evn)}
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
