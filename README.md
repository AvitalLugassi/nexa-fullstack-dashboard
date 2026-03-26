# Nexa – Full-Stack User Platform Simulator

A modern full-stack web application built with React and a mock Node.js JSON Server.

**Nexa** simulates a real-world user platform and demonstrates scalable architecture, reusable logic, and advanced frontend development practices.

---

## 🚀 Live Demo

[Add your deployed link here]

---

## 📸 Screenshots

> Key flows and features of the application:

### 🔐 Authentication

![Login](assets/screenshots/login.png)

### 🏠 Dashboard

![Dashboard](assets/screenshots/dashboard.png)

### ✅ Todos Management

![Todos](assets/screenshots/todos.png)

### 📝 Posts & Comments

![Posts](assets/screenshots/posts.png)

### 🖼️ Albums & Photos

![Albums](assets/screenshots/albums.png)

### 🔔 Notifications

![Notifications](assets/screenshots/notifications.png)

---

## 📖 Project Overview

Nexa is a full-stack user platform simulator that replicates core features of modern data-driven applications.

The system allows authenticated users to manage personal data across multiple domains:

* Todos (task management)
* Posts and comments
* Photo albums and images
* User profile and personal information

The application was built with a strong focus on **scalability, modularity, and clean architecture**, following real-world development standards.

---

## 🎯 Why This Project?

This project was designed to simulate a real-world scalable system and demonstrate advanced React architecture, reusable logic design, and clean frontend engineering practices.

---

## 🔄 User Flow

1. User registers or logs in
2. Redirected to personal dashboard
3. Navigates between Todos, Posts, and Albums
4. Performs CRUD operations
5. Logs out securely

---

## ✨ Key Features

* 🔐 Authentication system (Login / Register / Protected Routes)
* 🧑 Personal dashboard with modular navigation
* ✅ Full CRUD operations (Todos, Posts, Albums, Photos)
* 🔄 Nested routing (Posts → Comments, Albums → Photos)
* 🔍 Search, filtering, and sorting
* 💾 Local storage persistence (user session)
* 🔔 Notification system (toasts & modals)
* ⚡ Incremental data loading for performance
* 🧩 Reusable components and generic logic
* 🧠 Clean and intuitive user experience

---

## 🏗️ Architecture & Design

The application follows a **modular, component-based architecture** with clear separation of concerns.

### 🔹 Structure

* **Pages** – route-level components
* **Components** – reusable UI elements
* **Hooks** – encapsulated reusable logic
* **Context** – global state management
* **API Layer** – centralized data communication

### 🔹 Design Principles

* Separation of concerns
* Reusability through custom hooks
* Scalable folder structure
* Clean data flow
* Minimal prop drilling using Context API

---

## 📁 Project Structure

```
PROJECT/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── API/
│   │   │   └── APIService.js
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CompleteProfile.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Info.jsx
│   │   │   ├── Todos.jsx
│   │   │   ├── Posts.jsx
│   │   │   ├── Albums.jsx
│   │   │   └── Terms.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SideBar.jsx
│   │   │   ├── ToolBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Albums/
│   │   │   ├── Posts/
│   │   │   ├── Todos/
│   │   │   └── Notification/
│   │   ├── context/
│   │   │   ├── UserContext.jsx
│   │   │   ├── NotificationContext.jsx
│   │   │   ├── ToolBarContext.jsx
│   │   │   └── ItemActionsContext.jsx
│   │   ├── hooks/
│   │   │   ├── useItemActions.js
│   │   │   └── useToolBar.js
│   │   └── styles/
│   └── package.json
│
└── server/
    ├── db.json
    └── package.json
```

---

## 🧠 Code Highlights

### 🔹 Reusable CRUD Logic (Custom Hook)

```javascript
const useItemActions = (resource) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await api.get(resource);
      setItems(response.data);
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, fetchItems };
};
```

### 🔹 Global State Management (Context API)

```javascript
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {};
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

### 🔹 API Abstraction Layer

```javascript
const apiClient = axios.create({
  baseURL: 'http://localhost:3000'
});

export const api = {
  get: (resource) => apiClient.get(`/${resource}`),
  post: (resource, data) => apiClient.post(`/${resource}`, data),
  put: (resource, id, data) => apiClient.put(`/${resource}/${id}`, data),
  delete: (resource, id) => apiClient.delete(`/${resource}/${id}`)
};
```

---

## 🛠️ Technologies Used

### Frontend

* React (Hooks, Context API)
* React Router DOM
* Axios
* Vite
* CSS

### Backend

* JSON Server
* Node.js

### Tools

* npm
* Git
* VS Code

---

## ⚙️ Getting Started

### Prerequisites

* Node.js
* npm

### Installation

```bash
git clone <your-repo-url>
cd project

cd client
npm install

cd ../server
npm install
```

### Run the Project

```bash
npm run json:server

cd ../client
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3000

---

## 🧩 Challenges & Solutions

### Managing complex state

Used Context API and custom hooks to maintain scalable state management.

### Reusable logic

Built abstraction layers (hooks + API service) to reduce duplication.

### Nested data relationships

Designed structured routing for posts/comments and albums/photos.

### Performance optimization

Implemented incremental loading and minimized unnecessary re-renders.

---

## 🚀 Future Improvements

* Replace JSON Server with a real backend (Node.js + database)
* Add JWT authentication
* Implement caching strategies
* Add testing (Jest + React Testing Library)
* Improve accessibility
* Deploy production-ready version

---

## 💡 Key Takeaways

* Scalable frontend architecture
* Clean and maintainable code
* Advanced React patterns
* Real-world application design mindset

---

**This project demonstrates the ability to build a complete, scalable, and maintainable full-stack application using modern technologies.**
