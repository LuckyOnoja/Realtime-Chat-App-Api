const chatSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('join', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });
  
      socket.on('message', (data) => {
        const { room, message } = data;
        io.to(room).emit('message', message); // Broadcast to the room
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };
  
  export default chatSocket;
  