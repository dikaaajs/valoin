"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
        className="bg-white mx-auto block"
      >
        log out
      </button>
    </div>
  );
}
