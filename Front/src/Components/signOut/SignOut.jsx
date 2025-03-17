import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/authentificationSlice";
import { useNavigate } from "react-router-dom";

// Composant Logout - Déconnecte l'utilisateur et le redirige vers l'accueil
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      // Déclenche l'action de déconnexion dans Redux
      dispatch(userLogout());
      // Redirige immédiatement vers la page d'accueil sans possibilité de revenir en arrière
      navigate('/', { replace: true });
  }, [dispatch, navigate]);

  // Ne retourne rien, car la redirection est immédiate
  return null;
}
