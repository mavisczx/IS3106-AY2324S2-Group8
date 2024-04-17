import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ApiPost from "../../helpers/ApiPost";
import ApiThread from "../../helpers/ApiThread";
import { Link } from "react-router-dom";

const landing = () => {
    const[post, setPost] = useState();
    const[thread, setThread] = useState();

    React.useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await ApiPost.retrieveAllPosts();
            const data = await response.json();
            setPosts(data);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
        fetchPosts();
      }, []);
    
      return (
        <div className="landing-page">
          <header className="header">
            <div className="logo">
              <Link to="/">
                <Icon icon="mdi:instagram" width="32" height="32" />
                <span>ExchangeBuddy</span>
              </Link>
            </div>
            <nav className="nav">
              <ul>
                <li>
                  <Link to="/explore">Explore</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/create">Create</Link>
                </li>
              </ul>
            </nav>
          </header>
    
          <main className="main">
            <div className="posts-container">
              {posts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-header">
                    <div className="user-info">
                      <img src={post.user.profilePicture} alt={post.user.username} />
                      <span>{post.user.username}</span>
                    </div>
                    <div className="post-actions">
                      <button>
                        <Icon icon="mdi:heart-outline" width="24" height="24" />
                      </button>
                      <button>
                        <Icon icon="mdi:comment-outline" width="24" height="24" />
                      </button>
                      <button>
                        <Icon icon="mdi:share-variant" width="24" height="24" />
                      </button>
                    </div>
                  </div>
                  <div className="post-content">
                    <img src={post.imageUrl} alt={post.caption} />
                    <p>{post.caption}</p>
                  </div>
                  <div className="post-footer">
                    <p>{post.likes} likes</p>
                    <p>{post.comments.length} comments</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
    
          <footer className="footer">
            <p>&copy; 2023 Instagram. All rights reserved.</p>
          </footer>
        </div>
      );
    };

export default landing;

