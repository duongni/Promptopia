import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
const handler = NextAuth({
  providers: [
    /*option objects within the {}*/
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async singIn({ profile }) {
    try {
      //every Next.JS route is serverless route,
      //which mean it is Lambda function,
      //which mean it only open up when it get called.
      //that means whenever it called it will spin up server and connect to the data base.
      await connectToDB();

      // check if a user already exists
      const userExists = await User.findOne({
        email: profile.email,
      });
      //if not, create a new user and save it to the database
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }
      //if sign in

      return true;
    } catch (error) {
      //if not sign in
      console.log(error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
