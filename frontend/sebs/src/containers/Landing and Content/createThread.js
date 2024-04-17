import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiThread from "../../helpers/ApiThread";
import ApiPost from "../../helpers/ApiThread";

const CreateThread = () => {
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    
    setDescription(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleImageUpload = (e) => {
    setImages(e.target.files);
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
      

      await ApiThread.createThread(formData, token);
      navigate("/");
      
    } catch (error) {
      console.error("Error creating Thread:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-thread-page">
      <h1>Create a New Thread</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
  
          <textarea
            id="description"
            value={desc}
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
          {isLoading ? "Uploading..." : "Create Thread"}
        </button>
      </form>
          
    </div>
  );
};

export default CreateThread;
