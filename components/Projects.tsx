import Image from "next/image";
import "./Projects.css"
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FaMapMarkerAlt} from "react-icons/fa";
import { useSession } from "next-auth/react";
import DeleteButton from "./DeleteButton";


interface PostProps {
    id: string,
    author: string,
    eventTime: string,
    spots: string,
    image?: string,
    authorEmail?: string, // ? means options
    title: string,
    participants: string[],
    date: string,
    location: string,
    description: string,
    category?: string;
}


export default function Project({id, author, eventTime, image, authorEmail, spots, date, title, description, location, category}: PostProps) {
    const { data: session } = useSession();
    const isEditable = session && session?.user?.email === authorEmail;

    const dateObject = new Date(date);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric"};
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return (
        <div className="card">
            {image ? (<Image src={image} alt={title} width={700} height={128} className="card-img-top"/>) : <Image src='/image-placeholder.png' alt={title} width={700} height={128} className="card-img-top"/>}
            <div className="card-body">
            {isEditable && (
                    <div className="card-options">
                        <Link href={`/edit-project/${id}`}>Edit</Link>
                        <DeleteButton id={id}/>
                    </div>
                )
}
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="location-container d-flex align-items-center">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="location-link d-flex align-items-center">
                        
                        <p className="location-text">
                        <FaMapMarkerAlt className="location-icon" />    {location}</p>
                    </a>
                </div>
                <p className="event-time">When: {eventTime}</p>
                <p className="spots">{spots} spots left</p>
                <p className="date">{formattedDate}</p>
                <div className="button-container d-flex justify-content-between">
                    <a href="#" className="btn btn-primary">Sign Up</a>
                    <a href="#" className="btn btn-success">Learn More</a>
                </div>
            </div>
        </div>
    )
}