import React, { useRef, useState } from "react";
import "./CreateRecipeModal.css";

export default function CreateRecipeModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    instructions: "",
    ingredients: "",
    tags: "",
  });
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("instructions", form.instructions);
      data.append("filters", JSON.stringify([form.category]));
      data.append("tags", JSON.stringify(form.tags.split(",").map(t => t.trim())));
      data.append("ingredients", JSON.stringify(form.ingredients.split(",").map(i => ({ name: i.trim(), quantity: 1, unit: "" }))));
      images.forEach((img) => data.append("image", img));
      if (video) data.append("video", video);
      const res = await fetch("/api/recipe/add", {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: data,
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Failed to create recipe");
      onSuccess && onSuccess(result.recipe);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="ss-create-modal-overlay">
      <div className="ss-create-modal">
        <button className="ss-create-modal-close" onClick={onClose}>&times;</button>
        <h2>Create a Recipe</h2>
        <form className="ss-create-form" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Recipe Name" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Caption/Description" required />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
          <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Instructions" required />
          <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" required />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
          <label>Images (up to 3): <input type="file" accept="image/*" multiple onChange={handleImages} /></label>
          <label>Video: <input type="file" accept="video/*" onChange={handleVideo} /></label>
          {error && <div className="ss-create-error">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Recipe"}</button>
        </form>
      </div>
    </div>
  );
}
