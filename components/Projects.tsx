import Image from "next/image";
import "./Projects.css"
import Link from "next/link";

interface PostProps {
    id: string,
    author: string,
    date:string,
    image?: string,
    authorEmail?: string, // ? means options
    title: string,
    location: string,
    description: string,
    category?: string;
}

export default function Project({id, author, date, image, authorEmail, title, description, location, category}: PostProps) {
    return (
    <div>
        <div>
            Initiated by: <span className="project-author">{author}</span> on {date}
        </div>

        <div className="project-image">
            {image ? (<Image src={image} alt={title} fill />) : <Image src='/image-placeholder.png' alt={title} fill />}
        </div>

        {category && <Link href={`categories/${category}`}>{category}</Link>}
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{location}</span>

    </div>
    )
}