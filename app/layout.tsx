import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/page";
import { NavItems } from "@/components/navbarItems/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Photo Grid",
    default: "Where Images Speak a Thousand Wishes - Photo Grid",
  },
  description:
    "Explore wishful images at Photo Grid, where sentiments from good mornings to celebrations are beautifully captured.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer autoClose={false} />
        <Navbar navItems={NavItems} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
