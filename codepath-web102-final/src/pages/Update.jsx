import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [upvote, setUpvote] = useState("");
  const [formError, setFormError] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !description || !tags || !upvote) {
      setFormError("Please fill out all fields");
      return;
    }

    const { data, error } = await supabase
      .from("socials")
      .update({ title, description, tags, upvote })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError("An error occurred while updating the post");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("socials")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags);
        setUpvote(data.upvote);
        console.log(data);
      }
    };
    fetchPost();
  }, [id, navigate]);
  return (
    <div className="page update">
      <form onSubmit={handleUpdate}>
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

        <button>Update Social Posts</button>

        {/* {formError && <p className="error">{formError}</p>} */}
      </form>
    </div>
  );
};

export default Update;
