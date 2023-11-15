import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { catName: string } }
) {
    try {
        const catName = params.catName;
        const projects = await prisma.category.findUnique({ where: {catName}, include: { projects: { include: {author: true}, orderBy: { createdAt: "desc" } } }, });
        return NextResponse.json(projects)
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch project." }, {status: 500});
    }

}