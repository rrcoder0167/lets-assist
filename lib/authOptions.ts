import prisma from "@/lib/prismadb";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const credentialsSecret = process.env.NEXTAUTH_SECRET;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: googleClientId as string,
      clientSecret: googleClientSecret as string,
    }),
    GithubProvider({
      clientId: githubClientId as string,
      clientSecret: githubClientSecret as string,
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {},
    
    //   async authorize(credentials: any) {
    //     const { email, password } = credentials
    
    //     try {
    //       const user = await prisma.user.findUnique({ where: { email } });
    
    //       if (!user) {
    //         return null;
    //       }
    
    //       const passwordsMatch = await bcrypt.compare(password, user.password);
    
    //       if (!passwordsMatch) {
    //         return null;
    //       }
    
    //       return { email: user.email };
    //     } catch (error) {
    //       console.log("Error: ", error);
    //     }
    //   },
    // }),
  ],
  secret: credentialsSecret,
  pages: {
    signIn: "/login",
  },
  // callbacks: {
  //   async signIn({ user, account, isNewUser }: any) {
  //     if (account.provider === "google" || account.provider === "github") {
  //       const { name, email } = user;
  //       try {
  //         const userExists = await prisma.user.findUnique({ where: { email } });
  //         if (!userExists) {
  //           await prisma.user.create({
  //             data: {
  //               name,
  //               email
  //             },
  //           });
  //         }
  //         if (isNewUser) {
  //           return '/dashboard';
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     return true;
  //   },
  // },
};