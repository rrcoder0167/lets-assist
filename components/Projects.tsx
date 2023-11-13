import Image from "next/image";
import "./Projects.css"
import Link from "next/link";

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
//col-sm-6 col-md-4 col-lg-3 col-xl-2
export default function Project({id, author, date, image, authorEmail, spots, title, description, location, category}: PostProps) {
    return (
        <div className="card">
        {/*image ? (<Image src={image} alt={title} fill />) : <Image src='/image-placeholder.png' alt={title} fill />*/}
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <div className="d-flex justify-content-between">
                <a href="#" className="btn btn-primary">Sign Up</a>
                <a href="#" className="btn btn-success">Learn More</a>
            </div>
        </div>
        </div>
    )
}