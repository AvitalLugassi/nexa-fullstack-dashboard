# Nexa Client – React Frontend

This folder contains the React frontend of the Nexa platform.

The client is responsible for user interaction, routing, state management, and communication with the backend API.

---

##  Live Application

https://nexa-fullstack-dashboard.vercel.app/

---

## 🔗 API Base URL

The application communicates with a deployed backend:

https://nexa-fullstack-dashboard.vercel.app/

---

##  Responsibilities

- Authentication (Login / Register)
- Protected routes
- Dashboard navigation
- Todos / Posts / Albums management
- Incremental loading of photos
- Notification system
- Session persistence

---

## 🧠 Architecture

The frontend follows a modular, component-based architecture.

### Structure


src/
│
├── pages/
├── components/
├── hooks/
├── context/
├── API/
└── styles/


---

##  State Management

- Context API for global state
- Custom hooks for reusable logic
- Local state for UI interactions

This approach keeps the app scalable and avoids unnecessary complexity.

---

##  Reusable Logic

Reusable logic is abstracted into custom hooks:

- `useItemActions` – generic CRUD operations  
- `useToolBar` – filtering and sorting logic  

---

## 🛣️ Routing

- Route-based page structure  
- Nested routing for relational data:
  - Posts → Comments  
  - Albums → Photos  
- Protected routes for authenticated users  

---

## ⚡ Performance

- Incremental data loading  
- Optimized rendering  
- Centralized API calls  

---

##  Technologies

- React
- React Router DOM
- Context API
- Axios
- Vite
- CSS

---

## ⚙️ Running Locally

```bash
npm install
npm run dev

Runs on:

http://localhost:5173