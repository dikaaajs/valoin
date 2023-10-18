"use client";
const Map = dynamic(() => import("../map"), { ssr: false });
import { useEffect, useState } from "react";
import { Poppins, Inter, Roboto_Mono } from "next/font/google";
import axios from "axios";
import dynamic from "next/dynamic";
import { storage } from "../../../../libs/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});

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

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function Page() {
  const idPost = v4();
  const [page, setPage] = useState(4);
  const [loadAbility, setloadAbility] = useState(false);
  const [dataAgent, setDataAgent] = useState(null);

  // data for section1
  const [agent, setAgent] = useState("");
  const [ability, setAbility] = useState("");

  // data for section2
  const [map, setMap] = useState("ascent");
  const [lineUpCondition, setLineUpCondition] = useState("from");

  // section 3
  const [judul, setJudul] = useState("VIPER A SITE (JUDUL LINEUP)");
  const [keterangan, setKeterangan] = useState(
    "default spike in a site (keterangan)"
  );
  const [difficult, setDifficult] = useState();
  const [lineUpImg, setLineUpImg] = useState();
  const [imageUrl, setBanner] = useState("/viperToxin.png");

  // section 4
  const [pakeVideo, setPakeVideo] = useState(false);
  const [img1, setimg1] = useState("/viperToxin.png");
  const [img2, setimg2] = useState("/viperToxin.png");
  const [img3, setimg3] = useState("/viperToxin.png");
  const [caption1, setcaption1] = useState("caption untuk gambar 1");
  const [caption2, setcaption2] = useState("caption untuk gambar 2");
  const [caption3, setcaption3] = useState("caption untuk gambar 3");
  const [linkYT, setLinkYT] = useState("8XEq1rtIloU");
  const [videoVer, setVideoVer] = useState(false);

  useEffect(() => {
    localStorage.setItem("lineUpCondition", lineUpCondition);
  }, [lineUpCondition]);

  const selectAgentHandle = async (e) => {
    setloadAbility(true);
    axios
      .get(`https://valorant-api.com/v1/agents/${e.target.id}`)
      .then((response) => {
        setDataAgent(response.data);
        setAgent(e.target.alt);
        setloadAbility(false);
      });
  };

  const selectMapHandle = (e) => {
    setMap(e.target.value);
  };

  const selectAbilityHandle = (i) => {
    setAbility(i);
  };

  const handleNextButton = () => {
    if (page === 1) {
      if (!agent || !ability) {
        return alert("pilih agent dan ability");
      } else {
        setPage(page + 1);
      }
    }
    if (page === 2) {
      const coordinate = {
        from: localStorage.getItem("coordinatFrom"),
        for: localStorage.getItem("coordinatFor"),
      };
      console.log(coordinate.for);
      if (coordinate.from === null || coordinate.for === null) {
        return alert("pilih koordinatnya terlebih dahulu");
      } else {
        setPage(page + 1);
      }
    }
  };

  const handlePrevButton = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const uploadImg = async (e, typeImage, fungsiSet) => {
    console.log("jalan ey");
    if (e == null) return;
    const imageRef = ref(storage, `images/${typeImage + "-" + idPost}`);
    try {
      const snapshot = await uploadBytes(imageRef, e);
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      fungsiSet(url);
    } catch (error) {
      console.log(error);
    }
  };

  const tag = [difficult];
  return (
    <div className="py-[100px] relative">
      {/* pilih agent dan ability */}
      {page === 1 && (
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
      )}

      {/* pilih map dan pin */}
      {page === 2 && (
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
      )}

      {/* tambahkan informasi */}
      {page === 3 && (
        <div>
          <h1
            className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
          >
            tambahkan informasi
          </h1>
          <div className="w-[80%] flex mx-[50px] my-[70px]">
            {/* display */}
            <div className="bg-white w-1/2 mx-[50px] px-[20px] py-[10px]">
              <h2
                className={`text-[.8rem] ${poppins.className} py-[10px] uppercase`}
              >
                {judul}
              </h2>
              <div className="relative">
                <img src={imageUrl} alt="" />
                {tag.length !== 0 && (
                  <>
                    {tag.map((i) => {
                      if (i === undefined) {
                        return;
                      }
                      return (
                        <div
                          key={i}
                          className={`text-[.7rem] text-black bg-white rounded-[5px] px-[10px] py-[5px] absolute bottom-2 right-2`}
                        >
                          {i}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              <p className={`${robotoMono.className} text-[.8rem] py-[10px]`}>
                {keterangan}
              </p>
              <button
                className={`btn !bg-blue-400 !text-white text-[.8rem] rounded-[3px] ${inter.className} ml-auto block my-[20px]`}
              >
                details
              </button>
            </div>

            {/* form */}
            <div className="w-1/2">
              <form className="text-white flex flex-col gap-[20px]">
                {/* judul */}
                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor="judul"
                    className={`text-[.9rem] ${inter.className}`}
                  >
                    judul*
                  </label>
                  <input
                    type="text"
                    name="judul"
                    id="judul"
                    className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                    placeholder={judul}
                    onChange={(e) => setJudul(e.target.value)}
                  />
                </div>

                {/* keterangan */}
                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor=""
                    className={`text-[.9rem] ${inter.className}`}
                  >
                    keterangan*
                  </label>
                  <input
                    type="text"
                    className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                    placeholder={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </div>

                {/* difficult */}
                <div className="flex flex-col gap-[5px]">
                  <label
                    htmlFor=""
                    className={`text-[.9rem] ${inter.className}`}
                  >
                    tags difficult*
                  </label>
                  <div className="flex gap-[10px]">
                    <button
                      type="button"
                      className={`box-content px-[15px] py-[5px] bg-white text-black text-[.8rem] rounded-[5px] ${
                        robotoMono.className
                      } ${
                        difficult === "easy"
                          ? "border-[2px] border-blue-500"
                          : ""
                      }`}
                      onClick={() => {
                        setDifficult("easy");
                      }}
                    >
                      easy
                    </button>
                    <button
                      type="button"
                      className={`box-content px-[15px] py-[5px] bg-white text-black text-[.8rem] rounded-[5px] ${
                        robotoMono.className
                      } ${
                        difficult === "hard"
                          ? "border-[2px] border-blue-500"
                          : ""
                      }`}
                      onClick={() => setDifficult("hard")}
                    >
                      hard
                    </button>
                  </div>
                </div>

                {/* upload image */}
                <div className="flex flex-col gap-[5px]">
                  <label className={`text-[.9rem] ${inter.className}`}>
                    display image*
                  </label>
                  <label
                    htmlFor="uploadGambar"
                    className={`${robotoMono.className} text-[.8rem] text-black bg-white px-[20px] py-[10px] block w-fit rounded-[5px]`}
                  >
                    upload image
                  </label>
                  <input
                    type="file"
                    id="uploadGambar"
                    className="hidden"
                    onChange={(e) => {
                      uploadImg(e.target.files[0], "banner", setBanner);
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* tambahkan patokan */}
      {page === 4 && (
        <div>
          <h1
            className={`${poppins.className} text-[2rem] uppercase text-white text-center`}
          >
            langkah langkah
          </h1>

          {/* select condition */}
          <div>
            <div className="mx-auto flex justify-center mt-[50px]">
              <button
                onClick={(e) => setPakeVideo(false)}
                className={`btn w-[90px] ${
                  pakeVideo === false ? "!bg-purple-500 !text-white" : ""
                }`}
                id="image"
              >
                image
              </button>
              <button
                onClick={(e) => setPakeVideo(true)}
                className={`btn w-[90px] ${
                  pakeVideo === true ? "!bg-purple-500 !text-white" : ""
                }`}
                id="video"
              >
                video
              </button>
            </div>
            <p
              className={`text-white ${robotoMono.className} text-[.8rem] text-center py-[10px]`}
            >
              *pilih salah satu atau keduanya
            </p>
          </div>

          <div className="flex justify-center w-[100%] px-[50px] my-[70px]">
            {/* display */}
            <div className="bg-white w-1/2 mx-[50px] px-[20px] py-[25px] relative">
              <h2
                className={`text-[.8rem] ${poppins.className} py-[10px] uppercase`}
              >
                {judul}
              </h2>

              <div className="overflow-hidden w-fit flex items-center absolute top-2 right-3 border-black border-[1px] rounded-[8px]">
                <button
                  className={`py-[5px] px-[10px] rounded-l-[6px] flex items-center ${
                    videoVer === false ? "bg-black" : "bg-white"
                  }`}
                  onClick={() => setVideoVer(false)}
                >
                  <span
                    class={`${
                      !videoVer ? "text-white" : "text-black"
                    } material-symbols-outlined block`}
                  >
                    image
                  </span>
                </button>

                <button
                  className={`py-[5px] px-[10px] rounded-r-[6px] flex items-center ${
                    videoVer === true ? "bg-black" : "bg-white"
                  }`}
                  onClick={() => setVideoVer(true)}
                >
                  <span
                    class={`${
                      videoVer ? "text-white" : "text-black"
                    } material-symbols-outlined`}
                  >
                    slideshow
                  </span>
                </button>
              </div>

              {videoVer === false && (
                <div className="flex flex-col gap-[20px] py-[20px] px-[20px]">
                  <div>
                    <p className={`${robotoMono.className} text-[.8rem]`}>
                      1. {caption1}
                    </p>
                    <img className="w-full" src={img1} />
                  </div>
                  <div>
                    <p className={`${robotoMono.className} text-[.8rem]`}>
                      2. {caption2}
                    </p>
                    <img className="w-full" src={img2} />
                  </div>
                  <div>
                    <p className={`${robotoMono.className} text-[.8rem]`}>
                      3. {caption3}
                    </p>
                    <img className="w-full" src={img3} />
                  </div>
                </div>
              )}

              {videoVer === true && (
                <div className="flex flex-col gap-[20px] py-[20px] px-[20px]">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${linkYT}?si=ISXsNOfFl_R0YhJV&rel=0`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* form */}
            <div className="w-1/2">
              {pakeVideo === false && (
                <form className="text-white flex flex-col gap-[30px]">
                  {/* 1 */}
                  <div>
                    <div className="flex flex-col gap-[5px]">
                      <label
                        htmlFor="caption1"
                        className={`text-[.9rem] ${inter.className}`}
                      >
                        deskripsi titik berdiri*
                      </label>
                      <input
                        type="text"
                        name="caption1"
                        id="caption1"
                        className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                        placeholder={caption1}
                        onChange={(e) => setcaption1(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-[5px] py-[15px]">
                      <label
                        htmlFor="gambar1"
                        className={`${robotoMono.className} text-[.8rem] text-black bg-white px-[20px] py-[10px] block w-fit rounded-[5px]`}
                      >
                        upload image
                      </label>
                      <input
                        type="file"
                        id="gambar1"
                        className="hidden"
                        onChange={(e) => {
                          uploadImg(e.target.files[0], "img1", setimg1);
                        }}
                      />
                    </div>
                  </div>

                  {/* 2 */}
                  <div>
                    <div className="flex flex-col gap-[5px]">
                      <label
                        htmlFor="caption2"
                        className={`text-[.9rem] ${inter.className}`}
                      >
                        deskripsi titik kursor*
                      </label>
                      <input
                        type="text"
                        name="caption2"
                        id="caption2"
                        className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                        placeholder={caption2}
                        onChange={(e) => setcaption2(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-[5px] py-[15px]">
                      <label
                        htmlFor="gambar2"
                        className={`${robotoMono.className} text-[.8rem] text-black bg-white px-[20px] py-[10px] block w-fit rounded-[5px]`}
                      >
                        upload image
                      </label>
                      <input
                        type="file"
                        id="gambar2"
                        className="hidden"
                        onChange={(e) => {
                          uploadImg(e.target.files[0], "img2", setimg2);
                        }}
                      />
                    </div>
                  </div>
                  {/* 3 */}
                  <div>
                    <div className="flex flex-col gap-[5px]">
                      <label
                        htmlFor="caption2"
                        className={`text-[.9rem] ${inter.className}`}
                      >
                        titik berdiri*
                      </label>
                      <input
                        type="text"
                        name="caption2"
                        id="caption2"
                        className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                        placeholder={caption2}
                        onChange={(e) => setcaption2(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-[5px] py-[15px]">
                      <label
                        htmlFor="gamabr3"
                        className={`${robotoMono.className} text-[.8rem] text-black bg-white px-[20px] py-[10px] block w-fit rounded-[5px]`}
                      >
                        upload image
                      </label>
                      <input
                        type="file"
                        id="gamabr3"
                        className="hidden"
                        onChange={(e) => {
                          uploadImg(e.target.files[0], "img3", setimg3);
                        }}
                      />
                    </div>
                  </div>
                </form>
              )}

              {pakeVideo === true && (
                <form className="text-white flex flex-col gap-[30px]">
                  <div className="flex flex-col gap-[5px]">
                    <label
                      htmlFor="caption1"
                      className={`text-[.9rem] ${inter.className}`}
                    >
                      id video youtube*
                    </label>
                    <input
                      type="text"
                      name="linkyt"
                      id="linkyt"
                      className={`bg-transparent text-[.8rem] rounded-[5px] ${robotoMono.className}`}
                      placeholder={linkYT}
                      onChange={(e) => setLinkYT(e.target.value)}
                    />
                    <p className={`text-[.7rem] ${inter.className}`}>
                      https://www.youtube.com/watch?v=
                      <span className="bg-yellow-700">b0Ho5AqgwAQ</span>
                    </p>
                    <p className={`text-[.7rem] ${inter.className}`}>
                      direkomendasikan untuk menggunakan video pendek atau bisa
                      juga menggunakan yt short
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-[15px] absolute bottom-[30px] right-[5%]">
        {page !== 1 && (
          <button className={`btn`} onClick={handlePrevButton}>
            prev
          </button>
        )}
        <button className={`btn`} onClick={handleNextButton}>
          next
        </button>
      </div>
    </div>
  );
}
