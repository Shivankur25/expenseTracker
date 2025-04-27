# Expense Tracker Project

A full-stack expense tracker application built with React.js, Express, and MongoDB. This app allows users to track their expenses by category and visualize their spending patterns.

## Project Structure
This repository contains both the **frontend** (React) and **backend** (Node/Express) code.

### Folder Structure:
- `backend/`: The backend folder contains all the necessary files for the Express.js server and MongoDB logic.
- `frontend/`: The frontend folder contains the React.js application for the user interface.

## Installation and Setup

### Backend Setup:
1. **Navigate to the backend folder**:

2. **Install dependencies**:

3. **Set up environment variables**:
- Create a `.env` file in the `backend` folder and add the necessary environment variables:
  ```
  MONGO_URI=your-mongodb-uri
  PORT=5000
  ```

4. **Start the server**:

The backend server should now be running on `http://localhost:5000`.

### Frontend Setup:
1. **Navigate to the frontend folder**:

2. **Install dependencies**:

3. **Start the React app**:

The React app should now be running on `http://localhost:3000`.

## Deployment:
Once both the backend and frontend are running locally, you can deploy them to a platform like Heroku, Netlify, or Vercel.

For **backend deployment**:
- Push the `backend` folder to Heroku or a similar platform.
- Ensure you set the necessary environment variables in the deployment platform.

For **frontend deployment**:
- Deploy the `frontend` folder to Netlify, Vercel, or any other hosting service.

## Features:
- User registration and login.
- Expense creation, editing, and deletion.
- Expense data visualization with charts (Pie and Bar charts).
- JWT authentication for secure routes.

## Technologies Used:
- **Frontend**: React, Material-UI, Axios.
- **Backend**: Node.js, Express, MongoDB, JWT.
- **Charts**: Recharts for visualizing data.

## Future Improvements:
- Implement user authentication with OAuth.
- Add more detailed analytics for the expenses.
- Add recurring expense feature.

