import { getServerSession } from "next-auth/next";
import Project from "@/components/Projects";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TProject } from "../types";

const getProjects = async (email: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/authors/${email}`);
        const { projects } = await res.json();
        return projects;
    } catch (error) {
        return null;
}};

export default async function Projects() {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let projects = [];

    if (!session) {
        redirect('/login')
    }

    if (email) {
        projects = await getProjects(email);
    }

    return (
    <div>
        <h1>Projects</h1>
        <p>Projects will go here</p>
        {projects && projects.length > 0 ? (
                projects.map((project: TProject) => <Project
                                                    key={project.id}
                                                    id={project.id}
                                                    author={""}
                                                    authorEmail={project.authorEmail}
                                                    date={project.createdAt}
                                                    image={project.image}
                                                    location={project.location}
                                                    category={project.catName}
                                                    eventTime={project.eventTime}
                                                    title={project.title}
                                                    spots={project.spots}
                                                    description={project.description}
                                                        />)
            ) : (
                <div>No Posts created yet.</div>
            )
            }
    </div>)
}