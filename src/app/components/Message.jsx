"use client";
export default function Message(props) {
  const { pesan } = props;
  return (
    <div className={`px-[15px] py-[8px] text-[.7rem] rounded-[4px] bg-white`}>
      <p>{pesan}</p>
    </div>
  );
}
