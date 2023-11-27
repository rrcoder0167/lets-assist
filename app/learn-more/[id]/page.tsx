import React, { useState } from 'react';
import { TProject } from '@/app/types';
import { GetProject } from "@/components/GetProject";
import { FaReceipt, FaMapMarkerAlt, FaClock, FaList, FaUser } from 'react-icons/fa';
import TimeInput from 'react-time-picker/dist/TimeInput';
import { FormatDateTime } from '@/components/FormatDateTime';
import { GetAuthor } from "@/components/GetAuthor";
import { error } from 'console';

export default async function LearnMore({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = await GetProject(id);

    if (project == null)
        throw error("Project is null - bald");

    const author = await GetAuthor(project?.authorEmail);

    if (author == null)
        throw error("Author is null - bald");

    if (author?.hasOwnProperty("name") == false)
        throw error("Name doesn't exist on author project structure - bald")

    return (
        <>
            <title>{project?.title}</title>
            <h3><p className="text-muted d-inline">Learn More About</p> {project?.title}</h3>
            <div className="text-cst-response">
                <p className="text-muted d-inline">Description <FaReceipt /></p>
                <p>{project?.description}</p>
                <p className="text-muted d-inline">Location <FaMapMarkerAlt /></p>
                <p>{project?.location}</p>
                <p className="text-muted d-inline">Date & Time <FaClock /></p>
                <p>{FormatDateTime(project?.eventTime)}</p>
                <p className="text-muted d-inline">Category <FaList /></p>
                <p>{project?.catName}</p>
                <p className="text-muted d-inline">Created By <FaUser /></p>
                { author?.hasOwnProperty("name") ? (
                    <p>{author?.name}</p>
                ) : (
                    <p>Error finding author name.</p>
                )}
            </div>
        </>
    );
}