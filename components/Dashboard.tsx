import "./Dashboard.css";
import CategoriesList from "./CategoriesList";
import Projects from "@/components/Projects";
import { projectsData } from "@/data";
import React, { useState } from 'react';

export default function Dashboard() {
    const [opportunityData, setOpportunityData] = useState({
        title: '',
        dateTime: '',
        location: '',
    });

    const handleInputChange = (e:any) => {
        setOpportunityData({
            ...opportunityData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateOpportunity = async () => {
        const user = {
            id: 'user123',
        };

        try {
            const response = await fetch('/api/createOpportunity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...opportunityData,
                    user,
                }),
            });

            if (response.ok) {
                console.log('Project created successfully!');
            } else {
                console.error('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <>
            <CategoriesList />
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
                                                        description={project.description}
                                                        />)
            ) : (
                <div>No Posts to display</div>
            )
            }
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={opportunityData.title} onChange={handleInputChange} />
            </div>
            <div>
                <label>Date Time:</label>
                <input type="datetime-local" name="dateTime" value={opportunityData.dateTime} onChange={handleInputChange} />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={opportunityData.location} onChange={handleInputChange} />
            </div>
            <button className="btn btn-primary" onClick={handleCreateOpportunity}>
                Create a Volunteering Opportunity
            </button>
        </>
    );
}
