import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import "material-symbols";
import { AuthProvider } from "./Providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "valoin: homepage",
  description: "temukan lineupmu disini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"relative"}>
        <AuthProvider>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
