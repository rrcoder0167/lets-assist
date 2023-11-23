import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const pchats = await prisma.projectChat.findMany();
        return NextResponse.json(pchats);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not get project chats. Some error has occurred." }, { status: 500 });
    }
}