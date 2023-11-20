"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "800",
  preload: true,
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  preload: true,
});
const inter = Inter({
  subsets: ["latin"],
  weight: "500",
});
export default function Post(props) {
  const { data: session, status } = useSession();
  const [mode, setMode] = useState("blur");
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(props.post.like);
  const { judul, keterangan, imageUrl, tag } = props.post;
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
        console.log("masuk sini");
        const tmp = like.filter((e) => e !== props.uid);
        setLike(tmp);
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
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

  console.log(like);
  return (
    <div
      className={`bg-white transition-all duration-300 ease-out ${
        mode === "focus" ? "w-[90%]" : "w-[30%]"
      } py-[10px] px-[20px]`}
    >
      <ToastContainer className={`!${robotoMono.className}`} />
      <h2
        className={`text-[.8rem] ${
          poppins.className
        } py-[10px] uppercase text-black ${
          mode === "focus" ? "text-center py-[40px] text-[1rem]" : ""
        }`}
      >
        {judul}
      </h2>

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
        <p
          className={`${robotoMono.className} text-[.8rem] py-[10px] text-black`}
        >
          {keterangan}
        </p>
        <div className="flex gap-[10px] items-center">
          <span
            className={`${
              liked ? "material-symbols-rounded" : "material-symbols-outlined"
            } cursor-pointer text-black fill-[1]`}
            onClick={handleLikeButton}
          >
            favorite
          </span>
          <p className={`${robotoMono.className} text-[.8rem] text-black`}>
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
              className={`${poppins.className} bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 1
            </p>
            <img className="mx-auto" src={details[0].img1} />
          </div>
          <div className={`w-1/2 px-[25px] ${robotoMono.className}`}>
            <p>deskripsi :</p>
            <p className="">{details[0].caption1}</p>
          </div>

          {/* step 2 */}
          <div className={`w-1/2 px-[25px] ${robotoMono.className} text-right`}>
            <p>deskripsi :</p>
            <p className="">{details[1].caption2}</p>
          </div>
          <div className="relative w-1/2">
            <p
              className={`${poppins.className} bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 2
            </p>
            <img className="mx-auto" src={details[1].img2} />
          </div>

          <div className="relative w-1/2">
            <p
              className={`${poppins.className} bg-[#7F5AF0] text-white py-[10px] px-[15px] w-fit skew-y-3 absolute top-[-15px] left-[-10px]`}
            >
              step 3
            </p>
            <img className="mx-auto" src={details[2].img3} />
          </div>
          <div className={`w-1/2 px-[25px] ${robotoMono.className}`}>
            <p>deskripsi :</p>
            <p className="">{details[2].caption3}</p>
          </div>
        </div>
      </div>

      <div className="material-symbol-rounded"></div>

      <button
        className={`btn !text-white text-[.8rem] rounded-[3px] ${
          inter.className
        } ml-auto block my-[20px] ${
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
