"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post(props) {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState("blur");
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(props.post.like);
  const [detailsLikeData, setDetailsLikeData] = useState([]);
  const [showDetailsLike, setShowDetailsLike] = useState(false);

  const { judul, keterangan, imageUrl, tag } = props.post;
  const { pp, username } = props.post.userInfo;
  const details = props.post.imgAndDes;

  const handleLikeButton = async () => {
    if (session === null) return toast.warn("login terlebih dahulu");
    try {
      const response = await axios.post("/api/lineup/like", {
        idUser: props.uid,
        idLineup: props.post._id,
      });

      if (response.data.type === "like") {
        const tmp = [...like];
        tmp.push(props.uid);
        setLike(tmp);
        setLiked(true);
      } else {
        const tmp = like.filter((e) => e !== props.uid);
        setLike(tmp);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeDetails = async () => {
    const res = await axios.get(
      `/api/lineup/like/details?idLineup=${props.post._id}`
    );
    setDetailsLikeData(res.data.usersData);
    setShowDetailsLike(true);
  };

  const checkLiked = () => {
    if (like.includes(props.uid) && props.uid !== undefined) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };

  useEffect(() => {
    checkLiked();
  }, []);

  return (
    <div
      className={`bg-white transition-all duration-300 ease-out ${
        mode === "focus" ? "w-[90%]" : "w-[30%]"
      } py-[10px] px-[20px]`}
    >
      <ToastContainer className={`!font-roboromono-medium`} />

      {/* details like */}
      {showDetailsLike && (
        <div className="bg-white text-black py-[15px] px-[15px] rounded-[5px] z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] shadow-lg duration-300">
          <div className="flex justify-between">
            <h1 className="font-poppins-bold pb-[10px]">disukai oleh</h1>
            <img
              className=" cursor-pointer w-[20px]"
              onClick={() => setShowDetailsLike(false)}
              src="/icon/close.svg"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            {detailsLikeData.map((i, idx) => {
              return (
                <div className="flex gap-[10px] items-center" key={idx}>
                  <img src={i.pp} alt="pp" className="rounded-full w-[25px] " />
                  <Link
                    href={`/profile/${i.username}`}
                    className="font-rethink !font-[700] text-[.8rem]"
                  >
                    {i.username}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        className={`flex gap-[10px] uppercase py-[10px] items-center text-black text-[.8rem] font-poppins-bold ${
          mode === "focus" ? "justify-center py-[40px] text-[2rem]" : ""
        }`}
      >
        <Link href={`/profile/${username}`}>
          <img
            src={pp}
            className="rounded-full w-[25px] h-[25px]"
            alt={username}
          />
        </Link>

        <h2 className={`  `}>{judul}</h2>
      </div>

      {/* thumbnail */}
      <div className={`${mode === "focus" ? "hidden" : ""}`}>
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
            {like.length} like
          </p>
        </div>
      </div>

      {/* detail */}
      <div className={`${mode === "focus" ? "" : "hidden"} text-black`}>
        <div className="flex flex-wrap gap-y-[50px]">
          {/* step 1 */}
          <div className="relative w-1/2">
            <p
              className={` bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 1
            </p>
            <img className="mx-auto" src={details[0].img1} />
          </div>
          <div className={`w-1/2 px-[25px]`}>
            <p>deskripsi :</p>
            <p className="">{details[0].caption1}</p>
          </div>

          {/* step 2 */}
          <div className={`w-1/2 px-[25px] text-right`}>
            <p>deskripsi :</p>
            <p className="">{details[1].caption2}</p>
          </div>
          <div className="relative w-1/2">
            <p
              className={` bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 2
            </p>
            <img className="mx-auto" src={details[1].img2} />
          </div>

          <div className="relative w-1/2">
            <p
              className={`bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 3
            </p>
            <img className="mx-auto" src={details[2].img3} />
          </div>
          <div className={`w-1/2 px-[25px]`}>
            <p>deskripsi :</p>
            <p className="">{details[2].caption3}</p>
          </div>
        </div>
      </div>

      <div className="material-symbol-rounded"></div>

      <button
        className={`btn !text-white text-[.8rem] rounded-[3px] font-robotomono-medium ml-auto block my-[20px] ${
          mode === "focus" ? "!bg-red-500" : "!bg-blue-400"
        }`}
        onClick={() => {
          if (mode === "focus") setMode("blur");
          if (mode === "blur") setMode("focus");
        }}
      >
        {mode === "focus" ? "close" : "detail"}
      </button>
    </div>
  );
}
