import { NavLink } from 'react-router-dom';
import ArgentBankLogo from '../../assets/img/argentBankLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
// import { userLogout } from '../../redux/slices/authentificationSlice';
import { useEffect } from 'react';



export default function Header() {
  const { token } = useSelector((state) => state.authentification);
  const { user } = useSelector((state) => state.userProfile);

  useEffect(() => {
    console.log('Header - Token mis à jour :', token);
  }, [token]);

  console.log('token', token);

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={ArgentBankLogo} alt="Argent Bank Logo" />
      </NavLink>
      <div>
        {token ? (
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
          <NavLink className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} className="fa fa-user-circle" />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}