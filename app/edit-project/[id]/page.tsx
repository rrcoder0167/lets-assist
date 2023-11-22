import EditProjectForm from "@/components/EditProjectForm"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TProject } from "@/app/types";
import { redirect } from "next/navigation";
import { GetProject } from "@/components/GetProject";

export default async function EditProject({ params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    let projects = [];

    if (!session) {
        redirect('/login')
    }
    const id = params.id;
    const project = await GetProject(id);

    return (
        <>
        <title>{project?.title}</title>
            {project ? <EditProjectForm project={project} /> : <div>Project not found</div>}
        </>
    )
}