"use client";

import { useEffect, useState } from "react";
import { TCategory, TProject } from "@/app/types";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
import "./EditProjectForm.css";
import DateTimePicker from 'react-datetime-picker';
import { FormatDateTime } from "./FormatDateTime";

export default function EditProjectForm({ project }: { project: TProject }) {
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

  const router = useRouter();
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("/api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();

    const initValues = () => {
      setTitle(project.title);
      setDescription(project.description);
      setSelectedCategory(project.catName || '');
      setImage(project.image || '');
      setLocation(project.location);
      setSpots(project.spots || 1);
      setPublicId(project.publicId || '');
      setEventTime(new Date());

    }

    initValues();
  }, [project.title, project.description, project.catName, project.image, project.location, project.eventTime, project.spots, project.publicId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and Content are required.");
      return;
    }

    try {
      const res = await fetch(`/api/projects/${project.id}`,
        {

          method: 'PUT',
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
            publicId
          })
        });

      if (res.ok) {
        router.push('/') // redirect to home page
      }

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h2>Edit Project</h2>
        <label htmlFor="project-title-input" className="form-label">
          Project Title
        </label>
        <input
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="form-control"
          id="project-title-input"
          placeholder="What do you want to name your project?"
          value={title}
        />

        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Project Description
        </label>
        <textarea
          onChange={e => setDescription(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          value={description}
        ></textarea>

        <label htmlFor="dateTimePicker" className="form-label">
          Date & Time
        </label>
        <DateTimePicker
          onChange={(newDate) => newDate && setEventTime(newDate)}
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
          placeholder="Example Street, Example City, EX"
          value={location}
        />
      </div>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value={selectedCategory}>{selectedCategory} </option>
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
      onChange={(event) => setSpots(Number(event.target.value))}
      />
    <div className="popover">{spots <= 100 ? spots : '100+'}</div>
      <button type="submit" className="btn btn-primary">
        Save Changes
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}