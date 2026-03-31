import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ModeProvider } from "@/components/ModeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Felix Omondi",
  description: "Software developer building thoughtful software across the stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-[family-name:var(--font-body)]">
        <ModeProvider>
          <Nav />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </ModeProvider>
      </body>
    </html>
  );
}
