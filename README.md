# Task Manager Application

A full-stack task management application built with **React.js**, **Node.js**, and **Express.js**.

## Features

- ✅ Create, Read, Update, and Delete tasks (full CRUD)
- 🗂️ Categorize tasks: **To Do**, **In Progress**, **Done**, **Timeout**
- 🔴 Priority levels: **High**, **Medium**, **Low**
- 📅 Due date support with overdue detection
- ✔️ Mark tasks as complete/incomplete
- 🔃 Sort tasks by date created, priority, or due date
- 📊 Live task counts per category
- ⚡ Full frontend–backend API integration

## Tech Stack

| Layer    | Technology                |
|----------|---------------------------|
| Frontend | React.js, TypeScript      |
| Backend  | Node.js, Express.js       |
| HTTP     | Axios                     |
| Styling  | Custom CSS                |

---

## Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** v7 or higher

---

### Step 1 — Start the Backend

```bash
cd backend
npm install
npm start
```

The API server starts at: `http://localhost:5000`

You can verify it is running by visiting: `http://localhost:5000/api/health`

---

### Step 2 — Start the Frontend (in a new terminal)

```bash
cd frontend
npm install
npm start
```

The React app opens at: `http://localhost:3000`

---

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks        | Get all tasks            |
| GET    | /api/tasks/:id    | Get a single task        |
| POST   | /api/tasks        | Create a new task        |
| PUT    | /api/tasks/:id    | Update a task            |
| DELETE | /api/tasks/:id    | Delete a task            |
| GET    | /api/health       | Health check             |

### Example — Create Task (POST /api/tasks)

```json
{
  "title": "Review pull request",
  "description": "Review the auth module PR before merge.",
  "category": "In Progress",
  "priority": "High",
  "dueDate": "2024-12-01"
}
```

---

## Project Structure

```
task-manager/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── models/
│       │   └── taskStore.js      # In-memory data store
│       └── routes/
│           └── tasks.js          # CRUD route handlers
│
└── frontend/
    ├── package.json
    └── src/
        ├── App.tsx
        ├── types.ts
        ├── styles.css
        ├── components/
        │   ├── CategorySlider.tsx
        │   ├── TaskForm.tsx
        │   ├── TaskItem.tsx
        │   └── TaskList.tsx
        ├── hooks/
        │   └── useTasks.ts       # State management hook
        └── services/
            └── api.ts            # Axios API calls
```

---

## Notes

- Data is stored **in-memory** on the backend. Restarting the server resets tasks.
- To persist data, replace `taskStore.js` with a database (e.g. MongoDB, SQLite).
