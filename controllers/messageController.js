import Message from '../models/message.js';

// Send a message
export const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  if (!sender || !receiver || !content) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const message = await Message.create({ sender, receiver, content });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
};

// Get messages for a user
export const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).populate('sender', 'username').populate('receiver', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve messages', error });
  }
};

// Mark a message as read
export const markAsRead = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message', error });
  }
};
