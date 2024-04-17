import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiPost from "../../helpers/ApiPost";


//Assuming these are the main parameters we are using for creating a post
const createPost = () => {
  
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    setDesc(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImageURL(e.target.files);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      const token = localStorage.getItem("authToken");
      const formData = new FormData();
      
      formData.append("description", desc);
      formData.append("tags", tags);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", imageURL[i]);
      }

      await ApiPost.createPost(formData, token);
      
      navigate("/");
    } catch (error) {
      
      console.error("Error creating post:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <h1>Create a New Post</h1>
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
              
        <div className="form-group">
          <label htmlFor="tags">Tags (separated by commas):</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
            required
          />
        </div>
              
        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
            required
          />
        </div>
              
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Create Post"}
        </button>
      </form>
    </div>

  );
};

export default createPost;
