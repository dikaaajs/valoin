"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../libs/firebase";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CropImgPP(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { img, setCropDialog, id, setUrlPP, password } = props;
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const imageFile = img;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels);
      const uploadImgPP = await uploadBytes(
        ref(storage, `profile/${id}/pp`),
        croppedImage.file
      );
      const imgurl = await getDownloadURL(uploadImgPP.ref);
      setUrlPP(imgurl);

      //   upload to mongosb
      const res = await axios.post("/api/user/edit", {
        pp: imgurl,
        id,
      });
      const login = await signIn("credentials", {
        username: session.user.name,
        secret: "kopidinginnyamandilambung",
        redirect: false,
      });

      if (login.ok === true) {
        router.push(`/profile/${session.user.name}`, {
          message: "berhasil",
        });
      }
      setCropDialog(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-white absolute z-50 rounded-[10px] w-[80%] left-1/2 transform -translate-x-1/2 py-[50px]">
      <div className="relative h-[500px] w-[800px] mx-auto">
        {imageFile === null ? (
          <div className="text-center text-black">masukan gambar</div>
        ) : (
          <Cropper
            image={imageFile}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
      <label htmlFor="zoom" className="block mx-auto text-center pt-[20px]">
        zoom
      </label>
      <input
        id="zoom"
        type="range"
        min={1}
        max={3}
        step={0.1}
        onChange={(e) => {
          setZoom(e.target.value);
        }}
        className="mx-auto block w-[50%]"
      />
      <div className="flex justify-end px-[50px] pt-[20px]">
        <button
          className="text-white px-[20px] py-[10px] bg-[#7F5AF0] rounded-[5px] flex gap-[5px] items-center"
          onClick={handleDone}
        >
          upload <span className="material-symbols-outlined">done</span>
        </button>
      </div>
    </div>
  );
}
