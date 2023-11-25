import React, { useState } from 'react';
import { TProject } from '@/app/types';
import { GetProject } from "@/components/GetProject";
import { FaReceipt, FaMapMarkerAlt, FaClock, FaList, FaUser } from 'react-icons/fa';
import TimeInput from 'react-time-picker/dist/TimeInput';
import { FormatDateTime } from '@/components/FormatDateTime';
import { GetAuthor } from "@/components/GetAuthor";

export default async function LearnMore({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = await GetProject(id);
    //const author = await GetAuthor(project?.authorEmail); until u fix this keshav, i'm leaving this
    /*
    Don't over complicate this with a whole get author thing and all, just do it simply like i have with all the other
    if u do this, u have to change all that code and we don't have time for that
    just fix this to be normal
    */

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
                <p>{/*FormatDateTime(project?.eventTime)*/}</p>
                <p className="text-muted d-inline">Category <FaList /></p>
                <p>{project?.catName}</p>
                <p className="text-muted d-inline">Created By <FaUser /></p>
                <p>{/*author?.name*/}</p>
            </div>
        </>
    );
}