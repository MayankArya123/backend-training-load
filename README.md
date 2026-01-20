# Workout Tracker Backend

This is the **backend server** for the Workout Tracker app. It is built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. It handles user management, workout logging, and analytics calculation.

---

## Features

- User authentication:
  - **Register** and **Login** with JWT
  - Stores userId in **cookies** for session management
- Workout CRUD:
  - Create, Read, Update, Delete workouts
  - Each workout includes:
    - Title
    - Duration (minutes)
    - Intensity (1–10 scale)
    - Muscle group
    - Date
- Analytics:
  - Calculate **weekly load**: `duration × intensity`
  - Calculate **fatigue risk** based on week-to-week load
  - Detect **plateaus** when load remains constant for multiple weeks
- CORS enabled for communication with Next.js frontend
- Cookie parsing and JWT verification for secure API routes

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd server

2.
npm install


3
add envs
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NEXT_URL=http://localhost:3000
NODE_ENV='dev'
PORT=4000

4
run npm run dev
```
