import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { showToast } from "./Notification/GeneralModal";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { userId } = useParams();
  const { currentUser, isLoading } = useUser();
  const [hasShownError, setHasShownError] = useState(false);
  
  useEffect(() => {
    if (!isLoading && currentUser && String(currentUser.id) !== String(userId) && !hasShownError) {
      showToast('You are not authorized to access this page. Redirected to your home page.', 'error');
      setHasShownError(true);
    }
  }, [currentUser, userId, isLoading, hasShownError]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!currentUser)
    return <Navigate to="/login" replace />;
  if (String(currentUser.id) !== String(userId))
    return <Navigate to={`/users/${currentUser.id}`} replace />;
  return children;
}

export default ProtectedRoute;
