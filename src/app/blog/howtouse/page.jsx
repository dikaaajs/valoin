export default function Howtouse() {
  return (
    <div className="text-white flex flex-col gap-[20px]">
      <h1 className="font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px] py-[10px]">
        Cara Pakai
      </h1>
      <img
        src="/howtouse.gif"
        className="w-[80%] md:w-[40%] rounded-sm"
        alt=""
      />
      <p className="text-[.8rem] md:text-[1rem]">
        untuk mengakses lineup anda bisa menklik tombol mulai pada halaman
        utama. lalu pilih karakter, map, serta kondisi (attacker atau deffense)
      </p>
      <p className="text-[.8rem] md:text-[1rem]">
        dengan begitu lineup akan segera muncul (jika ada)
      </p>
    </div>
  );
}
