# Employe-manage-with-crud-
Yeh ek full-stack Employee Management application hai jise Node.js, Express, MongoDB, aur React (MERN) ka use karke banaya gaya hai. Isme full CRUD (Create, Read, Update, Delete) functionalities ke saath-saath secure Session-based Login/Logout system bhi integrated hai.

✨ Key Features
Full CRUD Operations: Employees ka data add, view, update aur delete karne ki suvidha.

Session Management: Secure user sessions (Login/Logout) taaki sirf authorized users hi data access kar sakein.

RESTful API: Clean aur structured API endpoints (/routes/employe-routes).

CORS Enabled: Frontend (127.0.0.1:5500) ke saath smooth connectivity ke liye.

Database Integration: MongoDB ke saath real-time data storage.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (using Mongoose)

Authentication: Express-Session

Middleware: Body-parser, Cors, Dotenv

⚙️ Installation & Setup
Project ko local machine par chalane ke liye niche diye gaye steps follow karein:
1.git clone <your-repository-link>cd <project-folder-name>
2.npm install
3.PORT=5000 MONGO_URI=your_mongodb_connection_string SESSION_SECRET=your_secret_key_here
4.npm start
