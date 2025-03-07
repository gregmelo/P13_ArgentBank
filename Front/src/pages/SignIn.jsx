import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../Components/button/Button';
import Input from '../Components/input/Input';
import { useDispatch } from 'react-redux';
import { startLoadingProfile, setProfileSuccess, setProfileError } from '../redux/slices/userSlice';
import { loginUser, getUserData } from '../redux/services/apiService'; // Import des services API
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userLogin } from '../redux/slices/authentificationSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 🔥 Connexion avec API et récupération du token
      const response = await loginUser(email, password);
      console.log("Réponse connexion:", response);

      const { token } = response.body;

      if (!token) {
        throw new Error('Token manquant dans la réponse de connexion');
      }

      localStorage.setItem("authentificationToken", token); // 🔥 Stocker le token

      // Si "Remember Me" est coché, stocke une date d'expiration (7 jours)
      if (rememberMe) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Ajoute 7 jours
        localStorage.setItem("tokenExpiration", expirationDate.toISOString());
      } else {
        // Si non coché, supprime toute expiration existante
        localStorage.removeItem("tokenExpiration");
      }

      // Dispatch de l'action pour indiquer que l'utilisateur est connecté
      dispatch(userLogin({ token }));

      // Dispatch de l'action pour fetch user profile
      dispatch(startLoadingProfile());
      const user = await getUserData(token);
      console.log("Données utilisateur:", user);
      dispatch(setProfileSuccess(user.body));

      navigate('/profile');
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(error.message);
      dispatch(setProfileError(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="username"
            label="Username"
            className="input-wrapper"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            className="input-wrapper"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button
            type="submit"
            className="sign-in-button"
            text={loading ? 'Connection in progress...' : 'Sign In'}
          />
        </form>
        <p>
        No account? <a href="/signup">Register</a>
      </p>
      </section>
    </main>
  );
}