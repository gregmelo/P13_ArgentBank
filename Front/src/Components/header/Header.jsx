// Importation des modules nécessaires
import { NavLink } from 'react-router-dom'; // Gestion de la navigation
import ArgentBankLogo from '../../assets/img/argentBankLogo.png'; // Logo de l'application
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Composant icône
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Icônes spécifiques
import { useSelector } from 'react-redux'; // Accès au store Redux
import { useEffect } from 'react'; // Gestion des effets secondaires

// Composant Header
export default function Header() {
  // Récupération du token et des informations utilisateur depuis Redux
  const { token } = useSelector((state) => state.authentification);
  const { user } = useSelector((state) => state.userProfile);

  // Surveillance des changements du token
  useEffect(() => {
    console.log('Header - Token mis à jour :', token);
  }, [token]);


  return (
    <nav className="main-nav">
      {/* Logo avec lien vers l'accueil */}
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={ArgentBankLogo} alt="Argent Bank Logo" />
      </NavLink>
      {/* Menu de navigation */}
      <div>
        {token ? (
          // Affichage du profil et de la déconnexion si connecté
          <div className="main-nav-items">
            <NavLink className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
              {user?.firstName}
            </NavLink>
            <NavLink className="main-nav-item" to="/signOut">
              <FontAwesomeIcon icon={faSignOutAlt} className="fa fa-sign-out" /> Sign Out
            </NavLink>
          </div>
        ) : (
          // Lien vers la connexion si non connecté
          <NavLink className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
