"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-black text-white border-4 border-white px-4 py-2 w-fit bg-black mb-4">
            ♥ My Bookmarks
          </h1>
          <p className="text-white/70 font-semibold">
            Your saved favorite anime
          </p>
        </div>

        {/* Placeholder - Connect to database later */}
        <div className="bg-black border-4 border-white rounded-lg p-8 text-center">
          <p className="text-2xl font-bold text-white mb-4">No bookmarks yet</p>
          <p className="text-white/70 mb-6">
            Start adding your favorite anime to see them here
          </p>
          <Link href="/anime">
            <Button size="lg" variant="primary">
              Explore Anime
            </Button>
          </Link>
        </div>

        {/* Feature Coming Soon */}
        <div className="mt-8 bg-white text-black p-6 rounded-lg border-4 border-black text-center">
          <p className="font-semibold">
            💾 Database integration in progress - bookmarks will be saved once you login with your account!
          </p>
        </div>
      </div>
    </div>
  );
}
