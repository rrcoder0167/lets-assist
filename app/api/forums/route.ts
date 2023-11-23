import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
    try {
        const forumPosts = await prisma.forumPost.findMany();
        return NextResponse.json(forumPosts);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong")
    }
}