import { getServerSession } from "next-auth/next";
import Project from "@/components/Projects";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { TProject } from "../types";
import { GetUserFromEmail, GetUserFromId } from "@/components/GetUser";
import prisma from "@/lib/prismadb";

const getCreatedProjects = async (email: string) => {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
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
        const userEmail = (await user).email
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/projects/${userId}/register`);
        const data = await res.json();
        const projectsUserIsPartOf = [];

        for (let i = 0; i < data.length(); i++) {
            if (data[i].participants.includes(userEmail, 0)) {
                projectsUserIsPartOf.push(data[i]);
            }
        }

        console.log(JSON.stringify(data));

        return projectsUserIsPartOf;
    } catch (error) {
        return null;
    }
}

export default async function Projects() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let createdProjects = [];
    let signedUpProjects: TProject[] | null = null;

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
            {/* <small className="text-muted">These are the projects you have signed up for!</small>
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
            </div> */}
        </div>)
}