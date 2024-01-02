export default function About() {
  return (
    <div className="text-white flex flex-col gap-[20px]">
      <h1 className="font-montserrat-bold text-[2rem] md:text-[2.5rem] leading-[35px] py-[10px]">
        Tentang Valoin
      </h1>
      <img
        src="/nice-ryo.jpg"
        className="w-[80%] md:w-[40%] rounded-sm"
        alt=""
      />
      <p className="text-[.8rem] md:text-[1rem]">
        valoin, tempat utama kamu untuk menemukan dan menguasai lineup terbaik
        dalam game Valorant. untuk meraih kemenangan dalam pertempuran, strategi
        dan koordinasi tim sangat penting. Itulah mengapa kami hadir untuk
        membantu Anda meningkatkan permainan Anda melalui panduan lineup yang
        tepat.
      </p>
      <p className="text-[.8rem] md:text-[1rem]">
        fitur utama pada website ini ada pada guide lineup menggunakan gambar.
        jadi kalian tidak perlu memuat video untuk melihat guide lineup
      </p>
    </div>
  );
}
