import { Request } from 'next/server';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';


export async function DELETE(
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
  
        const updatedParticipants = project.participants.filter((participant) => participant !== participants);
  
        const updatedProject = await prisma.project.update({
            where: {id},
            data: {
                participants: updatedParticipants,
            }
        });
  
        return NextResponse.json(updatedProject);
  
    } catch(error) {
        console.log(error);
        return NextResponse.json({ message: "Could not update project." });
    }
  }