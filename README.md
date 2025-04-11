# 🎓 Student Job Tracker

A full-stack web application for students to manage and track their job applications. This tool allows users to add, view, update, and delete job records, helping them stay organized during job hunts.

---

## 🛠 Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | React (with Vite)      |
| Backend     | Node.js, Express.js    |
| Database    | MongoDB Atlas          |
| Deployment  | Vercel (Frontend), Render (Backend) |

---

## 🚀 Features

- ➕ Add Job Application  
  (Fields: Company, Role, Status, Date, Link)
- 📄 View All Applications in a clean layout
- 🔄 Update Application Status
- ❌ Delete Application
- 🔍 Filter by status/date (optional future enhancement)

---

## 📸 Screenshots

👉 You can include screenshots here for better clarity.

1. **App Preview**  
   _Recommended image path:_ `./assets/app-preview.png`


2. **Add Job Form**  
_Show the form UI_  

3. **Job List View**  
_Display of job applications_  
 Step 2: Backend Setup
bash
Copy
Edit
cd backend
npm install
🧪 Create .env File
Create a file named .env inside /backend and add:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
▶️ Start the Backend
bash
Copy
Edit
node server.js
Your backend API will be running at:

bash
Copy
Edit
http://localhost:5000/api/jobs
💻 Step 3: Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
🧪 Create .env File
Create a file named .env inside /frontend and add:

env
Copy
Edit
VITE_API_URL=http://localhost:5000/api/jobs
▶️ Start the Frontend
bash
Copy
Edit
npm run dev
The frontend will start at:

arduino
Copy
Edit
http://localhost:5173
🌍 Deployment
🔵 Backend Deployment (Render)
Go to https://render.com

Click "New Web Service"

Connect your GitHub repo and choose /backend

Environment:

Build Command: npm install

Start Command: node server.js

Add Environment Variable:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
Deploy and note the Render URL (e.g., https://your-api.onrender.com)

⚪ Frontend Deployment (Vercel)
Go to https://vercel.com

Import your frontend project (/frontend)

Add Environment Variable:

ini
Copy
Edit
VITE_API_URL=https://your-api.onrender.com/api/jobs
Deploy!

Your live frontend URL will look like:

arduino
Copy
Edit
https://your-app.vercel.app
🧼 Environment File Sample
🔐 /backend/.env
env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://your-cluster.mongodb.net/student-job-tracker
🔐 /frontend/.env
env
Copy
Edit
VITE_API_URL=https://your-api.onrender.com/api/jobs
🛡️ Error Handling Tips
Make sure res.data is always an array before calling jobs.map(...):

js
Copy
Edit
setJobs(Array.isArray(res.data) ? res.data : []);
Use try-catch in all async calls.

✨ Future Improvements (Suggestions)
🔍 Filter jobs by status or date

🔔 Notifications for upcoming interviews

📅 Calendar integration

📊 Dashboard for statistics

🤝 Contributing
Contributions are welcome! If you have suggestions or find a bug, feel free to open an issue or pull request.

