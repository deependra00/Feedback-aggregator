# Feedback & Review Aggregator

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to collect, aggregate, and display user reviews and feedback in real-time.

---

##  Key Features

* **Real-time Feedback Submission:** Users can submit reviews with a username, rating (1-5 stars), and custom comments.
* **Dynamic Review Aggregation:** Displays all stored feedback seamlessly from the MongoDB database.
* **RESTful API Integration:** Fully connected frontend and backend architecture supporting GET, POST, and DELETE endpoints.
* **Modern Responsive Design:** Clean, accessible, and user-friendly interface built with custom CSS.
* **Cloud Deployed:** Scalable production setup hosted on Render (Backend) and Vercel (Frontend).

---

##  Tech Stack

### **Frontend**
* **React.js** (Vite framework)
* **HTML5 & CSS3** (Custom Responsive UI)
* **JavaScript (ES6+)**

### **Backend**
* **Node.js & Express.js** (REST API)
* **MongoDB & Mongoose** (Database Management)
* **CORS & Dotenv** (Cross-origin security & Environment configuration)

---

##  Project Structure

```text
Feedback-aggregator/
├── backend/
│   ├── model/
│   │   └── review.js       # Mongoose Review Schema
│   ├── .env                # Environment Variables
│   ├── package.json        # Backend Dependencies
│   └── server.js           # Express App & Database Connection
└── frontend/
    ├── src/
    │   ├── App.jsx         # Main React Component
    │   ├── App.css         # Application Styling
    │   └── main.jsx        # App Entry Point
    └── package.json        # Frontend Dependencies
