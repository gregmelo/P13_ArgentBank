import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.authentification.isLoggedIn);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated); // Debug

  // Si l'utilisateur n'est pas connecté, ont le redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si l'utilisateur est connecté, ont affiche la route demandée
  return <Outlet />;
};

export default ProtectedRoute;