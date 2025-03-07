import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '../Components/button/Button';
import Input from '../Components/input/Input';
import { useDispatch } from 'react-redux';
import { startLoadingProfile, setProfileSuccess, setProfileError } from '../redux/slices/userSlice';
import { signUpUser, getUserData, loginUser } from '../redux/services/apiService'; // Nouvelle fonction à créer
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { userLogin } from '../redux/slices/authentificationSlice';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation simple des champs
    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim()) {
      setError('Tous les champs doivent être remplis.');
      setLoading(false);
      return;
    }

    try {
        // Inscription de l'utilisateur
        const signUpResponse = await signUpUser(email, password, firstName, lastName);
        console.log("Réponse inscription:", signUpResponse);

        // Connexion automatique avec les mêmes identifiants
        const loginResponse = await loginUser(email, password);
        console.log("Réponse connexion après inscription:", loginResponse);

        const { token } = loginResponse.body;

      if (!token) {
        throw new Error('Token manquant dans la réponse d’inscription');
      }

      // Stocke le token dans localStorage
      localStorage.setItem("authentificationToken", token);

      // Dispatch de l'action pour connecter l'utilisateur
      dispatch(userLogin({ token }));

      // Récupère les données utilisateur
      dispatch(startLoadingProfile());
      const user = await getUserData(token);
      console.log("Données utilisateur:", user);
      dispatch(setProfileSuccess(user.body));

      navigate('/profile');
    } catch (error) {
      console.error("Erreur d’inscription:", error);
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            id="email"
            label="Email"
            className="input-wrapper"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            id="password"
            label="Password"
            className="input-wrapper"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="text"
            id="firstname"
            label="First Name"
            className="input-wrapper"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            id="lastname"
            label="Last Name"
            className="input-wrapper"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <Button
            type="submit"
            className="sign-in-button"
            text={loading ? 'Registration in progress...' : 'Sign Up'}
          />
        </form>
        <p>
        Already have an account? <a href="/login">Log in</a>
        </p>
      </section>
    </main>
  );
}