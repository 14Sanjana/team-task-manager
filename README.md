# Team Task Manager (Full-Stack Application)

## Project Overview

Team Task Manager is a full-stack web application developed to help teams manage projects, assign tasks, and track task progress efficiently.

The application supports role-based access control where:

* ADMIN users can create projects and manage tasks.
* MEMBER users can view and update assigned tasks.

The system includes authentication, dashboard analytics, project management, task management, and task status tracking.

---

# Features

## Authentication

* User Signup
* User Login
* JWT-based Authentication
* Protected Routes
* Role-Based Access Control (ADMIN / MEMBER)

## Project Management

* Create Projects
* View All Projects
* Project-wise Task Tracking

## Task Management

* Create Tasks
* Assign Tasks to Users
* Update Task Status
* Due Date Tracking
* Overdue Task Identification

## Dashboard

* Total Projects Count
* Total Tasks Count
* Completed Tasks Count
* Pending Tasks Count
* Overdue Tasks Count

---

# Tech Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* CSS

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* bcryptjs
* CORS

## Database

* PostgreSQL

---

# Folder Structure

```
team-task-manager/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Database Schema

## User

* id
* name
* email
* password
* role
* createdAt

## Project

* id
* name
* description
* createdBy
* createdAt

## Task

* id
* title
* description
* status
* dueDate
* assignedTo
* projectId
* createdAt

---

# API Endpoints

## Authentication APIs

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/login
```

---

## Project APIs

### Create Project

```
POST /api/projects
```

### Get Projects

```
GET /api/projects
```

---

## Task APIs

### Create Task

```
POST /api/tasks
```

### Get Tasks

```
GET /api/tasks
```

### Update Task Status

```
PUT /api/tasks/:id
```

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/14Sanjana/team-task-manager.git
```

---

# Backend Setup

## Navigate to Backend

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=mysecretkey
PORT=5000
```

## Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

## Start Backend Server

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Authentication Flow

1. User signs up.
2. Password is hashed using bcryptjs.
3. User logs in.
4. JWT token is generated.
5. Protected APIs are accessed using JWT authorization.
6. Role-based middleware validates ADMIN and MEMBER permissions.

---

# Role-Based Access Control

## ADMIN

* Create Projects
* Create Tasks
* Manage Team Workflow

## MEMBER

* View Assigned Tasks
* Update Task Status

---

# Dashboard Functionalities

The dashboard dynamically displays:

* Project statistics
* Task statistics
* Completed task tracking
* Pending task tracking
* Overdue task monitoring

---

# Security Features

* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Role-Based Authorization
* Input Validation

---

# Future Improvements

* Email Notifications
* Team Chat System
* File Attachments
* Activity Logs
* Search & Filters
* Drag-and-Drop Task Board
* Dark Mode

---

# GitHub Repository

Repository Link:

[https://github.com/14Sanjana/team-task-manager](https://github.com/14Sanjana/team-task-manager)

---

# Demo Video

The demo video demonstrates:

* Signup & Login
* Dashboard
* Project Creation
* Task Creation
* Task Status Updates
* Backend API Functionality
* GitHub Repository Structure

---

# Conclusion

This project demonstrates full-stack development concepts including frontend development, backend API creation, database integration, authentication, authorization, and task workflow management using modern web technologies.

Note:
The backend deployment completed successfully on Railway and the server is running correctly. A temporary Railway DNS resolution issue prevented public URL access during submission time, but the complete application functionality is demonstrated in the attached demo video.


