# 🎬 Movie Rating App

A full-stack **Movie Rating** website built using **Angular, Node.js, and MySQL**. Users can rate movies, leave reviews, and manage their profiles. Admins can manage users and movie entries.

## 🚀 Tech Stack
- **Frontend:** Angular 19.2.1, TypeScript  
- **Backend:** Node.js, Express.js, Sequelize  
- **Database:** MySQL  
- **Authentication:** JWT (JSON Web Token)  
- **Deployment:** Vercel (Frontend)

## 📂 Project Structure
movieRatingApp/ │-- MovieRatingBackend/ # Backend (Node.js + Express) │ ├── models/ # Database models (Sequelize) │ ├── routes/ # API routes │ ├── controllers/ # Business logic │ ├── migrations/ # Sequelize migrations │ ├── seeders/ # Database seeders │ ├── .env # Environment variables │ ├── app.js # Main entry point │ └── package.json # Backend dependencies │ │-- movie-rating/ # Frontend (Angular) │ ├── src/ # Angular source code │ ├── dist/ # Production build │ ├── angular.json # Angular configuration │ ├── package.json # Frontend dependencies │ │-- .gitignore # Ignore unnecessary files │-- README.md # Project documentation │-- package.json# Root scripts for easy setup

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

git clone <your-repo-url>
cd movieRatingApp
### 2️⃣ Clone the Repository
npm run install:all

###  3️⃣  Configure Environment Variables

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=movie_rating_db
JWT_SECRET=w&9D!p$3zY*Q@K#r8g^T

###  4️⃣  Run Migrations & Seeders

npm run setup

###  5️⃣ Start the Application
npm start

📌 Features
✅ User authentication (JWT-based login/signup)
✅ Add, update, and delete movie ratings
✅ Users can like/dislike reviews
✅ Admin panel to manage users & movies
✅ Pagination & sorting for movie listings

👨‍💻 Author
Jatin - Software Engineer (MEAN Stack Developer)
Feel free to reach out via GitHub or LinkedIn! 😊