import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from  "next-auth/providers/github";
import { connectMongoDB } from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user"
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import Email from "next-auth/providers/email";
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
const credentialsSecret = process.env.NEXTAUTH_SECRET;

if (!googleClientId || !googleClientSecret || !githubClientId || !githubClientSecret || !credentialsSecret) {
  throw new Error("Google/Github client ID or client secret is not provided in the environment variables.");
}

export const authOptions = {
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
      
            async authorize(credentials:any) {
              const { email, password } = credentials
      
              try {
                await connectMongoDB();
                const user = await User.findOne({ email });
      
                if (!user) {
                  return null;
                }
      
                const passwordsMatch = await bcrypt.compare(password, user.password);
      
                if (!passwordsMatch) {
                  return null;
                }
      
                return user;
              } catch (error) {
                console.log("Error: ", error);
              }
            },
          }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
      },
      secret: credentialsSecret,
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
                        Promise.resolve("/dashboard");
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