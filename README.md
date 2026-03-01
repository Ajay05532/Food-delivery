

# 🍔 Food Delivery Web Application

<img width="1440" height="900" alt="Screenshot 2026-03-01 at 8 28 58 PM" src="https://github.com/user-attachments/assets/ee609303-0a20-430f-b242-396430b9e19d" />

------------------------------------------------------------------------

A full-stack **Food Delivery Application** that allows users to browse meals, add items to cart, place orders, and manage deliveries in real time.
This project demonstrates modern web development using a **React frontend**, **Node.js/Express backend**, and **MongoDB database** with secure authentication and RESTful APIs.

------------------------------------------------------------------------

## 🚀 Features

-   User Authentication (Login / Signup)
-   Otp verification
-   Browse Food Items by Category or Restaurant
-   Add to Cart & Update Quantity
-   Secure Checkout System
-   Map integration
-   Admin Panel for Managing Items
-   REST API Integration
-   Responsive UI (Mobile Friendly)

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend

-   React (Vite)
-   Axios
-   React Router
-   Redux
-   Tailwind
-   Framer Motion
-   Leaflet and OpenStreetMap

### Backend

-   Node.js
-   Express.js
-   MongoDB (Mongoose)
-   JWT Authentication
-   dotenv
-   Redis
-   Fast2SMS

------------------------------------------------------------------------

## 📁 Project Structure

    food-delivery/
    │
    ├── backend/              # Express Server
    ├── frontend/             # React App
    └── README.md

------------------------------------------------------------------------

## ⚙️ Backend Setup Instructions

### 1️⃣ Navigate to Backend Folder

    cd backend

### 2️⃣ Install Dependencies

    npm install

### 3️⃣ Create `.env` File

Create a `.env` file inside `backend/` and add:

    PORT=5000
    NODE_ENV=development
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    FAST2SMS_KEY=your_fast2sms_api_key
    FRONTEND_URL=http://localhost:5173
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    REDIS_URL=your_redis_connection_url

------------------------------------------------------------------------

### 4️⃣ Start Backend Server

    npm run dev

Server will run at:

    http://localhost:5000
    RAZORPAY_KEY_ID=your_razorpay_key_id

------------------------------------------------------------------------

## 💻 Frontend Setup Instructions

### 1️⃣ Navigate to Frontend Folder

    cd frontend

### 2️⃣ Install Dependencies

    npm install

### 3️⃣ Configure API Base URL

Create `.env` inside frontend:

    VITE_API_URL=http://localhost:5000

### 4️⃣ Start Frontend

    npm run dev

Frontend will run at:

    http://localhost:5173

------------------------------------------------------------------------

## 🧪 Run Full Project (Quick Start)

Open two terminals:

### Terminal 1

    cd backend
    npm install
    npm run dev

### Terminal 2

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

## 📸 Screenshots

Add screenshots in a `screenshots/` folder and link like:


<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
    <img width="600" alt="Screenshot 2026-02-04 at 10 34 26 PM" src="https://github.com/user-attachments/assets/0c357ab2-0567-4bbe-a20d-9710f9a6f4b4" />
    <img width="600" alt="Screenshot 2026-02-04 at 2 09 28 PM" src="https://github.com/user-attachments/assets/66fe437b-8226-4c3e-a0e8-7005ddaf25fb" />
</div>

------------------------------------------------------------------------

## 🎥 Demo Video


https://github.com/user-attachments/assets/1a183cb5-fb66-4c3a-a3db-356fa64ff3d8

------------------------------------------------------------------------


## 📦 Future Improvements

-   Online Payment Integration (Stripe/Razorpay)
-   Real-time Order Tracking
-   Admin Dashboard Analytics
-   Docker Deployment

------------------------------------------------------------------------

## 👨‍💻 Author

**Ajay**\
B.Tech Computer Science

