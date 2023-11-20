"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import "material-symbols";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "100" });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <AuthProvider>
          <Navbar />
          {children}
          {/* <Analytics /> */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
