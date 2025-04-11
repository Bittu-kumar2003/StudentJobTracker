# 🎓 Student Job Tracker

A full-stack web app to help students manage and track their job applications — Add, View, Edit, and Delete jobs. Built using React (Vite) + Node.js + Express + MongoDB.

---

## 🔧 Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Deploy**: Vercel (Frontend), Render (Backend)

---

## 📁 Project Folder Structure

```
student-job-tracker/
├── backend/
│   ├── models/
│   │   └── Job.js
│   ├── routes/
│   │   └── jobs.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobForm.jsx
│   │   │   └── JobList.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── README.md
```

---

## 🛠 Installation Steps

### 📌 Prerequisites

- Node.js installed
- MongoDB Atlas account
- Git installed

### 🔹 Step 1: Clone Repo

```bash
git clone https://github.com/your-username/student-job-tracker.git
cd student-job-tracker
```

### 🔹 Step 2: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Run backend server:

```bash
node server.js
```

> Backend runs at `http://localhost:5000/api/jobs`

### 🔹 Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

Create `.env` file inside `/frontend`:

```env
VITE_API_URL=http://localhost:5000/api/jobs
```

Run frontend app:

```bash
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

## 🌐 Deployment Guide

### 🚀 Backend on Render

1. Go to [https://render.com](https://render.com)
2. Create new web service
3. Connect to your repo → Select `/backend`
4. Add Environment Variables:
   ```
   MONGO_URI=your_connection_string
   ```
5. Build command: `npm install`  
   Start command: `node server.js`

### 🚀 Frontend on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Import your frontend repo (`/frontend`)
3. Add environment variable:
   ```
   VITE_API_URL=https://your-api.onrender.com/api/jobs
   ```
4. Deploy and done!

---

## ✨ Features

- Add job with company name, position, date, link, status
- View all jobs in a list
- Edit job status
- Delete job
- Clean UI, responsive layout

---

## 📸 Suggested Screenshot Placements

1. `./assets/app-preview.png`  
   _Homepage with list view_
   ```
  ![Screenshot (96)](https://github.com/user-attachments/assets/d4f0010a-4415-41eb-b4b4-cdab47c192f3)

   
   ```

2. `./assets/add-job.png`  
   _Form to add job_
   ```
![Screenshot (97)](https://github.com/user-attachments/assets/dabc13c4-4d1e-4413-870c-0970ae80d984)

   ```

3. `./assets/job-list.png`  
   _All job entries_
   ```
![Screenshot (98)](https://github.com/user-attachments/assets/bab0b52a-2956-4884-ab54-68383a23ad15)

   ```

---

## 🎥 Suggested Video Tutorial

To understand full-stack MERN apps with Vercel + Render deployment, watch:  
📺 [MERN Stack Project Full Tutorial](https://www.youtube.com/watch?v=4yqu8YF29cU)

---

## 💡 Tips & Gotchas

- Make sure backend response is always an array:
  ```js
  setJobs(Array.isArray(res.data) ? res.data : []);
  ```
- Keep your `.env` safe, never push it to GitHub.
- Use `cors` in your backend to allow cross-origin requests:
  ```js
  const cors = require("cors");
  app.use(cors());
  ```

---

## 👨‍💼 Author

**Bittu Kumar**  
📍 Sir Padampat Singhania University  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)  
🔗 [GitHub](https://github.com/your-username)

---

## 📄 License

MIT License

