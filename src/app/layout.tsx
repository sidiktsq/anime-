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
    "Watch your favorite anime with a premium dark mode design. Stream, bookmark, and discover anime on AnimeHub.",
  keywords: ["anime", "streaming", "watch", "online", "manga"],
  authors: [{ name: "AnimeHub" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://animehub.local",
    siteName: "AnimeHub",
    title: "AnimeHub - Premium Anime Streaming",
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
        <meta name="theme-color" content="#09090b" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 relative z-0">{children}</main>
          <footer className="border-t border-white/10 bg-black/40 py-12 text-center relative overflow-hidden backdrop-blur-xl mt-auto">
            <div className="container mx-auto px-4">
              <div className="mb-6 flex justify-center">
                <span className="text-2xl font-black text-white tracking-tight">
                  Anime<span className="text-primary">Hub</span>
                </span>
              </div>
              <p className="text-zinc-400 text-sm mb-2">
                &copy; {new Date().getFullYear()} AnimeHub. All rights reserved.
              </p>
              <p className="text-xs text-zinc-600">
                Data provided by MyAnimeList API • Not affiliated with any copyright holder
              </p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
