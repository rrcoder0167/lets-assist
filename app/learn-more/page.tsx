import React, { useState } from 'react';
import Project from '@/components/Projects';
import { projectsData } from "@/data";

export default function LearnMore() {
    const [opportunityData, setOpportunityData] = useState(projectsData);

    return (
        <>
            <div className="project-container">
                {opportunityData.map(project =>
                    <p>
                        <h2>{project.title}</h2><br />
                        {project.description}<br />
                        <small className="text-muted">Posted By <a>{project.author}</a> on {project.datepublished}</small><br />
                        Availible Spots: {project.spots}<br />
                        Category: {project.category}<br />
                    </p>
                )}
            </div>
        </>
    );
}