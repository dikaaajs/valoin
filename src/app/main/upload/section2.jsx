const Section2 = (props) => {
  const {
    poppins,
    inter,
    Map,
    ability,
    setLineUpCondition,
    map,
    agent,
    lineUpCondition,
  } = props;
  return (
    <div className="w-full relative py-[100px]">
      <h1
        className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
      >
        pilih map dan pin
      </h1>

      {/* select map */}
      <div className="absolute top-[200px] right-[50px]">
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

      {/* map */}
      <div
        className={`w-[90vw] h-[90vw] md:w-[70vw] md:h-[70vw] lg:w-[40vw] lg:h-[40vw] mx-auto relative cursor-move my-[100px]`}
      >
        <Map
          selectedMap={map}
          edit="true"
          img={{
            agentImg: `/agent/${agent}/${agent}.svg`,
            abilityImg: ability.asset,
          }}
          lineUpCondition={lineUpCondition}
        />
      </div>

      {/* select condition */}
      <div className="mx-auto flex justify-center">
        <button
          onClick={(e) => setLineUpCondition(e.currentTarget.id)}
          className={`btn w-[90px] ${
            lineUpCondition === "from" ? "!bg-purple-500 !text-white" : ""
          }`}
          id="from"
        >
          from
        </button>
        <button
          onClick={(e) => setLineUpCondition(e.currentTarget.id)}
          className={`btn w-[90px] ${
            lineUpCondition === "for" ? "!bg-purple-500 !text-white" : ""
          }`}
          id="for"
        >
          for
        </button>
      </div>
    </div>
  );
};

export default Section2;
