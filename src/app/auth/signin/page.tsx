"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block text-4xl font-black text-white bg-white text-black px-4 py-2 rounded-lg border-4 border-black mb-4">
            ▶
          </div>
          <h1 className="text-4xl font-black text-white mb-2">AnimeHub</h1>
          <p className="text-white/70 font-semibold">
            Your gateway to anime streaming
          </p>
        </div>

        {/* Card */}
        <div className="bg-black border-4 border-white rounded-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-white/70 text-sm">
              Sign in to access your bookmarks, watch history, and more
            </p>
          </div>

          {/* Google Sign In */}
          <Button
            size="lg"
            variant="primary"
            onClick={handleGoogleSignIn}
            isLoading={isLoading}
            className="w-full justify-center"
          >
            {isLoading ? "Signing in..." : "🔗 Sign in with Google"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-white/70 font-semibold">
                More options coming soon
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white/10 border-2 border-white/30 rounded p-4 text-sm">
            <p className="text-white/80">
              <span className="font-semibold">No account yet?</span> Sign in with Google to create one
              instantly.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2 pt-4">
            <p className="text-xs font-semibold text-white/70 uppercase">
              Features:
            </p>
            <ul className="text-sm text-white/80 space-y-1">
              <li>✓ Save your favorite anime</li>
              <li>✓ Track your watch history</li>
              <li>✓ Write reviews and ratings</li>
              <li>✓ Personalized recommendations</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 text-xs mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
