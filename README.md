# FiMONEY Inventory Management System

A simple, modern inventory management app built with React (frontend) and Node.js/Express (backend) using MongoDB.

## Features
- User authentication (login/signup)
- Add, view, and manage products
- Inventory analytics dashboard
- Responsive, user-friendly UI

## Quick Start
1. **Clone this repo**
   ```bash
   git clone https://github.com/karansundariya/FI_Money_assignment.git
   cd FI_Money_assignment
   ```
2. **Install dependencies**
   - Backend:
     ```bash
     cd backend
     npm install
     cp .env.example .env # Edit .env with your MongoDB URI and JWT secret
     npm run dev
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     npm run dev
     ```
3. **Open the app**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend/API: [http://localhost:8080](http://localhost:8080)

## Notes
- Requires Node.js and MongoDB (local or Atlas)
- API docs: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

---
Made with ❤️ by Karan Sundariya 