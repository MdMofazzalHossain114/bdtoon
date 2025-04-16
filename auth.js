import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import UserModel from "./lib/models/User";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      id: "credential",
      name: "credential",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "text" },
      },

      async authorize(credentials) {
        await dbConnect();

        console.log("Authorizing using Email or username password");
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          const correctPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (correctPassword) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      // Only for OAuth sign-ins
      if (account.provider === "google" || account.provider === "github") {
        let existingUser = await UserModel.findOne({ email: user.email });

        function generateUsernameFromEmail(email) {
          // Step 1: Get the part before the "@" symbol
          const usernameBase = email.split("@")[0];

          // Step 2: Generate a random 5-digit number (ensuring uniqueness)
          const randomDigits = Math.floor(10000 + Math.random() * 90000); // Random 5-digit number

          // Step 3: Combine the base username with the random digits
          const uniqueUsername = `${usernameBase}${randomDigits}`;

          return uniqueUsername;
        }

        if (!existingUser) {
          // Function to generate a UUID-like string with a length between 10 and 20 characters

          existingUser = new UserModel({
            email: user.email,
            username: generateUsernameFromEmail(user.email), // or generate unique one
            firstname: user.name,
            lastname: user.name,
            isVerified: true, // mark as verified for OAuth
            profilePicture: user.image,
            password: "",
          });
          await existingUser.save();

          console.log("Creating new user", user.email);
        }
      }

      console.log("Logged in via OATH, did not create any account");
      return true; // proceed with sign-in
    },

    async jwt({ user, token }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
      }

      return session;
    },
  },
});
