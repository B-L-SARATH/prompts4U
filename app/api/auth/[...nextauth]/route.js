import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/db";
import User from "@/models/User";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session && session.user && session.user.email) {
        const sessionuser = await User.findOne({ email: session.user.email });
        session.user.id = sessionuser._id.toString();

        return session;
      }
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        //check if the user already exists

        const user = await User.findOne({ email: profile.email });
        if (!user) {
          await User.create({
            name: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
