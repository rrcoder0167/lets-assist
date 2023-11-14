import Image from "next/image";
import "./Projects.css"
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

interface PostProps {
    id: string,
    author: string,
    date:string,
    spots: string,
    image?: string,
    authorEmail?: string, // ? means options
    title: string,
    location: string,
    description: string,
    category?: string;
}


export default function Project({id, author, date, image, authorEmail, spots, title, description, location, category}: PostProps) {
    const isEditable = true;
    return (
        <div className="card">
            {image ? (<Image src={image} alt={title} width={700} height={128} className="card-img-top"/>) : <Image src='/image-placeholder.png' alt={title} width={700} height={128} className="card-img-top"/>}
            <div className="card-body">
            {
                    isEditable && (
                        <div className="card-options">
                            <Link href={`/edit-post/${id}`}>Edit</Link>
                            <Link href="#">Delete</Link>
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
                <div className="button-container d-flex justify-content-between">
                    <a href="#" className="btn btn-primary">Sign Up</a>
                    <a href="#" className="btn btn-success">Learn More</a>
                </div>
            </div>
        </div>
    )
}