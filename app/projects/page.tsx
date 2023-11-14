import { projectsData } from "@/data";
import Project from "@/components/Projects";

export default function Projects() {
    return <div>
        <h1>Projects</h1>
        <p>Projects will go here</p>
        {projectsData && projectsData.length > 0 ? (
                projectsData.map((project) => <Projects key={project.id}
                                                        id={project.id}
                                                        author={project.author}
                                                        authorEmail={'test@gmail.com'}
                                                        date={project.datepublished}
                                                        image={project.image}
                                                        location={project.location}
                                                        category={project.category}
                                                        title={project.title}
                                                        spots={project.spots}
                                                        description={project.description}
                                                        />)
            ) : (
                <div>No Posts created yet.</div>
            )
            }
    </div>
}