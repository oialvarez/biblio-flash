import { StrictMode } from 'react';
import './services/firebase'; // Import and initialize Firebase!

import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// El enrutador se moverá a App.jsx para manejar las rutas protegidas.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
