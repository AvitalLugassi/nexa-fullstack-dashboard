import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../API/APIService.js";
import ToolBar from "../ToolBar.jsx";
import AppError from "../../components/Notification/AppError";
import PhotosList from "./PhotosList";
import { useItemActions } from "../../hooks/useItemActions";
import { ToolBarProvider } from "../../context/ToolBarContext";
import {
  ConfirmModal,
  PromptModal,
} from "../../components/Notification/GeneralModal";
import { showToast } from "../../components/Notification/GeneralModal";
import { useUser } from "../../context/UserContext";

const PAGE_SIZE = 5;

function Photos() {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const { currentUser } = useUser();
  const [hasShownError, setHasShownError] = useState(false);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  const addFields = [
    { name: "url", label: "url", type: "text" },
    { name: "title", label: "Title", type: "text" },
  ];

  const loadPhotos = async (pageNum) => {
    if (!hasMoreRef.current || isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      if (pageNum === 1) {
        const albumResponse = await api.get("albums", { id: albumId });
        const albumData = albumResponse.data[0];

        if (albumData && String(albumData.userId) !== String(currentUser?.id)) {
          if (!hasShownError) {
            setHasShownError(true);
            navigate(`/users/${currentUser.id}/albums`);
            setTimeout(() => {
              showToast(
                "You are not authorized to access this album.",
                "error"
              );
            }, 100);
            return;
          }
        }
      }

      const start = (pageNum - 1) * PAGE_SIZE;
      const response = await api.get("photos", {
        albumId: albumId,
        _start: start,
        _limit: PAGE_SIZE,
      });

      const newPhotos = response.data || [];

      setPhotos((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNewPhotos = newPhotos.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNewPhotos];
      });

      if (newPhotos.length < PAGE_SIZE) {
        hasMoreRef.current = false;
        setHasMore(false);
      }

      pageRef.current = pageNum + 1;
      setPage(pageNum + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPhotos([]);
    pageRef.current = 1;
    hasMoreRef.current = true;
    setHasMore(true);

    loadPhotos(1);
  }, [albumId]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (!hasMoreRef.current || isLoading) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const nearBottom = scrollHeight - scrollTop - clientHeight < 120;
      if (nearBottom) {
        loadPhotos(pageRef.current);
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [isLoading, hasMore]);

  /* ========= CRUD ========= */
  const { updateItem, deleteItem } = useItemActions("photos", {
    onLocalUpdate: (item) =>
      setPhotos((prev) => prev.map((p) => (p.id === item.id ? item : p))),
    onLocalDelete: (id) =>
      setPhotos((prev) => prev.filter((p) => p.id !== id)),
    confirmOnDelete: false,
  });

  const updatePhoto = async (photo) => {
    setItemToEdit(photo);
    setShowPrompt(true);
  };

  const handleSaveEdit = async (newTitle) => {
    try {
      await updateItem(itemToEdit.id, { ...itemToEdit, title: newTitle });
      setShowPrompt(false);
      setItemToEdit(null);
      showToast("Photo updated successfully!", "success");
    } catch (err) {
      setError(err.message);
      showToast("Failed to update photo", "error");
    }
  };

  const deletePhoto = async (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteItem(itemToDelete);
      setShowConfirm(false);
      setItemToDelete(null);
      showToast("Photo deleted successfully!", "success");
    } catch (err) {
      setError(err.message);
      showToast("Failed to delete photo", "error");
    }
  };

  const handleAdd = async (data) => {
    try {
      const newPhoto = {
        albumId: albumId,
        url: data.url,
        thumbnailUrl: data.url,
        title: data.title,
      };
      const response = await api.post("photos", newPhoto);
      setPhotos((prev) => [response.data, ...prev]);
      showToast("Photo added successfully!", "success");
      return response.data;
    } catch (err) {
      setError(err.message);
      showToast("Failed to add photo", "error");
    }
  };

  return (
    <>
      <div className="photos-panel">
        <div className="photos-panel-header">
          <h1 className="photos-panel-title">Album Photos</h1>
          <button className="photos-close" onClick={() => navigate(-1)}>
            ✖
          </button>
        </div>

        {error && (
          <AppError
            message={error}
            onRetry={() => loadPhotos(pageRef.current)}
          />
        )}

        <ToolBarProvider
          initialData={photos}
          addFields={addFields}
        >
          <ToolBar onAdd={handleAdd} addFields={addFields} compact={true} />

          <div className="photos-list-scroll" ref={scrollContainerRef}>
            <PhotosList updatePhoto={updatePhoto} deletePhoto={deletePhoto} />

            <div
              ref={observerRef}
              style={{
                height: hasMore ? 40 : 0,
                opacity: hasMore ? 1 : 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#777",
                transition: "height 0.2s ease, opacity 0.2s ease",
              }}
            />
          </div>
        </ToolBarProvider>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
        message="Are you sure you want to delete this photo?"
      />

      <PromptModal
        isOpen={showPrompt}
        onConfirm={handleSaveEdit}
        onCancel={() => setShowPrompt(false)}
        message="Edit Photo Title"
        label="Title"
        defaultValue={itemToEdit?.title}
      />
    </>
  );
}

export default Photos;