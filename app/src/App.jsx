import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DecksPage from './pages/DecksPage';
import StudyPage from './pages/StudyPage';
import LoginPage from './pages/LoginPage';
import './App.css';

// Un componente wrapper para las rutas que necesitan autenticación.
// Si el usuario no está logueado, lo redirige a la página de login.
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

// Un componente para mantener el Layout en las rutas protegidas.
const AppLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Si el usuario ya está logueado, ir a /login lo redirige a la home */}
        <Route 
          path="/login" 
          element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        
        {/* Aquí agrupamos todas las rutas que requieren autenticación */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/decks" element={<DecksPage />} />
            <Route path="/decks/:deckId" element={<StudyPage />} />
          </Route>
        </Route>

        {/* Una ruta catch-all por si el usuario navega a una página que no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
