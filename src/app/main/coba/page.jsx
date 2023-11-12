"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../utils/cropImage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../libs/firebase";

export default function Demo() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFile = (e) => {
    if (e.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        console.log(e);
        setImageFile(e.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imageFile, croppedAreaPixels);
      console.log("donee", { croppedImage });
      const imageRef = ref(storage, `images/ujicoba`);
      const snapshot = await uploadBytes(imageRef, croppedImage.file);
      console.log(snapshot);
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
    } catch (e) {
      console.error(e);
    }
  };

  console.log(imageFile);
  return (
    <div>
      <input type="file" onChange={(e) => handleFile(e)} />
      <div className="relative h-[500px]">
        {imageFile === null ? (
          <div className="text-center text-white">masukan gambar</div>
        ) : (
          <Cropper
            image={imageFile}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
      <input
        type="range"
        min={1}
        max={3}
        step={0.1}
        onChange={(e) => {
          console.log(e.target.value);
          setZoom(e.target.value);
        }}
      />
      <button className="text-white" onClick={handleDone}>
        done
      </button>
    </div>
  );
}
