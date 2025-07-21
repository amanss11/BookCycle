import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </SocketProvider>
  </React.StrictMode>
);
