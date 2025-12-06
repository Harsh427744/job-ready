# 🚀 Job Ready – Gamified Coding Interview Platform

> Full-stack technical interview prep app with Monaco code editor, XP gamification, progress analytics, and smart question filtering (React + Node.js + MongoDB)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Monaco](https://img.shields.io/badge/Monaco-EFBB1D?style=for-the-badge&logo=monaco-editor&logoColor=white)](https://microsoft.github.io/monaco-editor/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Project Structure](#architecture--project-structure)
- [Installation & Setup](#installation--setup)
- [Backend API Overview](#backend-api-overview)
- [Frontend Flows](#frontend-flows)
- [Environment Configuration](#environment-configuration)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 🎯 Overview

**Job Ready** is a full-stack platform designed for technical interview preparation with:

- Monaco-powered code editor supporting JavaScript, Python, Java, C++
- 15+ coding challenges tagged by difficulty, category, and company
- XP-based gamification with 10-level progression and daily streaks
- Smart filtering and progress analytics dashboard
- Submission history tracking with performance stats

Built to showcase production-ready full-stack skills, real-time code editing, and engaging user experience for interview prep.

---

## ✨ Features

### 🔐 Secure Authentication

- JWT-based registration/login (`/api/auth/register`, `/api/auth/login`)
- Password hashing with bcrypt.js
- Protected routes for submissions and analytics

### 💻 Monaco Code Editor

- Real-time syntax highlighting for **JavaScript**, **Python**, **Java**, **C++**
- Multiple themes and language switching
- Auto-complete and error detection
- Full-screen mode for focused practice

### 🎮 Gamification System

- **XP rewards** per solved question (Easy: 10XP, Medium: 25XP, Hard: 50XP)
- **10-level progression** with level-up notifications
- **Daily streaks** and achievement badges
- **Progress bars** showing XP to next level

### 📊 Progress Dashboard

- **Solved vs Attempted** questions chart
- **Category performance** (Arrays, Trees, DP, etc.)
- **Company-wise stats** and weak areas
- **Streak counter** and XP summary

### 🔍 Smart Question Filtering

- Filter by **Difficulty**: Easy/Medium/Hard
- Filter by **Category**: Arrays, Strings, Trees, Graphs, DP
- Filter by **Company**: FAANG, Microsoft, Goldman Sachs
- Combined filters with real-time results

---

## 🛠️ Tech Stack

| Layer     | Technologies                                                                 |
|-----------|------------------------------------------------------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Monaco Editor, React Router, Axios       |
| Backend   | Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt.js              |
| Database  | MongoDB (local or Atlas)                                                     |
| Auth      | JWT tokens, bcrypt password hashing                                          |
| Dev Tools | ESLint, Prettier, Nodemon, GitHub Actions, VS Code                           |

---

## 🧱 Architecture & Project Structure

job-ready/
├── backend/ # Node.js + Express API
│ ├── src/
│ │ ├── config/ # DB config, env validation
│ │ ├── controllers/ # Auth, questions, submissions
│ │ ├── middleware/ # JWT auth, validation
│ │ ├── models/ # User, Question, Submission schemas
│ │ ├── routes/ # API routes (v1 prefix)
│ │ └── index.ts # Express app bootstrap
│ ├── .env # Environment variables
│ └── tsconfig.json
├── frontend/ # React + TypeScript app
│ ├── src/
│ │ ├── components/ # Reusable UI (Editor, Card, Modal)
│ │ ├── pages/ # Dashboard, Questions, Profile
│ │ ├── contexts/ # AuthContext, ThemeContext
│ │ ├── services/ # API clients (questions, submissions)
│ │ ├── hooks/ # useQuestions, useSubmissions
│ │ └── types/ # TypeScript interfaces
│ ├── tailwind.config.js
│ └── ...
└── README.md


---

## 🚀 Installation & Setup

### ✅ Prerequisites

- Node.js **v18+** (LTS recommended)
- MongoDB (local or [MongoDB Atlas](https://mongodb.com/atlas))
- npm or yarn
- Git

---

### 1️⃣ Clone the repo

git clone https://github.com/Harsh427744/job-ready.git

cd job-ready


---

### 2️⃣ Backend Setup (Node.js + MongoDB)

cd backend

npm install


Create `backend/.env`:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job-ready

OR MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/jobready
JWT_SECRET="your-super-secret-jwt-key-2025-min32chars"
NODE_ENV=development


Run backend:

npm run dev


**API**: [http://localhost:5000](http://localhost:5000)

---

### 3️⃣ Frontend Setup (React)

cd ../frontend
npm install
npm start


**Frontend**: [http://localhost:3000](http://localhost:3000)

---

## 📡 Backend API Overview

### Authentication

POST /api/auth/register # { email, password, username }
POST /api/auth/login # { email, password } → { access_token }


### Questions & Filtering

GET /api/questions?page=1&limit=10&difficulty=medium&category=arrays
GET /api/questions/:id
POST /api/questions # Admin: create new question


### Submissions & Analytics

POST /api/submissions # { questionId, language, code, status }
GET /api/submissions # User submissions history
GET /api/submissions/stats # XP, levels, streaks, category stats


**Sample Submission Payload:**

{
"questionId": "64f...abc",
"language": "javascript",
"code": "// your solution here",
"status": "accepted"
}


---

## 👨‍💻 Frontend Flows

1. **Login** → **Dashboard** (XP, level, streak)
2. **Browse Questions** → Filter by difficulty/category/company
3. **Question Detail** → Monaco Editor → Submit
4. **Results** → XP gained + level up animation
5. **Profile** → Stats charts, achievements, submission history

---

## 🔐 Environment Configuration

### Backend `.env` (backend/)

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-32+character-secret-key
NODE_ENV=development


### Frontend `.env` (frontend/, optional)

REACT_APP_API_URL=http://localhost:5000/api


---

## 🚧 Future Enhancements

- [ ] Real-time code execution with test case validation
- [ ] WebRTC peer-to-peer mock interviews
- [ ] AI-powered code review and optimization suggestions
- [ ] Collaborative whiteboard for system design practice
- [ ] Leaderboards and global rankings
- [ ] Mobile-first PWA experience
- [ ] Company-specific interview question packs

---

## 👨‍💻 Author

**Harsh Agarwal**

- GitHub: [@Harsh427744](https://github.com/harsh323dev)
- LinkedIn: [harsh323](https://www.linkedin.com/in/harsh323)
- Email: [harshagarwal323.ag@gmail.com](mailto:harshagarwal323.ag@gmail.com)


---

⭐ **Star this repo if you find it helpful for your interview prep!**

---
*Built for technical interviews • Production-ready full-stack showcase*


