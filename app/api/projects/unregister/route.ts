import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { projectId, userEmail } = req.body;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  const updatedParticipants = project.participants.filter(email => email !== userEmail);

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: {
      participants: updatedParticipants
    }
  });

  res.json(updatedProject);
}