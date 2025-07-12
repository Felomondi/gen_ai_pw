import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatbotButton from "@/components/ChatbotButton";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Felix Omondi | AI Portfolio",
  description: "A modern, AI-powered personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* CRUCIAL: Make sure the 'relative' class is here. 
      */}
      <body className={`${inter.className} relative`}>
        
        {/* CRUCIAL: This entire block must exist right after the <body> tag.
        */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
          <div className="shape shape4"></div>
        </div>

        <Navbar />
        <ChatbotButton />
        {children}
        <Analytics />
      </body>
    </html>
  );
}