import EditProjectForm from "@/components/EditProjectForm"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TProject } from "@/app/types";
import { redirect } from "next/navigation";

const getProject = async(id: string): Promise<TProject | null> => {
    try {
        const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
            cache: "no-store",
        });

        if (res.ok) {
            const post = await res.json();
            return post;
        }

    } catch(error) {
        console.log(error);
    }
    return null;
};

export default async function EditProject ({ params }: {params: {id: string}}) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let projects = [];

    if (!session) {
        redirect('/login')
    }
    const id = params.id;
    const project = await getProject(id);

    return (
        <>
        {project ? <EditProjectForm project={project}/> : <div>Project not found</div>}
    </>
    )
}