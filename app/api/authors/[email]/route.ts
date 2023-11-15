import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { email: string } }
) {
    try {
        const email = params.email;
        const projects = await prisma.user.findUnique({
            where: { email },
            include: {
              projects: { orderBy: { createdAt: "desc" } },
            },
          });
        return NextResponse.json(projects)
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch project." });
    }

}