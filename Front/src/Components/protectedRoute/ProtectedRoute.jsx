import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Composant ProtectedRoute - Gère l'accès aux routes protégées
const ProtectedRoute = () => {
  // Vérification de l'authentification via Redux
  const isAuthenticated = useSelector((state) => state.authentification.isLoggedIn);
  // Vérification du token stocké localement
  const storedToken = localStorage.getItem('authentificationToken');

  // Redirection vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated && !storedToken) {
    return <Navigate to="/login" />;
  }

  // Affichage du contenu protégé
  return <Outlet />;
};

export default ProtectedRoute;
