import { NavLink, useNavigate } from 'react-router-dom';
import ArgentBankLogo from '../../assets/img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../redux/slices/authentificationSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authentification);
  const { user } = useSelector((state) => state.userProfile);

  const handleLogout = () => {
    console.log('Déconnexion déclenchée'); // Debug 
    dispatch(userLogout()); // Déconnecte l'utilisateur
  
    setTimeout(() => {
      console.log('Redirection vers /'); // Debug
      navigate('/'); // Redirige vers la page d'accueil après la mise à jour Redux
    }, 0);
  };
  

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={ArgentBankLogo}
          alt="Argent Bank Logo"
        />
      </NavLink>
      <div>
        {token ? (
          <div className='main-nav-items'>
            <NavLink className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
              {user?.firstName}
            </NavLink>
            <button className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="fa fa-sign-out" /> Sign Out
            </button>
          </div>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
