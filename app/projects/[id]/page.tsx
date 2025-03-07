import { notFound } from "next/navigation";
import { getProject, getCreatorProfile } from "./actions";
import ProjectDetails from "./ProjectDetails";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  params: Props,
): Promise<Metadata> {
  const { id } = await params.params;
  const { project } = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found - Let's Assist",
      description: "Project details not available.",
    };
  }

  return {
    title: `${project.title} - Let's Assist`,
    description: project.description,
  };
}


export default async function ProjectPage(
  params: Props,
): Promise<React.ReactElement> {
  const { id } = await params.params;
  const { project, error: projectError } = await getProject(id);

  if (projectError || !project) {
    notFound();
  }

  const { profile: creator } = await getCreatorProfile(project.creator_id);

  return <ProjectDetails project={project} creator={creator} />;
}
