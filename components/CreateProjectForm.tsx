"use client";

import { useEffect, useState } from "react";
import { TCategory } from "@/app/types";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import DateTimePicker from 'react-datetime-picker';
import { Image } from "next/image";
import { FaImage, FaTrash } from "react-icons/fa";
import "./CreateProjectForm.css";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState(new Date());
  const [publicId, setPublicId] = useState("");
  const [error, setError] = useState("");
  const [spots, setSpots] = useState(1);
  const [participants, setParticipants] = useState<string[]>([]); // [email, email, email

  const router = useRouter();
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("/api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and Content are required.");
      return;
    }

    try {
      const res = await fetch('/api/projects/',
        {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    selectedCategory,
                    image,
                    location,
                    eventTime,
                    spots,
                    publicId,
                    participants
                    })
        });

      if (res.ok) {
        router.push('/') // redirect to home page
      }

    } catch (error) {
      console.log(error);
    }

  }

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log('result: ', result);
    const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImage(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {

      const res = await fetch('/api/removeImage', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId })
      });

      if (res.ok) {
        setImage("");
        setPublicId("");
      }

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Create Project</h2>
      <div className="mb-3">
        <label htmlFor="project-title-input" className="form-label">
          Project Title
        </label>
        <input
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="form-control"
          id="project-title-input"
          placeholder="What do you want to name your project?"
        />


        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Project Description
        </label>
        <textarea
          onChange={e => setDescription(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>

<label htmlFor="dateTimePicker" className="form-label">
        Date & Time
      </label>
      <DateTimePicker
        onChange={setEventTime}
        value={eventTime}
        className="form-control"
        id="dateTimePicker"
      />

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Location
        </label>
        <input
          onChange={e => setLocation(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Select a Category</option>
        {categories &&
          categories.map((category) => (
            <option key={category.id} value={category.catName}>
              {category.catName}
            </option>
          ))}
      </select>
      <label htmlFor="customRange1" className="form-label">
        About how many people do you want?
      </label>
      <input
      type="range"
      min="1"
      max="100"
      value={spots}
      className="spots-range"
      id="customRange1"
      onInput={(e) => setSpots(e.target.value)}
      />
    <div className="popover">{spots <= 100 ? spots : '100+'}</div>
      <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={handleImageUpload} className={`image-upload ${image && "pointer-events-none"}`}>
          <FaImage />
        Upload Image
        {image && (<img src={image} className="uploaded-image" alt={title}/>)}
      </CldUploadButton>

      {publicId && <button className="image-remove" onClick={removeImage}> <FaTrash className="image-removeicon"/>Remove Image</button>}
      {/*
      <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onUpload={handleImageUpload}
      className={`uploadedImage ${image && "pointer-events-none"}`}>
            Upload Image
        {image && (<Image src={image} className="image-cover" fill alt={title}/>)} 
      </CldUploadButton>
      
      {publicId && <button className="btn btn-danger" onClick={removeImage}>Remove Image</button>}
          */}
      <button type="submit" className="submitbtn">
        Create Project
      </button>
      {error && <div className="error">{error}</div>}
    </form>
    </>
  );
}