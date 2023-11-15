"use client";

import { useEffect, useState } from "react";
import { TCategory } from "@/app/types";

export default function CreateProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await fetch("/api/categories");
      const catNames = await res.json();
      setCategories(catNames);
    };

    fetchAllCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {

    }

  }


  return (
    <form onSubmit={handleSubmit}>
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

        <label htmlFor="exampleFormControlInput1" className="form-label">
          Date & Time
        </label>
        <input
        onChange={e => setEventTime(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
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

      <input type="range" className="form-range" id="customRange1" />
      <button type="submit" className="btn btn-primary">
        Create Project
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}