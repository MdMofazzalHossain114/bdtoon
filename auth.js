import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./lib/dbConnect";
import UserModel from "./models/user";
import bcrypt from "bcryptjs";
import { loginSchema } from "./lib/schema/loginSchema";
import { z } from "zod";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      id: "credential",
      name: "credential",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await dbConnect();

        const { identifier, password } = credentials;

        console.log("From AUTH - ", identifier, password);

        try {
          // Validate using Zod
          const result = await loginSchema.safeParseAsync({
            identifier: identifier,
            password: password,
          });

          const {
            identifier: validatedIdentifier,
            password: validatedPassword,
          } = result.data;

          //Find user by email or username
          const user = await UserModel.findOne({
            $or: [
              { email: validatedIdentifier },
              { username: validatedIdentifier },
            ],
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (!user.isVerified) {
            throw new Error(
              encodeURIComponent("Please verify your account before login")
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            validatedPassword,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            throw new Error(error.errors[0].message); // Optionally show the first error
          }

          console.error("Authorize Error:", error);
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
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
        token.role = user.role;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token._id;
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.role = token.role;
      }

      return session;
    },
  },
});
