import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import {refreshAccessToken}  from './utils/refreshToken.js';

dotenv.config();

const app = express();

// CORS setup
const corsOptions = {
  origin: [process.env.FRONTEND_URL],  
  credentials: true,              
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(express.json());


import userRoutes from './routes/userRoutes.js';
app.use('/users', userRoutes);
// app.use('/', userRoutes); 
app.post('/refresh-token',refreshAccessToken );

// Database connection
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Resume server is running on http://localhost:${PORT}`);
});
