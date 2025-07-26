# FiMONEY Backend - Inventory Management API

A robust Node.js/Express.js backend API for the FiMONEY inventory management system.

## 🚀 Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure endpoints
- **Password Hashing** with bcrypt
- **Swagger/OpenAPI** documentation
- **CORS** enabled for frontend integration
- **Environment-based** configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/fimoney

# JWT Secret Key (generate a strong random string)
JWT_SECRET_KEY=your-super-secret-jwt-key-here

# Server Port
PORT=8080

# Optional: Environment
NODE_ENV=development
```

### 3. Database Initialization

#### Option A: Using the initialization script (Recommended)
```bash
# Run the database initialization script
node scripts/init-database.js
```

This will:
- Create the database and collections
- Set up proper indexes
- Create sample users and products
- Provide default login credentials

#### Option B: Manual setup
```bash
# Connect to MongoDB
mongosh

# Create database
use fimoney

# Create collections
db.createCollection('users')
db.createCollection('products')

# Create indexes
db.users.createIndex({ "username": 1 }, { unique: true })
db.products.createIndex({ "sku": 1 }, { unique: true })
```

### 4. Start the Server

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will be available at `http://localhost:8080`

## 📚 API Documentation

### Interactive Documentation
Visit `http://localhost:8080/api-docs` for interactive Swagger documentation.

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

### User Model
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

### Product Model
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

## 🗃️ Database Initialization Script

The `scripts/init-database.js` script provides:

### Features
- **Automatic database setup** with proper indexes
- **Sample data creation** (users and products)
- **Password hashing** for secure user creation
- **Error handling** and detailed logging

### Sample Data Created
- **Users**: admin/admin123, demo/demo123
- **Products**: 5 sample products across different categories

### Usage
```bash
# Run initialization
node scripts/init-database.js

# Expected output:
# 🔌 Connecting to MongoDB...
# ✅ Connected to MongoDB successfully!
# 🧹 Clearing existing data...
# ✅ Existing data cleared
# 👥 Creating users...
# ✅ Created user: admin
# ✅ Created user: demo
# 📦 Creating products...
# ✅ Created product: Laptop Dell XPS 13
# ...
# 📊 Creating database indexes...
# ✅ Database indexes created
# 🎉 Database initialization completed successfully!
```

## 🧪 Testing

### API Testing
Use the provided Postman collection: `FiMONEY.postman_collection.json`

### Manual Testing
1. Start the server: `npm run dev`
2. Visit: `http://localhost:8080/api-docs`
3. Test endpoints using the interactive documentation

### Default Credentials
After running the initialization script:
- **Admin**: username: `admin`, password: `admin123`
- **Demo**: username: `demo`, password: `demo123`

## 🔧 Development

### Project Structure
```
backend/
├── models/          # Database models (User.js, Product.js)
├── routes/          # API routes (auth.js, products.js, analytics.js)
├── middlewares/     # Custom middlewares (auth.js)
├── utils/           # Utility functions
├── scripts/         # Database scripts (init-database.js)
├── swagger.yaml     # API documentation
├── index.js         # Main server file
└── package.json     # Dependencies and scripts
```

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/fimoney` |
| `JWT_SECRET_KEY` | JWT signing secret | Required |
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment | `development` |

## 🚀 Deployment

### Production Setup
1. Set environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

### Environment Variables for Production
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fimoney
JWT_SECRET_KEY=your-very-long-and-secure-jwt-secret-key
PORT=8080
NODE_ENV=production
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Request validation and sanitization
- **CORS Configuration**: Proper CORS setup for frontend integration
- **Environment Variables**: Sensitive data stored in environment variables

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your Node.js version, MongoDB version, and error logs 