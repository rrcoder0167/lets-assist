import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { stringify } from "querystring";

export async function GET(
    req: Request,
    { params }: { params: { cId: string } }
) {
    try {
        const projectChat = await prisma.projectChat.findUnique({
            where: {
                id: cId
            }
        });
        return NextResponse.json(projectChat)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch project." }, { status: 500 });
    }

}