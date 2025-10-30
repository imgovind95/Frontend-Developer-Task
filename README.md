# MERN Stack - Task Management Application

This is a complete MERN (MongoDB, Express, React, Node.js) stack application for a "Frontend Developer Task". It includes a full backend API and a React frontend built with Vite and styled with Tailwind CSS.

- Frontend: React, Vite, Tailwind CSS, Zustand
- Backend: Node.js, Express, MongoDB, JWT

## Features

-   Authentication: Full JWT (JSON Web Token) authentication.
    -   User Registration (`/signup`)
    -   User Login (`/login`)
    -   Protected routes for the dashboard.
-   Task Management (Full CRUD):
    -   Create: Users can add new tasks.
    -   Read: Users can view all their tasks on the dashboard.
    -   Update: Users can edit task titles/descriptions (via modal) and mark tasks as "Completed".
    -   Delete: Users can delete tasks.

---

## How to Run

### Backend (Port 5000)

1.  Navigate to the `backend` directory.
2.  Run `npm install`.
3.  Create a `.env` file with your `MONGO_URI` and `JWT_SECRET`.
4.  Run `npm run dev`.

### Frontend (Port 5173)

1.  Navigate to the `frontend` directory.
2.  Run `npm install`.
3.  Run `npm run dev`.

---

## API Documentation (Simple)

Here are the API endpoints used in this project.

| Method | Endpoint | Description | Protected? |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Registers a new user. | No |
| `POST` | `/api/auth/login` | Logs in a user and returns a JWT token. | No |
| | | | |
| `GET` | `/api/tasks` | Fetches all tasks for the logged-in user. | **Yes** |
| `POST` | `/api/tasks` | Creates a new task. | **Yes** |
| `PUT` | `/api/tasks/:id` | Updates a task (title, description, or status). | **Yes** |
| `DELETE` | `/api/tasks/:id` | Deletes a specific task. | **Yes** |

*(Protected routes require a `Bearer <token>` in the Authorization header.)*

---

## How I Would Scale This for Production

To take this application from a local project to a production-ready environment, I would take the following steps:

1.  Database: Move from a local MongoDB instance to a managed, auto-scaling cloud database like MongoDB Atlas. I would also ensure critical fields (like `user` in the Tasks collection) are indexed for faster queries.

2.  Backend (Node.js):
    Containerization: I would containerize the Express app using Docker.
    Deployment: I would deploy this container to a scalable platform like Vercel (Serverless Functions), Railway, AWS (ECS/EKS), or Google Cloud Run.
    Process Management: If deploying on a traditional VM, I would use a process manager like PM2 to ensure the app auto-restarts if it crashes.

3.  Frontend (React):
    Instead of running a dev server (`vite`), I would build the static files (`npm run build`).
    These static files (HTML, CSS, JS) would be deployed to a global Content Delivery Network (CDN) using services like Vercel or Netlify for fast global loading speeds.

4.  Security & Caching:
    * I would implement rate-limiting on the API to prevent abuse.
    * For high-traffic read operations (like fetching popular tasks, if that feature existed), I would implement a caching layer using Redis.