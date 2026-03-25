import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Posts from "./pages/Posts";
import Albums from "./pages/Albums";
import Info from "./pages/Info";
import Photos from "./components/Albums/Photos";
import Comments from "./components/Posts/Comments";   
import ProtectedRoute from "./components/ProtectedRoute";
import Terms from "./pages/Terms";
import { Toast } from "./components/Notification/GeneralModal";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toast />
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/terms" element={<Terms />} />

        <Route
          path="/users/:userId"
          element={<ProtectedRoute> <Home /> </ProtectedRoute>}>
          <Route path="info" element={<Info />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} >
            <Route path=":postId/comments" element={<Comments />} />
          </Route>
          <Route path="albums" element={<Albums />} >
            <Route path=":albumId/photos" element={<Photos />} />
          </Route>
        </Route>

        <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
