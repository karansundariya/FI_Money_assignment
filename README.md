# FiMONEY - Inventory Management System

A modern, full-stack inventory management application built with React, Node.js, and MongoDB. Manage your product catalog with ease using a beautiful, responsive interface.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Product Management**: Add, view, and update product inventory
- **Real-time Analytics**: Track most added products and inventory insights
- **Responsive Design**: Modern UI that works on all devices
- **Search & Filter**: Find products quickly with advanced search
- **Pagination**: Efficiently browse large product catalogs
- **API Documentation**: Complete Swagger/OpenAPI documentation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Custom design system with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Swagger** - API documentation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd FiMONEY
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/fimoney
JWT_SECRET_KEY=your-super-secret-jwt-key-here
PORT=8080
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Start the Application

#### Start Backend Server
```bash
cd backend
npm start
```

The backend will be available at `http://localhost:8080`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Documentation

### Interactive Documentation
Once the backend is running, visit: `http://localhost:8080/api-docs`

### API Endpoints

#### Authentication
- `POST /auth/signup` - Create a new user account
- `POST /auth/login` - User login

#### Products
- `GET /products` - Get paginated product list
- `POST /products` - Add a new product
- `PUT /products/:id/quantity` - Update product quantity

#### Analytics
- `GET /analytics/most-added` - Get most added products

### Authentication
Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  email: String (optional),
  role: String (default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  name: String (required),
  type: String (required),
  sku: String (required, unique),
  image_url: String (optional),
  description: String (optional),
  quantity: Number (required),
  price: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

## 🗃️ Database Initialization

The application automatically creates the necessary collections and indexes on first use. However, you can manually initialize the database:

### Option 1: Using MongoDB Compass
1. Connect to your MongoDB instance
2. Create a database named `fimoney`
3. Collections will be created automatically when you first use the application

### Option 2: Using MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# Create database
use fimoney

# Create collections (optional - will be created automatically)
db.createCollection('users')
db.createCollection('products')

# Create indexes
db.users.createIndex({ "username": 1 }, { unique: true })
db.products.createIndex({ "sku": 1 }, { unique: true })
```

### Option 3: Using the provided script
```bash
cd backend/scripts
node createUser.js
```

## 🔧 Development

### Project Structure
```
FiMONEY/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── utils/           # Utility functions
│   ├── scripts/         # Database scripts
│   └── swagger.yaml     # API documentation
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── assets/      # Static assets
│   │   └── App.jsx      # Main app component
│   └── public/          # Public assets
└── README.md           # This file
```

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🧪 Testing

### API Testing
Use the provided Postman collection: `backend/FiMONEY.postman_collection.json`

### Manual Testing
1. Start both backend and frontend servers
2. Visit `http://localhost:5173`
3. Create an account or use demo credentials:
   - Username: `admin`
   - Password: `admin`

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your Node.js version, MongoDB version, and error logs

## 🔗 Links

- [API Documentation](http://localhost:8080/api-docs) (when server is running)
- [Frontend Repository](./frontend)
- [Backend Repository](./backend)
