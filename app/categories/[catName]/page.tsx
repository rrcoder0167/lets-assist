import { TProject } from "@/app/types";
import Projects from "@/components/Projects";

const getProjects = async (catName: string): Promise<TProject[] | null> => {
    try {
        const res = await fetch(`http://localhost:3000/api/categories/${catName}`, {cache: "no-store"});
        if (res.ok) {
            const categories = await res.json();
            const projects = categories.projects();
            return projects;
        }
    } catch(error) {
        console.log(error);
    }
    return null;
}

export default async function CategoryProjects({params}: {params: {catName: string}}) {
    const category = params.catName;
    const projects = await getProjects(category);
    console.log(projects);

    return (
        <>
        <h1>
            <span>Category: </span>{" "}{decodeURIComponent(category)}

            {projects && projects.length > 0 ? (
          projects.map((project: TProject) => (
            <Projects key={project.id}
              id={project.id}
              author={project.author.name}
              authorEmail={project.authorEmail}
              eventTime={project.eventTime}
              image={project.image}
              location={project.location}
              category={project.catName}
              title={project.title}
              date={project.createdAt}
              participants={project.participants || []}
              spots={project.spots}
              description={project.description}
            />
          ))
        ) : (
          <div>No Posts to display</div>
        )}
        </h1>
        </>
    )

}