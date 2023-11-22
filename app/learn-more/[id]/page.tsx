import React, { useState } from 'react';
import Project from '@/components/Projects';
import { projectsData } from "@/data";
import { TProject } from '@/app/types';
import { GetProject } from "@/components/GetProject";

export default async function LearnMore({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = await GetProject(id);

    return (
        <>
            <div className="project-container">
                <title>{project?.title}</title>
                <p>{project?.description}</p>
            </div>
        </>
    );
}