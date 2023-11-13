import "./Dashboard.css";
import React, { useState } from 'react';

export default function Dashboard() {
    const [opportunityData, setOpportunityData] = useState({
        title: '',
        dateTime: '',
        location: '',
    });

    const handleInputChange = (e) => {
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
                console.log('Opportunity created successfully!');
            } else {
                console.error('Failed to create opportunity');
            }
        } catch (error) {
            console.error('Error creating opportunity:', error);
        }
    };

    return (
        <>
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
