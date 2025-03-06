import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.authentification.isLoggedIn);
  const storedToken = localStorage.getItem('authentificationToken');

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'storedToken:', storedToken);

  if (!isAuthenticated && !storedToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
