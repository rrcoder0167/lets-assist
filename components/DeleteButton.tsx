"use client";
import Refresh from './Refresh';

import { FaTrash } from 'react-icons/fa'; // Import the delete icon (assuming you have a delete icon in the library)

export default function DeleteButton({ id }: { id: string }) {
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );
        if (confirmed) {
            try {
                const res = await fetch(`/api/projects/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json(); // Parse the response body

                console.log(`Response status: ${res.status}`, data); // Log the response status and body

                if (res.ok) {
                    console.log("Project deleted");
                    location.reload(); // Use location.reload() to refresh the page
                }

            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <button onClick={handleDelete}>
                <FaTrash />
                Delete
            </button>
        </>
    );

}