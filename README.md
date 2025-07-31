# 🛒 GreenKart - MERN E-commerce Platform

A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, product management, shopping cart functionality, and a responsive design. The application automatically loads all 63 products when first run, providing a complete grocery shopping experience.

![GreenKart](https://img.shields.io/badge/GreenKart-E--commerce-brightgreen)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Password reset functionality
- User profile management
- Secure password hashing with bcrypt
- Registration redirects to login page for better UX

### 🛍️ E-commerce Features
- Product browsing with search functionality
- Product categorization (Fresh Produce, Dairy, Snacks, etc.)
- Shopping cart with persistent storage
- Add/remove items from cart
- Quantity management
- Real-time cart updates
- 63 products across 7 categories automatically loaded

### 🎨 User Interface
- Modern, responsive design
- Semantic UI React components
- Smooth animations and transitions
- Mobile-friendly interface
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **React.js** (18.3.1) - UI library
- **React Router DOM** (7.7.0) - Client-side routing
- **Semantic UI React** (2.1.5) - UI component library
- **Axios** (1.11.0) - HTTP client
- **React Toastify** (11.0.5) - Toast notifications
- **Vite** (7.0.4) - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** (4.18.2) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (7.0.3) - MongoDB ODM
- **JWT** (9.0.0) - Authentication
- **bcryptjs** (2.4.3) - Password hashing
- **CORS** (2.8.5) - Cross-origin resource sharing

## 📸 Screenshots

### Login Page
<img width="1365" height="678" alt="login" src="https://github.com/user-attachments/assets/aa961af4-718c-4239-8989-ae67d8c31778" />

### Home Page
<img width="1350" height="680" alt="homepage" src="https://github.com/user-attachments/assets/6427faa2-e262-421b-b52c-fe66c045edf8" />

### Products Page
<img width="1349" height="679" alt="products" src="https://github.com/user-attachments/assets/9386e0d5-6f41-42c0-bd94-2be1f62a6e2f" />

### Shopping Cart
<img width="1349" height="677" alt="cart" src="https://github.com/user-attachments/assets/cc7432b9-a8ce-4364-b9f5-9f2afde9dd15" />

### User Profile
<img width="1350" height="677" alt="profile" src="https://github.com/user-attachments/assets/a0c433b7-3a9d-47bd-9558-ae4ee0096955" />

## 🚀 Installation

### Prerequisites
- Node.js (>= 16.0.0)
- MongoDB database
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/abhinavtalakola/GreenKart.git
cd GreenKart
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Set Up Environment Variables
Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string/greenkart
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
PORT=5000
```

### Step 5: Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000` and automatically load all 63 products if the database is empty.

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Step 6: Access Your Application
Open your browser and go to `http://localhost:3000`

**That's it!** The application will automatically load all products when you first run it.

## 🔧 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/greenkart` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key-here` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `PORT` | Backend server port | `5000` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?q=query` - Search products

## 📁 Project Structure

```
GreenKart MERN/
├── backend/
│   ├── index.js              # Server entry point with auto-seeding
│   ├── middleware/
│   │   └── authMiddleware.js # JWT authentication middleware
│   ├── models/
│   │   ├── Product.js        # Product schema
│   │   └── User.js          # User schema
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── products.js      # Product routes
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── images/          # Product images
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── api.js           # API configuration
│   │   └── main.jsx         # App entry point
│   └── package.json
└── README.md
```

## 🎯 Key Features

### User Experience
- **Registration flow**: Users are redirected to login after registration
- **Responsive design**: Works perfectly on all devices
- **Real-time updates**: Cart updates instantly
- **Search functionality**: Find products quickly

### Security
- **JWT authentication**: Secure token-based auth
- **Password hashing**: bcrypt for secure password storage
- **CORS protection**: Secure cross-origin requests

---

**Made with ❤️ using the MERN Stack** 
