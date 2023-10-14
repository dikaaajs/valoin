"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile({ params }) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session === null) {
      router.replace("/");
    }
  }, [session]);

  return (
    <div className=" text-center py-[50px]">
      <h1 className="text-[2rem] text-white">
        ini porfile {session?.user?.email}
      </h1>
      <button onClick={() => signOut()} className="text-white">
        log out
      </button>
    </div>
  );
}
