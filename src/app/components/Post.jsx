"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post({ clientUsername, clientId, post }) {
  const { judul, keterangan, tag, userInfo, imgAndDes, like } = post;
  const { pp, username } = userInfo;
  const details = imgAndDes;

  const [mode, setMode] = useState("blur");
  const [liked, setLiked] = useState(false);
  const [likesId, setLikesId] = useState(like);
  const [detailsLikeData, setDetailsLikeData] = useState([]);
  const [showDetailsLike, setShowDetailsLike] = useState(false);
  const [versi, setVersi] = useState("step by step");

  const handleLikeButton = async () => {
    if (clientUsername === undefined)
      return toast.warn("login terlebih dahulu");
    try {
      const response = await axios.post("/api/lineup/like", {
        clientUsername,
        idLineup: post._id,
      });

      // type can be like or unlike
      if (response.data.type === "like") {
        setLikesId(response.data.updateLikesId);
        setLiked(true);
      } else {
        setLikesId(response.data.updateLikesId);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeDetails = async () => {
    const res = await axios.get(
      `/api/lineup/like/details?idLineup=${post._id}`
    );
    setDetailsLikeData(res.data.usersData);
    setShowDetailsLike(true);
  };

  const checkLiked = () => {
    if (likesId.includes(clientId) && clientId !== undefined) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    setLikesId(like);
  };

  useEffect(() => {
    checkLiked();
  }, [like, likesId]);

  return (
    <div
      className={`bg-white transition-all duration-300 ease-out overflow-y-scroll  ${
        mode === "focus"
          ? "md:w-[90%] w-[90%] fixed z-50 top-[30px] bottom-[30px] h-[90hv] border-black border-[3px] rounded-md  md:px-[50px]"
          : "md:w-[30%] w-full"
      } py-[10px] px-[20px]`}
    >
      <ToastContainer className={`!font-roboromono-medium`} />

      {/* details like */}
      {showDetailsLike && (
        <div className="bg-white text-black py-[20px] px-[15px] rounded-[5px] z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[30%] shadow-md shadow-slate-800 duration-300">
          <div className="flex justify-between pt-[10px] pb-[10px] border-black border-b-[1px]">
            <h1 className="font-poppins-bold pb-[10px] text-center">disukai</h1>
            <img
              className=" cursor-pointer w-[20px] h-[20px]"
              onClick={() => setShowDetailsLike(false)}
              src="/close.svg"
            />
          </div>

          <div className="flex flex-col gap-[10px] py-[20px]">
            {detailsLikeData.map((i, idx) => {
              return (
                <div className="flex gap-[10px] items-center" key={idx}>
                  <img src={i.pp} alt="pp" className="rounded-full w-[25px] " />
                  <Link
                    href={`/profile/${i.username}`}
                    className="font-robotomono-medium text-[.7rem] underline underline-offset-4"
                  >
                    {i.username}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* header */}
      <div
        className={`flex gap-[10px] uppercase py-[10px] items-center text-black text-[.8rem] font-poppins-bold ${
          mode === "focus" ? "justify-center py-[40px] text-[2rem]" : ""
        }`}
      >
        <Link href={`/profile/${username}`} className="!w-[30px]">
          <img src={pp} className="rounded-full w-[30px]" alt={username} />
        </Link>

        <h2 className={`text-[1em] leading-[25px]`}>{judul}</h2>
      </div>

      {/* thumbnail */}
      <div className={`${mode === "focus" ? "hidden" : ""}`}>
        <div className="relative">
          <img src={imgAndDes[2].img3} alt="" />

          <div className="flex text-[.7rem] absolute bottom-2 right-2 gap-[10px]">
            {tag.map((i) => {
              return (
                <div
                  key={i}
                  className={` text-black bg-white rounded-[5px] px-[10px] py-[5px]`}
                >
                  {i}
                </div>
              );
            })}
          </div>
        </div>
        <p className={`text-[.8rem] py-[10px] text-black`}>{keterangan}</p>
        <div className="flex gap-[10px] items-center">
          <img
            className={`cursor-pointer text-black fill-[1] w-[20px]`}
            onClick={handleLikeButton}
            src={`/icon/favorite-${liked ? "active" : "unactive"}.svg`}
          />
          <p
            className={`cursor-pointer text-[.8rem] text-black`}
            onClick={handleLikeDetails}
          >
            {likesId.length} like
          </p>
        </div>
      </div>

      {/* detail */}
      <div className={`${mode === "focus" ? "" : "hidden"} text-black`}>
        {/* toogle versi */}
        <div className="py-[10px] px-[10px] gap-[10px] flex justify-center my-[10px]">
          <button
            className={`${
              versi === "step by step" ? "!bg-blue-500 text-white" : ""
            } btn`}
            onClick={() => setVersi("step by step")}
          >
            step by step
          </button>
          <button
            className={`${
              versi === "video" ? "!bg-blue-500 text-white" : ""
            } btn`}
            onClick={() => setVersi("video")}
          >
            video
          </button>
        </div>

        {/* step by step */}
        {versi === "step by step" && (
          <div className="flex flex-col gap-y-[50px] justify-center">
            {/* step 1 */}
            <div className="text-center">
              <div className="relative w-full md:w-[70%] mx-auto">
                <p
                  className={` bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px] text-center`}
                >
                  step 1
                </p>
                <img className="mx-auto" src={details[0].img1} />
              </div>
              <div className={`w-full text-[.7rem] font-poppins-medium`}>
                <p className="">{details[0].caption1}</p>
              </div>
            </div>

            {/* step 2 */}
            <div className="text-center">
              <div className="relative w-full md:w-[70%] mx-auto">
                <p
                  className={` bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px] text-center`}
                >
                  step 2
                </p>
                <img className="mx-auto" src={details[1].img2} />
              </div>
              <div className={`w-full text-[.7rem] font-poppins-medium`}>
                <p className="">{details[1].caption2}</p>
              </div>
            </div>

            {/* step 3 */}
            <div className="text-center">
              <div className="relative w-full md:w-[70%] mx-auto">
                <p
                  className={` bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px] text-center`}
                >
                  step 3
                </p>
                <img className="mx-auto" src={details[2].img3} />
              </div>
              <div className={`w-full text-[.7rem] font-poppins-medium`}>
                <p className="">{details[2].caption3}</p>
              </div>
            </div>
          </div>
        )}

        {/* video */}
        {versi === "video" && (
          <div className="flex flex-col gap-y-[50px] justify-center">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${post.linkVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="mx-auto w-[90%] md:w-[70%]"
            ></iframe>
          </div>
        )}
      </div>

      {/* close button */}
      <button
        className={`btn !text-white text-[.8rem] rounded-[3px] font-robotomono-medium ml-auto block my-[20px] ${
          mode === "focus" ? "!bg-red-500" : "!bg-blue-500"
        }`}
        onClick={() => {
          if (mode === "focus") setMode("blur");
          if (mode === "blur") setMode("focus");
        }}
      >
        {mode === "focus" ? "close" : "detail"}
      </button>
      <button>
        <img
          src="/close-2.svg"
          className={`w-[50px] absolute top-[20px] right-[20px] ${
            mode === "focus" ? "" : "hidden"
          }`}
          onClick={() => setMode("blur")}
        />
      </button>
    </div>
  );
}
