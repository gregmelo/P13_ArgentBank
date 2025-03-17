import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importation de l'icône FontAwesome
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importation de l'icône utilisateur
import Button from '../Components/button/Button'; // Importation du composant bouton personnalisé
import Input from '../Components/input/Input'; // Importation du composant champ de saisie personnalisé
import { useDispatch } from 'react-redux'; // Importation de la fonction useDispatch pour déclencher des actions Redux
import { startLoadingProfile, setProfileSuccess, setProfileError } from '../redux/slices/userSlice'; // Actions Redux pour la gestion du profil utilisateur
import { loginUser, getUserData } from '../redux/services/apiService'; // Import des services API pour l'authentification et récupération des données utilisateur
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation
import { useState } from 'react'; // Importation du hook useState pour gérer l'état local
import { userLogin } from '../redux/slices/authentificationSlice'; // Action Redux pour gérer l'authentification

/**
 * Composant SignIn permettant à un utilisateur de se connecter.
 * 
 * Ce composant comprend :
 * - Un formulaire de connexion avec champs email et mot de passe.
 * - Une option "Remember Me" pour mémoriser l'authentification.
 * - Une gestion des erreurs et un état de chargement.
 * - Une interaction avec Redux pour stocker les données utilisateur après connexion.
 * 
 * @returns {JSX.Element} Le composant JSX représentant la page de connexion.
 */
export default function SignIn() {
  const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions
  const navigate = useNavigate(); // Hook pour la navigation
  const [email, setEmail] = useState(""); // État pour stocker l'email de l'utilisateur
  const [password, setPassword] = useState(""); // État pour stocker le mot de passe
  const [rememberMe, setRememberMe] = useState(false); // État pour la case "Remember Me"
  const [loading, setLoading] = useState(false); // État pour suivre le chargement de la connexion
  const [error, setError] = useState(null); // État pour stocker les messages d'erreur

  /**
   * Gère la soumission du formulaire de connexion.
   * 
   * - Envoie les informations à l'API pour l'authentification.
   * - Stocke le token d'authentification en localStorage si "Remember Me" est activé.
   * - Charge les données utilisateur après connexion.
   * - Redirige vers la page de profil en cas de succès.
   * - Affiche un message d'erreur en cas d'échec.
   * 
   * @param {Event} e L'événement de soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Active l'état de chargement
    setError(''); // Réinitialise les erreurs

    try {
      // 🔥 Connexion avec l'API et récupération du token
      const response = await loginUser(email, password);

      const { token } = response.body;

      if (!token) {
        throw new Error('Token manquant dans la réponse de connexion');
      }

      localStorage.setItem("authentificationToken", token); // 🔥 Stockage du token d'authentification

      // Gestion de la persistance du token si "Remember Me" est activé
      if (rememberMe) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Ajout de 7 jours à la date actuelle
        localStorage.setItem("tokenExpiration", expirationDate.toISOString());
      } else {
        localStorage.removeItem("tokenExpiration"); // Suppression de l'expiration existante si désactivé
      }

      // Dispatch Redux pour enregistrer l'utilisateur comme connecté
      dispatch(userLogin({ token }));

      // 🔥 Chargement du profil utilisateur
      dispatch(startLoadingProfile());
      const user = await getUserData(token);
      dispatch(setProfileSuccess(user.body));

      // Redirection vers la page de profil après connexion réussie
      navigate('/profile');
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(error.message); // Stocke le message d'erreur pour affichage
      dispatch(setProfileError(error.message)); // Dispatch Redux pour signaler l'échec
    } finally {
      setLoading(false); // Désactive l'état de chargement après traitement
    }
  };

  return (
    <main className="main bg-dark"> {/* Conteneur principal avec un fond sombre */}
      <section className="sign-in-content"> {/* Section contenant le formulaire de connexion */}
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" /> {/* Icône utilisateur */}
        <h1>Sign In</h1> {/* Titre de la page */}

        <form onSubmit={handleSubmit}> {/* Formulaire de connexion */}
          {/* Champ d'entrée pour l'email */}
          <Input
            type="text"
            id="username"
            label="Username"
            className="input-wrapper"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Champ d'entrée pour le mot de passe */}
          <Input
            type="password"
            id="password"
            label="Password"
            className="input-wrapper"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Case à cocher "Remember Me" */}
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Affichage du message d'erreur en cas d'échec */}
          {error && <p className="error-message">{error}</p>}

          {/* Bouton de soumission avec état de chargement */}
          <Button
            type="submit"
            className="sign-in-button"
            text={loading ? 'Connection in progress...' : 'Sign In'}
          />
        </form>

        {/* Lien vers la page d'inscription */}
        <p>
          No account? <a href="/signup">Register</a>
        </p>
      </section>
    </main>
  );
}
