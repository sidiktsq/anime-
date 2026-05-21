"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Catalog", href: "/anime" },
    { label: "Genres", href: "/genres" },
  ];

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(`/anime?${params.toString()}`);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-lg group-hover:scale-105 transition-transform">
              <PlayCircle size={24} className="ml-0.5" />
            </div>
            <span className="text-xl font-black text-white hidden sm:inline tracking-tight">
              Anime<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  pathname === item.href 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
            >
              <Search size={20} />
            </button>

            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-zinc-700 to-zinc-800 text-white border border-white/10 rounded-full font-bold shadow-md hover:scale-105 transition-transform"
                >
                  {session.user.name?.[0]?.toUpperCase() || "U"}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-zinc-400 hover:text-white"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold px-6 hidden sm:flex"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Login
              </Button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-300 hover:text-white border border-white/5 transition-all"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="relative max-w-3xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                  <Input
                    placeholder="Search for anime, characters, or genres..."
                    value={searchText}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-white/10 text-white font-medium h-14 pl-12 pr-4 rounded-2xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-background/98 backdrop-blur-2xl pt-24"
          >
            <div className="flex flex-col p-6 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-4 rounded-2xl font-bold text-lg transition-all ${
                    pathname === item.href
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="mt-8 border-t border-white/10 pt-8">
                {!session?.user ? (
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl h-14 font-bold text-lg"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                  >
                    Log In / Sign Up
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    className="w-full rounded-2xl h-14 font-bold text-lg"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
