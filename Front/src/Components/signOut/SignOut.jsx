import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/slices/authentificationSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(userLogout());
      navigate('/', { replace: true }); // Utilise replace pour éviter un retour en arrière vers /signOut
  }, [dispatch, navigate]);

  return null; // Ne rien rendre, car la redirection est immédiate
}