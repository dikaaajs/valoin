import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import { AuthProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar2 from "./components/Navbar2";

export const metadata = {
  title: "valoin: homepage",
  description: "temukan lineupmu disini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"relative"}>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8233972067311924"
          crossorigin="anonymous"
        ></script>
        <AuthProvider>
          <Navbar />
          <Navbar2 />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
