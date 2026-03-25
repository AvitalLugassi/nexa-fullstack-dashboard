import { Link } from "react-router-dom";
import { useToolBarContext } from "../../context/ToolBarContext";
import "../../styles/PostsDynamic.css";

function PostsList({ deletePost, updateContent, displayContent }) {
  const { displayData } = useToolBarContext();

  return (
    <div className="posts-list-scroll">
      {displayData.map((post) => (
        <div key={post.id} className="post-list-item">
          <div className="post-list-item-id">Post #{post.id}</div>
          <div className="post-list-item-title">{post.title}</div>
          <div className="post-list-item-actions">
            <button 
              className="post-list-item-btn"
              onClick={() => displayContent(post)}
            >
              View Post
            </button>
            <button className="post-list-item-btn-edit" onClick={() => updateContent(post)}>✏️</button>
            <button className="post-list-item-btn-delete" onClick={() => deletePost(post.id)}>🗑️</button>
            <Link to={`${post.id}/comments`} className="post-list-item-link">Comments</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
