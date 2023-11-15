import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { title, description, selectedCategory, spots, image, location, publicId } = await req.json();
    const authorEmail="riddhiman.rana@gmail.com"

    if(!title || !description) {
        return NextResponse.json(
            { error: "Title and content are required." },
            { status: 500 }
        );
    }

    try {
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                image,
                spots,
                location,
                publicId,
                catName: selectedCategory,
                authorEmail,
            }
        });

        console.log("Post Created");
        return NextResponse.json(newProject);

    } catch(error) {
        return NextResponse.json({ message: "Could not create post." });
    }
}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: { author: {select: {name: true}}},
            orderBy: {
                createdAt: "desc"
            },
    });
    return NextResponse.json(projects);
} catch(error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get projects. Some error has occurred." }, {status: 500});
    }
}