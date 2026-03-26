# Nexa – Full-Stack User Platform Simulator

Nexa is a production-deployed full-stack web application that simulates a modern user data platform.

It allows authenticated users to manage personal content across multiple domains including Todos, Posts, Comments, Albums and Photos.

The system demonstrates scalable frontend architecture, reusable logic patterns, relational data navigation and real cloud deployment practices.

---

## 🚀 Live Application

Frontend (Vercel):
https://nexa-fullstack-dashboard.vercel.app/

Backend API (Render):
https://nexa-fullstack-dashboard.onrender.com

---

## 🔑 Demo Credentials

You can explore the system using an existing user from the API.

Example:

username: Bret
password: (use the value from the user’s `website` field)

---

## 📸 Screenshots

### Authentication

![Login](assets/screenshots/login.png)

### Dashboard

![Home](assets/screenshots/home.png)

### Todos Management

![Todos](assets/screenshots/Todos.png)

### Posts & Comments

![Posts](assets/screenshots/Posts.png)

### Albums & Photos

![Albums](assets/screenshots/Albums.png)

---

## 📖 Project Overview

Nexa simulates a real data-driven platform where users can:

* Manage personal tasks (Todos)
* Create and edit posts
* Add and manage comments
* Navigate relational entities
* Create albums and load photos incrementally
* Maintain persistent authenticated sessions

The project focuses on clean architecture, modularity and real frontend engineering workflows.

---

## 🏗️ Production Architecture

User Browser
↓
React Client (Vercel Deployment)
↓ HTTPS REST Requests
Mock API Server (Render Deployment)
↓
Local JSON Database (db.json)

---

## ✨ Engineering Highlights

* Protected routing and authentication persistence
* Context-based global state management
* Reusable generic CRUD hooks
* Nested routing for relational data structures
* Incremental loading strategy for performance
* Centralized API abstraction layer
* Notification feedback system
* Modular scalable folder organization

---

## 📦 Repository Structure

project/
│
├── client/   → React frontend
└── server/   → Mock REST API

For deeper explanation see:

* client/README.md
* server/README.md

---

## 🌐 Deployment Considerations

* Environment-based API baseURL configuration
* CORS communication between services
* Backend cold-start behaviour handling
* Synchronization between frontend and backend deployments

---

## 🧪 Running Locally (Optional)

Start backend:

cd server
npm install
npm run json:server

Start frontend:

cd client
npm install
npm run dev

Frontend → http://localhost:5173
Backend → http://localhost:3000

---

## 🚀 Future Improvements

* Replace mock server with real database backend
* Add JWT authentication
* Implement caching strategies
* Add automated testing
* Improve accessibility

---

This project demonstrates the ability to design, implement and deploy a complete full-stack system using modern development practices.
