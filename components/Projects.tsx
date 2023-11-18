"use client";
import Image from "next/image";
import "./Projects.css"
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FaEllipsisV } from 'react-icons/fa'; // Import the three-dot icon
import { FaEdit } from 'react-icons/fa'; // Import the edit icon (assuming you have an edit icon in the library)
import { FaMapMarkerAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FaClock, FaUsers } from 'react-icons/fa';
import DeleteButton from "./DeleteButton";
import React, { useEffect, useState } from 'react';
import { TCategory } from '@/app/types';


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

export default function Project({ id, author, eventTime, image, authorEmail, spots, date, title, description, location, category }: PostProps) {
  const { data: session } = useSession();
  const isEditable = session && session?.user?.email === authorEmail;

  const [project, setProject] = useState<TProject | null>(null);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/projects/${id}`);
        if (res.ok) {
          const project = await res.json();
          setProject(project);
          setIsParticipant(project.participants.includes(session?.user?.email));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProject();
  }, [id, session]);
  const handleRegisterProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${id}/register`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          participants: session?.user?.email
        })
      });

      if (res.ok) {
        router.push('/') // redirect to home page
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnregisterProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${id}/register`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          participant: session?.user?.email
        })
      });

      if (res.ok) {
        router.push('/') // redirect to home page
      }
    } catch (error) {
      console.log(error);
    }
  }


  const dateObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="card">
      {image ? (<Image src={image} alt={title} width={700} height={128} className="card-img-top" />) : <Image src='/image-placeholder.png' alt={title} width={700} height={128} className="card-img-top" />}
      <Link href={`/categories/${category}`} className="card-category">{category}</Link>
      <div className="card-options">
      {isEditable && (
        <div className="menu-container">
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <FaEllipsisV />
          </div>
          {isMenuOpen && (
            <div className="menu">
              <form action={`/edit-project/${id}`}>
                <button className="edit-btn">
                  <FaEdit /> Edit
                </button>
              </form>
              <DeleteButton id={id} />
            </div>
          )}
        </div>
      )}
    </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="info-container d-flex ">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="location-link d-flex align-items-center">
            <p className="info-text">
              <FaMapMarkerAlt className="location-icon" />    {location}</p>
          </a>
          <p className="info-text">
            <FaClock className="clock-icon" /> {eventTime}
          </p>
          <p className="info-text">
            <FaUsers className="users-icon" /> {spots} spots left
          </p>
        </div>
        <div className="button-container d-flex justify-content-between">
          {isParticipant
            ? <button onClick={handleUnregisterProject} className="btn btn-danger">Unregister</button>
            : <button onClick={handleRegisterProject} className="btn btn-success">Sign Up</button>
          }
          <a href="#" className="btn btn-primary">Learn More</a>
        </div>
      </div>
    </div>
  )
}