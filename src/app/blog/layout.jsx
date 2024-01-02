export default function RootLayout({ children }) {
  return (
    <div className="py-[80px] px-[10px]">
      <div className="bg-zinc-900 px-[10px] md:px-[30px] py-[50px] rounded-md shadow-sm shadow-gray-800">
        {children}
      </div>
    </div>
  );
}
