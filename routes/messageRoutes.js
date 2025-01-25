import express from 'express';
import {
  sendMessage,
  getMessages,
  markAsRead,
} from '../controllers/messageController.js';

const router = express.Router();

// Route to send a message
router.post('/', sendMessage);

// Route to get all messages for a user
router.get('/:userId', getMessages);

// Route to mark a message as read
router.patch('/:messageId/read', markAsRead);

export default router;
