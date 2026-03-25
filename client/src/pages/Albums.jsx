import { Link, useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../API/APIService.js";
import ToolBar from "../components/ToolBar.jsx";
import AppError from "../components/Notification/AppError";
import AlbumsList from "../components/Albums/AlbumsList.jsx"; 
import { useItemActions } from "../hooks/useItemActions";
import { ToolBarProvider } from "../context/ToolBarContext";
import { ConfirmModal, PromptModal } from "../components/Notification/GeneralModal";
import { showToast } from "../components/Notification/GeneralModal";

function Albums() {
  const { userId } = useParams();
  const [Albums, setAlbums] = useState([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const loadAlbums = async () => {
    try {
      const response = await api.get("albums", { userId: userId });
      setAlbums(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, [userId]);

  const { updateItem, deleteItem } = useItemActions("albums", {
    onLocalUpdate: (item) =>
      setAlbums((prev) => prev.map((t) => (t.id === item.id ? item : t))),
    onLocalDelete: (id) => setAlbums((prev) => prev.filter((t) => t.id !== id)),
    confirmOnDelete: false,
  });

  const addFields = [
    { name: "title", label: "Title", type: "text" },
  ];

  const handleAdd = async (payload) => {
    const data = { ...payload };
    if (userId) data.userId = userId;    
    try {
      const response = await api.post("albums", data);
      setAlbums((prev) => [...prev, response.data]);
      showToast('Album created successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to create album', 'error');
    }
  };

  const deleteAlbum = async (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
      showToast('Album deleted successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to delete album', 'error');
    }
  };

  const updateContent = async (Album) => {
    setItemToEdit(Album);
    setShowPrompt(true);
  };

  const handleSaveEdit = async (newTitle) => {
    try {
      await updateItem(itemToEdit.id, { ...itemToEdit, title: newTitle });
      setShowPrompt(false);
      setItemToEdit(null);
      showToast('Album updated successfully!', 'success');
    } catch (err) {
      setError(err.message);
      showToast('Failed to update album', 'error');
    }
  };

  return (
    <div className="content-container">
      <div className="content-card albums-content-card">
        <div className="content-header">
          <h1 className="content-title">  <span className="nav-icon albums-icon"></span>  Albums</h1>
          <p className="item-content">Explore your photo collections</p>
        </div>

        {error && <AppError message={error} onRetry={loadAlbums} />}
        <ToolBarProvider initialData={Albums}>
          <ToolBar onAdd={handleAdd} addFields={addFields} />
          
          <div className="albums-dynamic-layout">
            <div className="albums-list-section">
              <div className="albums-list-header">
                <h2 className="albums-list-title">My Albums</h2>
              </div>
              <div className="posts-list-scroll">
                <AlbumsList
                  deleteAlbum={deleteAlbum}
                  updateContent={updateContent}
                />
              </div>
            </div>

            <div className="albums-right-panel">
              <Outlet />
            </div>
          </div>
        </ToolBarProvider>
      </div>
      
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Are you sure you want to delete this album?"
      />
      
      <PromptModal
        isOpen={showPrompt}
        onConfirm={handleSaveEdit}
        onCancel={() => setShowPrompt(false)}
        message="Edit Album Title"
        label="Title"
        defaultValue={itemToEdit?.title}
      />
    </div>
  );
}

export default Albums; 
