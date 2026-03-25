import { useEffect, useState } from "react";
import {  useParams, Outlet } from "react-router-dom";
import { api } from "../API/APIService.js";
import ToolBar from "../components/ToolBar.jsx";
import AppError from "../components/Notification/AppError";
import PostDetails from "../components/Posts/PostDetails";
import PostsList from "../components/Posts/PostsList.jsx";
import { useItemActions } from "../hooks/useItemActions";
import { ToolBarProvider } from "../context/ToolBarContext";
import { ConfirmModal, PromptModal } from "../components/Notification/GeneralModal";
import "../styles/PostsDynamic.css";
import { showToast } from "../components/Notification/GeneralModal";

function Posts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [selectedPostIdForDisplay, setSelectedPostIdForDisplay] =useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const loadPosts = async () => {
    try {
      const response = await api.get("posts", { userId: userId });
      setPosts(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [userId]);

  const { updateItem, deleteItem } = useItemActions("posts", {
    onLocalUpdate: (item) =>
      setPosts((prev) => prev.map((t) => (t.id === item.id ? item : t))),
    onLocalDelete: (id) => setPosts((prev) => prev.filter((t) => t.id !== id)),
    confirmOnDelete: false,
  });

  const addFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "body", label: "body", type: "text", default: "" },
  ];

  const handleAdd = async (payload) => {
    const data = { ...payload };
    if (userId) data.userId = userId;
    try {
      const response = await api.post("posts", data);
      setPosts((prev) => [...prev, response.data]);
      showToast('Post created successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to create post', 'error');
    }
  };

  const deletePost = async (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
      showToast('Post deleted successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to delete post', 'error');
    }
  };

  const updateContent = async (post) => {
    setItemToEdit(post);
    setShowPrompt(true);
  };

  const handleSaveEdit = async (newBody) => {
    try {
      await updateItem(itemToEdit.id, { ...itemToEdit, body: newBody });
      setShowPrompt(false);
      setItemToEdit(null);
      showToast('Post updated successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to update post', 'error');
    }
  };

  const displayContent = (post) => {
    if (selectedPostIdForDisplay?.id === post.id) {
      setSelectedPostIdForDisplay(null);
      return;
    }
    setSelectedPostIdForDisplay(post);
  };

  return (
    <div className="content-container">
      <div className="content-card">

   <h1 className="content-title">     <span className="nav-icon posts-icon"></span> Post </h1>
        {error && <AppError message={error} onRetry={loadPosts} />}
        <ToolBarProvider initialData={posts}>
          <ToolBar onAdd={handleAdd} addFields={addFields} />
          
          <div className="posts-dynamic-layout">
            <div className={`posts-list-section ${selectedPostIdForDisplay ? 'with-details' : ''}`}>
              <div className="posts-list-header">
                <h2 className="posts-list-title">All Posts</h2>
              </div>
              <PostsList
                deletePost={deletePost}
                updateContent={updateContent}
                displayContent={displayContent}
              />
            </div>

            <div className="posts-right-panel">
              {selectedPostIdForDisplay && (
                <PostDetails
                  post={selectedPostIdForDisplay}
                  onClose={() => setSelectedPostIdForDisplay(null)}
                />
              )}
              <Outlet />
            </div>
          </div>
        </ToolBarProvider>
      </div>
      
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Are you sure you want to delete this post?"
      />
      
      <PromptModal
        isOpen={showPrompt}
        onConfirm={handleSaveEdit}
        onCancel={() => setShowPrompt(false)}
        message="Edit Post Content"
        label="Content"
        defaultValue={itemToEdit?.body}
      />
    </div>
  );
}
export default Posts;
