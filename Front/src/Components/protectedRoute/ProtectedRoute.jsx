import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.authentification.isLoggedIn);
  const token = useSelector((state) => state.authentification.token);
  
  // Si l'authentification n'a pas encore été vérifiée, on ne redirige pas tout de suite
  if (token === null && isAuthenticated) {
    return null; // Attend la mise à jour de Redux avant de prendre une décision
  }
  
  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Outlet />; // Sinon, on affiche le contenu de la route protégée
};

export default ProtectedRoute;