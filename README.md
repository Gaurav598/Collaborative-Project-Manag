<div align="center">

# 🚀 CollabPM — Collaborative Project Management

**An open-source, modern project management platform built with React 19, Vite, and Tailwind CSS.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](./LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](./CONTRIBUTING.md)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running with Docker](#-running-with-docker)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

CollabPM is a **collaborative project management SPA** designed for teams that need to organize work across multiple workspaces, projects, and tasks. It provides a real-time overview of project health, team activity, and individual task progress — all in a clean dark/light interface.

> **Current Status:** Frontend UI complete with local Redux state management. A PostgreSQL/Prisma backend schema is included as a reference for the full-stack implementation.

### Target Users
- Software development teams
- Design agencies
- Project managers coordinating cross-functional work

---

## ✨ Features

| Feature | Description |
|---------|------------|
| **Multiple Workspaces** | Separate environments per organization/client |
| **Project Management** | Create and manage projects with status, priority, dates, and team leads |
| **Task Management** | Full task lifecycle (TODO → IN_PROGRESS → DONE) with type, priority, and assignee |
| **Analytics Dashboard** | Charts and metrics for project progress, task distribution, and team workload |
| **Calendar View** | Timeline view of tasks by due date |
| **Team Management** | Invite members, assign roles (Admin/Member), view contributions |
| **Dark / Light Mode** | Persistent theme toggle using localStorage |
| **Responsive Design** | Mobile-first layouts with table ↔ card views |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 + Vite 7 | UI rendering + dev server |
| Styling | TailwindCSS v4 | Utility-first CSS |
| State Management | Redux Toolkit 2.x | Global state (workspaces, theme) |
| Routing | React Router DOM v7 | Client-side navigation |
| Icons | Lucide React | SVG icon library |
| Charts | Recharts | Analytics visualizations |
| Date Utilities | date-fns | Date formatting and math |
| Notifications | react-hot-toast | Toast notifications |
| Database (schema) | PostgreSQL + Prisma | Backend reference schema |
| Container | Docker + nginx | Production deployment |
| CI/CD | GitHub Actions | Automated lint, build, push |

---

## 🏗️ Architecture

```
Browser (SPA)
│
├── React Router DOM v7      ← Client-side routing
├── Redux Toolkit Store      ← Single source of truth
│   ├── workspaceSlice       ← All workspace/project/task state
│   └── themeSlice           ← Light/dark theme
│
└── Component Tree
    ├── Layout (Sidebar + Navbar + Outlet)
    ├── Dashboard             ← Stats, recent activity, task summary
    ├── Projects              ← Project list with search/filter
    ├── ProjectDetails        ← Tasks / Calendar / Analytics / Settings
    ├── Team                  ← Members table + invite dialog
    └── TaskDetails           ← Full task view with comments
```

---

## 📁 Folder Structure

```
Project Management/
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions — lint, build, Docker push
│
├── src/
│   ├── App.jsx               # Router with ErrorBoundary wrapping per route
│   ├── main.jsx              # App entry — BrowserRouter + Redux Provider
│   ├── index.css             # Tailwind base + global styles
│   │
│   ├── app/
│   │   └── store.js          # configureStore — combines all slices
│   │
│   ├── features/
│   │   ├── workspaceSlice.js # Reducers: setWorkspaces, addProject, addTask,
│   │   │                     #   updateTask, deleteTask, updateWorkspace …
│   │   └── themeSlice.js     # toggleTheme, loadTheme (localStorage persist)
│   │
│   ├── pages/
│   │   ├── Layout.jsx        # Shell: Sidebar + Navbar + <Outlet />
│   │   ├── Dashboard.jsx     # Overview: stats, activity, task summary
│   │   ├── Projects.jsx      # Project list with search and filtering
│   │   ├── ProjectDetails.jsx# Tabbed view: Tasks | Calendar | Analytics | Settings
│   │   ├── Team.jsx          # Team member table + invite dialog
│   │   ├── TaskDetails.jsx   # Individual task view
│   │   └── NotFound.jsx      # 404 fallback page
│   │
│   ├── components/
│   │   ├── ErrorBoundary.jsx # Catches render crashes, shows reset UI
│   │   ├── Navbar.jsx        # Top bar: search, theme toggle, user avatar
│   │   ├── Sidebar.jsx       # Navigation links + workspace indicator
│   │   ├── CreateProjectDialog.jsx  # Create project modal (dispatches addProject)
│   │   ├── CreateTaskDialog.jsx     # Create task modal (dispatches addTask)
│   │   ├── ProjectSettings.jsx      # Edit project form (dispatches updateWorkspace)
│   │   ├── ProjectTasks.jsx         # Task list with status/priority filters
│   │   ├── ProjectAnalytics.jsx     # Recharts-based analytics
│   │   ├── ProjectCalendar.jsx      # Monthly calendar with task pins
│   │   ├── ProjectCard.jsx          # Project summary card
│   │   ├── StatsGrid.jsx            # Dashboard stat tiles
│   │   ├── ProjectOverview.jsx      # Dashboard project list
│   │   ├── RecentActivity.jsx       # Dashboard activity feed
│   │   ├── TasksSummary.jsx         # Dashboard task overview
│   │   ├── WorkspaceDropdown.jsx    # Workspace switcher
│   │   ├── ProjectsSidebar.jsx      # Project navigation in sidebar
│   │   ├── MyTasksSidebar.jsx       # Personal task view in sidebar
│   │   ├── InviteMemberDialog.jsx   # Invite member to workspace
│   │   └── AddProjectMember.jsx     # Add member to project
│   │
│   └── assets/
│       ├── assets.js         # Image imports + dummy data (workspaces, users, projects)
│       ├── schema.prisma     # PostgreSQL schema reference (not yet connected)
│       └── *.svg / *.png     # Profile images and workspace thumbnails
│
├── public/                   # Static public assets
├── index.html                # HTML entry with SEO meta tags + OG tags
├── vite.config.js            # Vite + React + TailwindCSS plugin
├── eslint.config.js          # ESLint with React Hooks rules
├── Dockerfile                # Multi-stage build (Node builder → nginx)
├── docker-compose.yml        # Production + dev-profile services
├── nginx.conf                # nginx SPA config with gzip + security headers
├── package.json
└── .gitignore                # Node, Vite, env, OS, IDE exclusions
```

---

## 🗄️ Database Schema

> The Prisma schema (`src/assets/schema.prisma`) defines the intended PostgreSQL backend.

```
User ────────────────────────────────────────────────┐
│ id, name, email, image                              │
└─┬──────────────────────────────────────────────────┘
  │
  ├── WorkspaceMember (userId, workspaceId, role: ADMIN|MEMBER)
  │       └── Workspace (id, name, slug, ownerId)
  │               └── Project (name, status, priority, dates, team_lead)
  │                       ├── ProjectMember (userId, projectId)
  │                       └── Task (title, status, type, priority, assigneeId, due_date)
  │                               └── Comment (content, userId, taskId)
  │
  └── (Task assignee via Task.assigneeId → User.id)
```

**Enums:**
- `ProjectStatus`: ACTIVE | PLANNING | ON_HOLD | COMPLETED | CANCELLED
- `TaskStatus`: TODO | IN_PROGRESS | DONE
- `TaskType`: TASK | BUG | FEATURE | IMPROVEMENT | OTHER
- `Priority`: LOW | MEDIUM | HIGH
- `WorkspaceRole`: ADMIN | MEMBER

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18 (22 recommended)
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Gaurav598/Collaborative-Project-Manag.git
cd "Collaborative-Project-Manag"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Vite development server (HMR) |
| `npm run build` | Build optimized production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## 🔐 Environment Variables

> This project currently uses **static dummy data** — no environment variables are required for the frontend to run.

When connecting to a real backend, create a `.env` file in the project root:

```env
# Backend API base URL
VITE_API_URL=https://api.your-domain.com

# (Optional) Analytics / monitoring
VITE_SENTRY_DSN=
```

> **Never commit `.env` files** — they are excluded by `.gitignore`.

---

## 🐳 Running with Docker

### Production Build

```bash
# Build and run the production container (nginx on port 8080)
docker compose up --build
```

Visit [http://localhost:8080](http://localhost:8080)

### Development with Hot Reload

```bash
# Start Vite dev server inside Docker with volume mount
docker compose --profile dev up frontend-dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🌍 Deployment

### Vercel (Recommended for SPA)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add a `vercel.json` for SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### GitHub Actions CI/CD

The included `.github/workflows/ci.yml` automatically:
1. **On every push/PR:** Runs ESLint + Vite build
2. **On push to main/master:** Builds and pushes a Docker image to GitHub Container Registry (`ghcr.io`)

---

## 📡 API Documentation

> This frontend is currently using **mock data**. Below is the intended REST API contract when a backend is implemented.

### Workspaces

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workspaces` | List all workspaces for current user |
| `POST` | `/api/workspaces` | Create a new workspace |
| `PUT` | `/api/workspaces/:id` | Update workspace settings |
| `DELETE` | `/api/workspaces/:id` | Delete workspace |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/workspaces/:wsId/projects` | List projects in workspace |
| `POST` | `/api/workspaces/:wsId/projects` | Create new project |
| `PUT` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects/:projectId/tasks` | List tasks in project |
| `POST` | `/api/projects/:projectId/tasks` | Create task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task(s) |

### Members

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/workspaces/:wsId/members` | Invite member to workspace |
| `POST` | `/api/projects/:projectId/members` | Add member to project |
| `DELETE` | `/api/workspaces/:wsId/members/:userId` | Remove member |

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before submitting a PR.

### Development Workflow

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/Collaborative-Project-Manag.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then lint and build
npm run lint
npm run build

# Commit with conventional commits
git commit -m "feat: add your feature description"

# Push and open a PR
git push origin feature/your-feature-name
```

### Commit Convention

| Prefix | When to use |
|--------|------------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `chore:` | Build, CI, dependencies |
| `refactor:` | Code restructure without behavior change |
| `style:` | Formatting, whitespace |
| `test:` | Adding or updating tests |

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE.md).

---

<div align="center">
  Made with ❤️ — open source and free to use
</div>
