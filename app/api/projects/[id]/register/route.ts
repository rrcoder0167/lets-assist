import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { TProject } from "@/app/types";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { participants } = await req.json();
    const id = params.id;

    try {
        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json({ message: "Project not found." });
        }

        const updatedParticipants = [...project.participants, participants];

        if (project.spots == null) {
            return NextResponse.json({ message: "Project spots is null." });
        }

        const updatedSpots = +project.spots - 1;
        
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                participants: updatedParticipants,
                spots: updatedSpots,
            }
        });

        return NextResponse.json(updatedProject);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not update project." });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { participant } = await req.json();
    const id = params.id;

    try {
        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return NextResponse.json({ message: "Project not found." });
        }

        const updatedParticipants = project.participants.filter(p => p !== participant);

        if (project.spots == null) {
            return NextResponse.json({ message: "Project spots is null." });
        }

        const updatedSpots = +project.spots + 1
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                spots: updatedSpots,
                participants: updatedParticipants,
            }
        });

        return NextResponse.json(updatedProject);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not update project." });
    }
}

export async function GET() {
    try {
        const participants = await prisma.project.findMany();
        return NextResponse.json(participants);
    } catch (error) {
        console.log(error);
        return NextResponse.json("Something went wrong");
    }
}