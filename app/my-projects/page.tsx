import { getServerSession } from "next-auth/next";
import Project from "@/components/Projects";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { TProject } from "../types";
import { GetUserFromEmail } from "@/components/GetUser";
import prisma from "@/lib/prismadb";

const getCreatedProjects = async (email: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/authors/${email}`);
        const { projects } = await res.json();
        return projects;
    } catch (error) {
        return null;
    }
};

const getSignedUpProjects = async (uEmail: string) => {
    try {
        const user = prisma.user.findUniqueOrThrow({
            where: {
                email: uEmail
            }
        })
        const userId = (await user).id
        const res = await fetch(`http://localhost:3000/api/projects/${userId}/signedup`);
        const data = await res.json();
        return data;
    } catch (error) {
        return null;
    }
}

export default async function Projects() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let createdProjects = [];
    let signedUpProjects = [];

    if (!session) {
        redirect('/login')
    }

    if (email) {
        createdProjects = await getCreatedProjects(email);
        signedUpProjects = await getSignedUpProjects(email);
    }

    return (
        <div>
            <title>My Projects</title>
            <small className="text-muted">These are the projects you have created!</small>
            <div className="d-flex flex-wrap">
                {createdProjects && createdProjects.length > 0 ? (
                    createdProjects.map((project: TProject) => <Project
                        key={project.id}
                        id={project.id}
                        author={""}
                        authorEmail={project.authorEmail}
                        date={project.createdAt}
                        image={project.image}
                        location={project.location}
                        participants={project.participants || []}
                        category={project.catName}
                        eventTime={project.eventTime}
                        title={project.title}
                        spots={project.spots}
                        description={project.description}
                    />)
                ) : (
                    <div>No projects created yet.</div>
                )
                }
            </div>
            <small className="text-muted">These are the projects you have signed up for!</small>
            <div className="d-flex flex-wrap">
                {signedUpProjects && signedUpProjects.length > 0 ? (
                    signedUpProjects.map((project: TProject) => <Project
                        key={project.id}
                        id={project.id}
                        author={""}
                        authorEmail={project.authorEmail}
                        date={project.createdAt}
                        image={project.image}
                        location={project.location}
                        participants={project.participants || []}
                        category={project.catName}
                        eventTime={project.eventTime}
                        title={project.title}
                        spots={project.spots}
                        description={project.description}
                    />)
                ) : (
                    <div>No projects signed up for yet.</div>
                )
                }
            </div>
        </div>)
}