"use client";
import { useRouter } from "next/navigation";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from  "next-auth/providers/github";
import { connectMongoDB } from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";

/*
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { User } = prisma;

async function getUsers() {
    const users = await User.findMany();
    return users;
}

async function createUser(_name: string, _email: string) {
    const user = await User.create({
        name: _name,
        email: _email
    })
    return user;
}
*/
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const router = useRouter();

if (!googleClientId || !googleClientSecret || !githubClientId || !githubClientSecret) {
  throw new Error("Google/Github client ID or client secret is not provided in the environment variables.");
}

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
        GithubProvider({
          clientId: githubClientId,
          clientSecret: githubClientSecret,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const user = { id: "1" };
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/",
      },
    callbacks: {
      async signIn({ user, account, isNewUser }: any) {
          if (account.provider === "google" || account.provider === "github") {
              const { name, email } = user;
              try {
                  await connectMongoDB();
                  const userExists = await User.findOne({ email });
                  if (!userExists) {
                      const res = await fetch("http://localhost:3000/api/user", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                              name,
                              email,
                          }),
                      });
  
                      if (isNewUser) {
                        router.push('/dashboard/get-started');
                      }
                  }
              } catch (error) {
                  console.log(error);
              }
          }
          return Promise.resolve(true);
      },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };