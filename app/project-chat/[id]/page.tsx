import prisma from "@/lib/prismadb";
import "./page.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { error } from "console";

const updateChat = async (cId: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/project-chat/${cId}`);
        const data = await res.json();
    } catch (error) {
        return null;
    }
}

export default function ProjectChat({ params }: { params: { id: string } })
{
    const session = getServerSession(authOptions);

    const chat = prisma.projectChat.findUnique({
        where: {
            id: params.id
        }
    });

    if (!chat) {
        throw error("Bald");
    }

    const chatProjectId = chat?.projectId;

    if (!chatProjectId) {
        throw error("Balder");
    }

    const chatOpportunity = prisma.project.findUnique({
        where: {
            id: projectChatId
        }
    });

    if (!chatOpportunity) {
        throw error("Bald-est");
    }
}