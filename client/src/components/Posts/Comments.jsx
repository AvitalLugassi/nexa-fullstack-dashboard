import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../API/APIService.js";
import ToolBar from "../ToolBar.jsx";
import AppError from "../../components/Notification/AppError";
import CommentsList from "./CommentsList.jsx";
import { useItemActions } from "../../hooks/useItemActions";
import { ToolBarProvider } from "../../context/ToolBarContext";
import { ConfirmModal, PromptModal } from "../../components/Notification/GeneralModal";
import "../../styles/PostsDynamic.css";
import { showToast } from "../../components/Notification/GeneralModal";
import { useUser } from "../../context/UserContext";

function Comments() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const { currentUser } = useUser();
  const [post, setPost] = useState(null);
  const [hasShownError, setHasShownError] = useState(false);

  const addFields = [
    { name: "comment", label: "Comment", type: "text" }
  ];

  const loadComments = async () => {
    try {
      // First check if post belongs to current user
      const postResponse = await api.get("posts", { id: postId });
      const postData = postResponse.data[0];
      
      if (postData && String(postData.userId) !== String(currentUser?.id)) {
        if (!hasShownError) {
          setHasShownError(true);
          navigate(`/users/${currentUser.id}/posts`);
          setTimeout(() => {
            showToast('You are not authorized to access this post.', 'error');
          }, 100);
          return;
        }
      }
      
      setPost(postData);
      
      const response = await api.get("comments", {
        postId: postId,
      });
      setComments(response.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAdd = async (payload) => {
    try {
      const data = {
        postId: postId,
        body: payload.comment,
        name: currentUser?.name ?? "Anonymous",
        email: currentUser?.email ?? "",
      };
      const response = await api.post("comments", data);

      setComments((prev) => [
        ...prev,
        response.data,
      ]);

      showToast('Comment added successfully!', 'success');
      return response.data;
    } catch (err) {
      setError(err.message);
      showToast('Failed to add comment', 'error');
    }
  };

  const { updateItem, deleteItem } = useItemActions("comments", {
    onLocalUpdate: (item) =>
      setComments((prev) =>
        prev.map((c) => (c.id === item.id ? item : c))
      ),
    onLocalDelete: (id) =>
      setComments((prev) => prev.filter((c) => c.id !== id)),
    confirmOnDelete: false,
  });

  const deleteComment = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
      showToast('Comment deleted successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to delete comment', 'error');
    }
  };

  const updateComment = (comment) => {
    setItemToEdit(comment);
    setShowPrompt(true);
  };

  const handleSaveEdit = async (newBody) => {
    try {
      await updateItem(itemToEdit.id, {
        ...itemToEdit,
        body: newBody,
      });
      setShowPrompt(false);
      setItemToEdit(null);
      showToast('Comment updated successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to update comment', 'error');
    }
  };

  return (
    <div className="comments-page-container">
      <div className="comments-panel">
        <div className="comments-panel-header">
          <h1 className="comments-panel-title">💬 Comments</h1>
          <button
            className="post-details-close"
            onClick={() => navigate(-1)}
          >
            ✖
          </button>
        </div>

        {error && <AppError message={error} onRetry={loadComments} />}

        <ToolBarProvider initialData={comments}>
          <ToolBar onAdd={handleAdd} addFields={addFields} compact={true} />

          <div className="comments-list">
            <CommentsList
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          </div>
        </ToolBarProvider>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Are you sure you want to delete this comment?"
      />

      <PromptModal
        isOpen={showPrompt}
        onConfirm={handleSaveEdit}
        onCancel={() => setShowPrompt(false)}
        message="Edit Comment"
        label="Comment"
        defaultValue={itemToEdit?.body}
      />
    </div>
  );
}

export default Comments;
