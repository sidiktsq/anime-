import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Note: Database adapter setup required for production
// For development demo, authentication is configured but database integration pending
// See README.md for setup instructions

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma), // Enable after database setup
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt", // Use JWT for demo without database
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
