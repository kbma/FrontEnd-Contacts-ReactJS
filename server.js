const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

io.on('connection', (socket) => {
  console.log('Client connected');
  
  // ... autres gestionnaires d'événements

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('Socket.io server listening on port 3001');
});
