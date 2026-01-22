import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ChatbotButton from "@/components/ChatbotButton";// Import the new background

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

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
      <body className={`${spaceGrotesk.className} relative`} suppressHydrationWarning>
        
        <ChatbotButton />
        
        <main>
          {children}
        </main>
        
      </body>
    </html>
  );
}
