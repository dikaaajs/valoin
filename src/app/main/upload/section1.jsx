const Section1 = (props) => {
  const {
    poppins,
    allAgent,
    selectAgentHandle,
    robotoMono,
    selectAbilityHandle,
    agent,
    dataAgent,
    loadAbility,
    ability,
  } = props;
  return (
    <div className="w-full relative py-[100px]">
      <h1
        className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
      >
        select agent & ability
      </h1>
      <div className="flex flex-wrap gap-[5px] pt-[90px] w-[70%] mx-auto justify-center">
        {allAgent.map((e, index) => {
          return (
            <div
              className={`w-[60px] relative z-[10] ${
                agent === e.name ? "agent-active" : ""
              }`}
              onClick={(evn) => selectAgentHandle(evn)}
              id={e.name}
              key={index}
            >
              <div
                className={`w-[60px] h-[60px] bg-white opacity-20 z-[1] absolute text-center ${
                  agent === e.name ? "" : "hidden"
                }`}
              ></div>
              <img
                src="/check.png"
                className={`w-[30px] h-[30px] z-[10] absolute top-[-13px] right-[-13px] ${
                  agent === e.name ? "" : "hidden"
                }`}
              />
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
      {dataAgent && (
        <>
          <div className="flex gap-[10px] pt-[20px] justify-center">
            {loadAbility ? (
              <h1
                className={`text-white text-center text-[1.5rem] ${robotoMono.className}`}
              >
                loading ...
              </h1>
            ) : (
              <>
                {Array.from({ length: 4 }, (_, i) => (
                  <button
                    key={i}
                    className="relative w-[50px] h-[50px] border-solid border-white border-[1px]"
                  >
                    <div
                      className={`w-[50px] h-[50px] bg-white opacity-20 z-[1] absolute text-center ${
                        ability === i ? "" : "hidden"
                      }`}
                    ></div>
                    <img
                      src="/check.png"
                      className={`w-[25px] h-[25px] z-[10] absolute top-[-13px] right-[-13px] ${
                        ability.key === i ? "" : "hidden"
                      }`}
                    />
                    <img
                      src={dataAgent.data.abilities[i].displayIcon}
                      className="w-full h-full"
                      alt=""
                      onClick={() =>
                        selectAbilityHandle({
                          key: i,
                          asset: dataAgent.data.abilities[i].displayIcon,
                        })
                      }
                    />
                  </button>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Section1;
