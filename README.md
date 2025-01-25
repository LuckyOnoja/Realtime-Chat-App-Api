# Chat Application Documentation

This is a real-time chat application built using **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. The application provides features for real-time messaging, user authentication, and message tracking.

---

## Features

- **User Authentication**: Secure user sign-up and login with password hashing.
- **Real-Time Messaging**: Instant chat functionality using **Socket.IO**.
- **Message Persistence**: Messages are stored in a MongoDB database for future retrieval.
- **Read Receipts**: Messages can be marked as read.
- **Responsive Design**: Frontend built to be mobile and desktop-friendly.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Socket.IO**: Enables real-time, bi-directional communication between web clients and servers.
- **MongoDB**: NoSQL database for storing user and message data.
- **Mongoose**: ODM for MongoDB.
- **BcryptJS**: For hashing passwords securely.

### Frontend
- Whatever choice.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LuckyOnoja/Realtime-Chat-App-Api.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and include the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SOCKET_IO_ORIGIN=http://localhost:3000 # Adjust based on frontend URL
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. If you have a frontend, ensure it is configured to connect to the same backend server and Socket.IO instance.

---

## API Endpoints

### Authentication Routes

**Base URL**: `/api/auth`

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/register`    | Register a new user.     |
| POST   | `/login`       | Log in an existing user. |

### Message Routes

**Base URL**: `/api/messages`

| Method | Endpoint                   | Description                            |
|--------|----------------------------|----------------------------------------|
| POST   | `/`                        | Send a message.                       |
| GET    | `/:userId`                 | Get all messages for a specific user. |
| PATCH  | `/:messageId/read`         | Mark a message as read.               |

---

## Real-Time Functionality

The application uses **Socket.IO** to handle real-time communication. Below is a summary of the events:

### Events

#### Server-Side Events
- **`connection`**: Triggered when a client connects.
- **`sendMessage`**: Handles sending messages between users.
- **`disconnect`**: Triggered when a client disconnects.

#### Client-Side Events
- **`newMessage`**: Listens for new incoming messages.
- **`messageRead`**: Updates the read status of a message.

---

## Database Schema

### User Schema
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
```

### Message Schema
```javascript
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});
```

---

## Project Structure

```plaintext
├── controllers
│   ├── authController.js    # Authentication logic
│   ├── messageController.js # Message handling logic
├── models
│   ├── User.js              # User schema
│   ├── Message.js           # Message schema
├── routes
│   ├── authRoutes.js        # Auth-related routes
│   ├── messageRoutes.js     # Message-related routes
├── server.js                # Entry point
├── .env                     # Environment variables
```

---

## Usage

1. Open the application in your browser at `http://localhost:5000` (or the configured PORT).
2. Use a tool like Postman or your frontend to test API endpoints.
3. Connect multiple clients to test real-time messaging.

---

## Contributing

Feel free to submit issues or pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

