import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [upvote, setUpvote] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !tags || !upvote) {
      setFormError("Please fill out all fields");
      return;
    }

    const { data, error } = await supabase
      .from("socials")
      .insert([{ title, description, tags, upvote }])
      .select();

    if (error) {
      console.log(error);
      setFormError("An error occurred while creating the post");
    }
    console.log(data);
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="tags">Tags:</label>
        <textarea
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <label htmlFor="upvote">Upvote:</label>
        <input
          type="number"
          id="upvote"
          value={upvote}
          onChange={(e) => setUpvote(e.target.value)}
        />

        <button>Create Social Posts</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
