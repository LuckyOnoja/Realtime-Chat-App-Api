import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/messageRoutes.js';
import chatSocket from './sockets/chat.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

chatSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
