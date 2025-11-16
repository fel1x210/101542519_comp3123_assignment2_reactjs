# Employee & User Management - Full Stack Application

**Student Name**: Nguyen Minh Triet Luu  
**Student ID**: 101542519  
**Course**: COMP3123 
**Assignment**: Assignment 1 

## 📁 Project Structure

```
101542519_comp3123_assignment1/
├── backend/                 # Express REST API
│   ├── middleware/          # Auth & validation middleware
│   ├── model/               # Mongoose schemas
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   ├── package.json         # Backend dependencies
│   └── vercel.json          # Deployment config
├── frontend/                # React application
│   ├── public/              # Static files
│   ├── src/                 # React components
│   └── package.json         # Frontend dependencies
├── package.json             # Root workspace scripts
└── README.md                # This file
```

##  **How to Run the Project**

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fel1x210/101542519_comp3123_assignment1.git
   cd 101542519_comp3123_assignment1
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   # Install all dependencies at once
   npm run install:all
   
   # OR install separately
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Start the backend server**
   ```bash
   # From root directory
   npm run dev:backend
   
   # OR from backend directory
   cd backend
   npm run dev
   ```

4. **Start the frontend application (in a new terminal)**
   ```bash
   # From root directory
   npm run dev:frontend
   
   # OR from frontend directory
   cd frontend
   npm start
   ```

5. **Access the application**
   - **Backend API**: http://localhost:3000
   - **Frontend**: http://localhost:3001 (or the port shown in terminal)

## **Environment Variables (Optional)**

The project works without any environment variables - all necessary values are already configured in the code.

If you want to customize configuration, you can optionally create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration  
DB_CONNECTION_STRING=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
```

### Default Values (No .env required)
- **Backend Port**: 3000
- **Frontend Port**: 3001 (auto-assigned by React)
- **Database**: MongoDB Atlas (connection string in backend/server.js)
- **JWT Secret**: Configured in backend/middleware/auth.js
- **JWT Expiry**: 24 hours
- **CORS**: Enabled for all origins (development mode)

## 📝 Important Notes

### API Base URL
```
http://localhost:3000/api/v1
```

### Authentication Flow
1. **Sign up** a user: `POST /api/v1/user/signup`
2. **Login** to get JWT token: `POST /api/v1/user/login`
3. **Use JWT token** in Authorization header for employee operations

### JWT Token Usage
All employee endpoints require authentication:
```
Authorization: Bearer <your_jwt_token>
```

### Password Requirements
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number
- Case insensitive (uppercase/lowercase doesn't matter)

### Database Schemas

#### User Schema
- `username`: 3-50 characters, unique
- `email`: Valid email format, unique
- `password`: 8+ chars with letters & numbers (hashed)

#### Employee Schema
- `first_name`, `last_name`: 2-50 characters, letters only
- `email`: Valid email format, unique
- `position`: 2-100 characters
- `salary`: Positive number
- `date_of_joining`: Date format (YYYY-MM-DD)
- `department`: 2-100 characters

### API Endpoints Summary

#### Public Endpoints
- `POST /api/v1/user/signup` - Create user account
- `POST /api/v1/user/login` - Login and get JWT token

#### Protected Endpoints (Require JWT)
- `GET /api/v1/emp/employees` - Get all employees
- `POST /api/v1/emp/employees` - Create new employee
- `GET /api/v1/emp/employees/{id}` - Get employee by ID
- `PUT /api/v1/emp/employees/{id}` - Update employee
- `DELETE /api/v1/emp/employees?eid={id}` - Delete employee

### Testing with Postman
1. Create user account with signup endpoint
2. Login to get JWT token
3. Copy token and add to Authorization header
4. Test employee endpoints with the token

### Common Issues & Solutions
- **"Access denied. No token provided"**: Add JWT token to Authorization header
- **"Cannot POST/GET/PUT/DELETE"**: Check URL format and ensure server is running
- **Validation errors**: Verify all required fields and formats
- **Token expired**: Login again to get a new JWT token

### Dependencies

#### Backend
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcrypt`: Password hashing
- `jsonwebtoken`: JWT authentication
- `express-validator`: Input validation
- `cors`: Enable CORS for frontend
- `nodemon`: Development auto-reload (dev dependency)

#### Frontend
- `react`: UI library
- `react-dom`: React DOM rendering
- `react-scripts`: Create React App tooling

### Available Scripts

#### Root Directory
- `npm run install:all` - Install all dependencies (backend + frontend)
- `npm run dev:backend` - Start backend in development mode
- `npm run dev:frontend` - Start frontend development server
- `npm run start:backend` - Start backend in production mode
- `npm run build:frontend` - Build frontend for production

#### Backend Directory (`cd backend`)
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start in production mode

#### Frontend Directory (`cd frontend`)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🔗 Repository
[GitHub Repository](https://github.com/fel1x210/101542519_comp3123_assignment1)