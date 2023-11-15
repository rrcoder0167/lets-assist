import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const project = await prisma.project.findUnique({ where: {id} });
        return NextResponse.json(project)
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch project." }, {status: 500});
    }

}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }   
) {
    const { title, description, selectedCategory, spots, image, location, publicId } = await req.json();
    const id = params.id;
    try {
        const project = await prisma.project.update({
            where: {id},
            data: {
                title,
                description,
                catName:selectedCategory,
                spots,
                image,
                location,
                publicId
            }
        });

        return NextResponse.json(project);

    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not update project." });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    try {
        const project = await prisma.project.delete({ where: { id } });
        return NextResponse.json(project);
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not delete project." });
    }
}