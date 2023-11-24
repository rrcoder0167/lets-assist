import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { stringify } from "querystring";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const userFromId = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!userFromId) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        const project = await prisma.project.findMany({
            where: {
                participants: {
                    hasSome: [
                        userFromId.email
                    ]
                }
            }
        });
        return NextResponse.json(project)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch project." }, { status: 500 });
    }

}