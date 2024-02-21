"use client";
import { useState } from "react";
import { allAgent } from "../agent";

const maxPlayer = ["", "", "", "", ""];
export default function BlindPick() {
  const [playerCount, setPlayerCount] = useState(0);
  const [alert, setAlert] = useState(false);
  const [phase, setPhase] = useState(1);
  const [agentResult, setAgentResult] = useState(null);

  const getAgentRandom = () => {
    const shuffledAgents = [...allAgent].sort(() => Math.random() - 0.5);
    const result = shuffledAgents.slice(0, playerCount);
    setAlert(false);
    setPhase(2);
    setAgentResult(result);
  };

  const refreshSite = () => {
    setPhase(1);
    setAgentResult(null);
    setAlert(false);
    setPlayerCount(0);
  };

  return (
    <div className="min-h-screen px-[15px]">
      {/* alert */}
      <div className={`w-full h-full fixed z-50 ${alert ? "" : "hidden"}`}>
        <div className="fixed w-[90%] md:w-[50%] bg-white rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-brightness-50 py-[50px]">
          <h1 className="text-black font-montserrat-bold text-[1rem] text-center underline">
            determine the player number
          </h1>
          <p className="text-center font-rethink text-[.8rem] leading-4">
            Make sure you and your friends have chosen a number
          </p>
          <button
            className="btn rounded-[5px] mx-auto !bg-blue-500 text-white block text-[.8rem] mt-[20px]"
            onClick={getAgentRandom}
          >
            done
          </button>
        </div>
      </div>

      {/* <div className="py-[20px] md:py-[25px]">
        <h1 className="headline-2">blind pick agent</h1>
      </div> */}

      {/* body */}
      {phase === 1 && (
        <div className="pt-[150px]">
          <h1 className="headline-3">determine the number of players</h1>
          <div className="flex justify-center gap-[15px] w-[90%] md:w-[60%] mx-auto text-white">
            {maxPlayer.map((i, idx) => {
              return (
                <button
                  key={idx}
                  className={`w-[40px] h-[40px] border-white border-[2px] flex items-center justify-center font-poppins-medium ${
                    playerCount >= idx + 1 ? "bg-white bg-opacity-75" : ""
                  }`}
                  onClick={() => setPlayerCount(idx + 1)}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
          <button
            className={`btn rounded-[5px] mx-auto block my-[20px] ${
              playerCount === 0
                ? "cursor-not-allowed opacity-70"
                : "!bg-blue-500 text-white"
            }`}
            onClick={() => {
              if (playerCount === 0) return;
              setAlert(true);
            }}
          >
            next
          </button>
        </div>
      )}

      {phase === 2 && (
        <div className="pt-[150px]">
          <h1 className="headline-3">This is the agent you should use</h1>
          <div className="flex flex-wrap gap-[20px] justify-center">
            {agentResult.map((i, idx) => {
              return (
                <div key={idx} className="relative">
                  <img src={`/agent/${i.name}/${i.name}.svg`} />
                  <p className="text-center text-white">{i.name}</p>
                  <h1 className="text-purple-500 bg-white rounded-full p-[5px] font-poppins-bold uppercase absolute top-[-10px] right-[-10px] text-[1rem]">
                    #{idx + 1}
                  </h1>
                </div>
              );
            })}
          </div>
          <button
            className="btn rounded-[5px] mx-auto !bg-blue-500 text-white block text-[.8rem] mt-[20px]"
            onClick={refreshSite}
          >
            try again
          </button>
        </div>
      )}
    </div>
  );
}
