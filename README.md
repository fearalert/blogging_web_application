# Blogging Web Application Documentation

## Overview
This Blogging Web Application is a full-stack application that allows users to create, edit, and manage blog posts with category and tag features. The backend is powered by `Node.js`, `Express`, and `PostgreSQL` with `Prisma ORM`, while the frontend is built using `React` with Vite for fast performance and `TypeScript` for static typing. The application supports user authentication, authorization, and protected routes.

---

## Project Structure

- **Frontend Directory**: `frontend`
- **Backend Directory**: `server`

---

## Tools and Technologies

**Backend**:
- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **TypeScript**

**Frontend**:
- **React.js**
- **Vite**
- **React Router**
- **TypeScript**

---

## Running the Full Project

1. **Start the Backend Server**
   - In `backend/`:
     ```bash
     npm install
     npm run dev
     ```

2. **Start the Frontend Server**
   - In `frontend/`:
     ```bash
     npm install
     npm run dev
     ```

The application should be accessible at [http://localhost:5173](http://localhost:5173).

---

## Others

- **Authentication**: Implemented with JWT tokens, with the AuthProvider managing authentication state on the frontend.
- **Protected Routes**: Uses `ProtectedRoute` to secure routes that require login.
- **CRUD Operations**: Supports full CRUD for blogs, categories, and tags with necessary authorization checks in place.

Refer to the `src/controllers` for backend logic, `src/context` for frontend state management, and `src/pages` for individual pages and components.
