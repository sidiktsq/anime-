import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers";
import { Navbar } from "@/components/sections/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AnimeHub - Modern Anime Streaming Platform",
  description:
    "Watch your favorite anime with Neo Brutalism design and modern features. Stream, bookmark, and discover anime on AnimeHub.",
  keywords: ["anime", "streaming", "watch", "online", "manga"],
  authors: [{ name: "AnimeHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://animehub.local",
    siteName: "AnimeHub",
    title: "AnimeHub - Modern Anime Streaming",
    description: "Stream your favorite anime with modern design",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-black selection:text-white`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 relative z-0">{children}</main>
          <footer className="bg-accent border-t-4 border-black py-12 text-center text-black font-bold relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="inline-block bg-white border-4 border-black px-6 py-3 shadow-[4px_4px_0_0_#000] mb-4 transform rotate-1">
                <p className="font-black text-xl uppercase tracking-wider">&copy; 2024 AnimeHub. All rights reserved.</p>
              </div>
              <p className="text-sm bg-black text-white inline-block px-4 py-2 border-2 border-white shadow-[2px_2px_0_0_#fff]">
                Data provided by Jikan API • Not affiliated with any copyright holder
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
