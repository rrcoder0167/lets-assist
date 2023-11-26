"use client";

import "./page.css";
import { useRouter } from "next/navigation";

export default function Forums()
{
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };
    return (
        <>
            <h1>Community Forums</h1>
            <h3>Have a question? Ask it here!</h3>
            <button onClick={handleRefresh}>Refresh this page</button>
        </>
    );
}