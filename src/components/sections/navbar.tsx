"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, X, Search } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Anime", href: "/anime" },
    { label: "Genres", href: "/genres" },
    { label: "Schedule", href: "/schedule" },
  ];

  const handleSearchChange = (value: string) => {
    setSearchText(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(`/anime?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary border-b-4 border-black shadow-[0_4px_0_0_#000]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-xl font-black flex items-center justify-center w-10 h-10 rounded bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
            ▶
          </div>
          <span className="text-2xl font-black text-black hidden sm:inline tracking-tight uppercase">AnimeHub</span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 font-black uppercase tracking-wider border-2 border-black transition-all ${
                pathname === item.href 
                ? "bg-black text-white shadow-[2px_2px_0_0_#000]" 
                : "bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-md"
          >
            <Search size={24} className="font-black" />
          </button>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="w-10 h-10 flex items-center justify-center bg-accent text-black border-4 border-black rounded-full font-black shadow-[4px_4px_0_0_#000]"
              >
                {session.user.name?.[0] || "U"}
              </Link>
              <Button
                size="sm"
                className="neo-button bg-white text-black"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="neo-button bg-accent text-black"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login
            </Button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 bg-white text-black border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-md"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-b-4 border-black bg-secondary"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="relative">
              <Input
                placeholder="Search anime..."
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white border-4 border-black text-black font-bold h-14 pl-4 pr-12 rounded-xl shadow-[4px_4px_0_0_#000] focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-primary border-b-4 border-black"
        >
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 bg-white text-black font-black uppercase border-4 border-black text-center shadow-[4px_4px_0_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
