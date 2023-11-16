"use client";

export default function DeleteButton({ id }: {id:string}) {
    const handleDelete = async () => {
        const confirmed = window.confirm (
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

                if (res.ok) {
                    console.log("Post deleted");
                }

            } catch(error) {
                console.log(error);
            }
        }
    };
    return (
        <button onClick={handleDelete}>
          Delete
        </button>
      );

    }