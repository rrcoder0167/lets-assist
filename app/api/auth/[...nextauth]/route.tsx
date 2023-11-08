import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
    throw new Error("Google client ID or client secret is not provided in the environment variables.");
}

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
        }),
    ],
    callbacks: {
        async signIn({ user, account }: any) {
            if (account.provider === "google") {
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

                        if (res.ok) {
                            return user;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            return user;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };