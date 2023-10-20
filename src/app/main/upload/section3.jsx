const Section3 = (props) => {
  const {
    poppins,
    imageUrl,
    tag,
    robotoMono,
    inter,
    setJudul,
    setKeterangan,
    setDifficult,
    difficult,
    uploadImg,
    judul,
    keterangan,
    setBanner,
  } = props;
  return (
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
              <label htmlFor="" className={`text-[.9rem] ${inter.className}`}>
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
              <label htmlFor="" className={`text-[.9rem] ${inter.className}`}>
                tags difficult*
              </label>
              <div className="flex gap-[10px]">
                <button
                  type="button"
                  className={`box-content px-[15px] py-[5px] bg-white text-black text-[.8rem] rounded-[5px] ${
                    robotoMono.className
                  } ${
                    difficult === "easy" ? "border-[2px] border-blue-500" : ""
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
                    difficult === "hard" ? "border-[2px] border-blue-500" : ""
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
                className={`${robotoMono.className} text-[.8rem] text-black bg-white px-[20px] py-[10px] block w-fit rounded-[5px] cursor-pointer`}
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
  );
};

export default Section3;
