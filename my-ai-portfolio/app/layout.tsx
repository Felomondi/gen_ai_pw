import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatbotButton from "@/components/ChatbotButton";
import ParticleBackground from "@/components/ParticleBackground"; // Import the new background

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
      <body className={`${inter.className} relative`}>
        <ParticleBackground /> {/* The new interactive background */}
        
        <Navbar />
        <ChatbotButton />
        
        <main className="pt-32">
          {children}
        </main>
        
      </body>
    </html>
  );
}
