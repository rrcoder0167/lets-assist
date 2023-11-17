import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import CategoriesList from "./CategoriesList";
import Projects from "@/components/Projects";
import { TProject } from "@/app/types";

export default function Dashboard() {
  const [projects, setProjects] = useState<TProject[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/projects`, {
          cache: 'no-store',
        });

        if (res.ok) {
          const projects = await res.json();
          setProjects(projects);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
    <div className="projects-container">
        <a href="/create-project" className="btn btn-success createbtn">
          <i className="bi bi-plus-lg"></i>
          Create a Volunteering Opportunity
        </a>
      </div>
      <CategoriesList />
      <div className="card-container">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
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
              spots={project.spots}
              description={project.description}
            />
          ))
        ) : (
          <div>No Posts to display</div>
        )}
      </div>
    </>
  );
}