import React, { useState } from 'react';
import Project from '@/components/Projects';
import { projectsData } from "@/data";
import { TProject } from '@/app/types';
import { GetProject } from "@/components/GetProject";
import { FaReceipt, FaMapMarkerAlt, FaClock, FaList, FaUser } from 'react-icons/fa';
import TimeInput from 'react-time-picker/dist/TimeInput';

export default async function LearnMore({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = await GetProject(id);

    return (
        <>
            <title>{project?.title}</title>
            <h3><p className="text-muted d-inline">Learn More About</p> {project?.title}</h3>
            <div className="text-response">
                <p className="text-muted d-inline">Description <FaReceipt /></p>
                <p>{project?.description}</p>
                <p className="text-muted d-inline">Location <FaMapMarkerAlt /></p>
                <p>{project?.location}</p>
                <p className="text-muted d-inline">Date & Time <FaClock /></p>
                <p>{project?.eventTime}</p>
                <p className="text-muted d-inline">Category <FaList /></p>
                <p>{project?.category}</p>
                <p className="text-muted d-inline">Created By <FaUser /></p>
                <p>{project?.author?.name}</p>
            </div>
        </>
    );
}