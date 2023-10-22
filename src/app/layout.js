"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import "material-symbols";
import { Provider } from "react-redux";
import { store } from "../../libs/redux/store";
import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "100" });
console.log(store);
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
