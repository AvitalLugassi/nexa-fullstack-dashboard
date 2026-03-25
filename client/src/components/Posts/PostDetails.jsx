function PostDetails({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="post-details-panel">
      <div className="post-details-header">
        <div>
          <h2 className="post-details-title">{post.title}</h2>
          <div className="post-details-meta">
            <span>Post #{post.id}</span>
            <span>User #{post.userId}</span>
          </div>
        </div>
        <button className="post-details-close" onClick={onClose}>✖</button>
      </div>
      <div className="post-details-content">
        <p className="post-details-body">{post.body}</p>
      </div>
    </div>
  );
}

export default PostDetails;
