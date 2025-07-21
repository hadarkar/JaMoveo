import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // ודא שהפורט נכון!

function App() {
  useEffect(() => {
    // חיבור לשרת
    socket.on('connect', () => {
      console.log('Connected to socket server:', socket.id);

      // שליחת הודעה לבדיקה
      socket.emit('test', 'Hello from client!');
    });

    // רק לוודא שאין שגיאות
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

  }, []);

  return (
    <div className="text-2xl text-green-600 p-4">
      Testing Socket.IO!
    </div>
  );
}

export default App;
