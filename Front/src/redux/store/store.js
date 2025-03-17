import { configureStore } from '@reduxjs/toolkit';
import authentificationReducer, { userLogin, userLogout } from '../slices/authentificationSlice';
import profileReducer from '../slices/userSlice';

/**
 * Création du store Redux.
 * Le store est configuré avec les réducteurs pour gérer l'état d'authentification et le profil utilisateur.
 * @type {Object}
 */

const appStore = configureStore({
    reducer: {
        authentification: authentificationReducer,
        userProfile: profileReducer,
    },
});

// Récupérer le token d'authentification et la date d'expiration du token depuis localStorage s'il existe.
const storedAuthentificationToken = localStorage.getItem('authentificationToken');
const tokenExpiration = localStorage.getItem('tokenExpiration');

// Vérifie si le token est valide (présent et non expiré)
if (storedAuthentificationToken) {
    if (tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      const now = new Date();
      if (now > expirationDate) {
        // Token expiré : déconnecte l'utilisateur
        appStore.dispatch(userLogout());
      } else {
        // Token valide : récupère les données utilisateur
        fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedAuthentificationToken}`,
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error("Échec de récupération des données utilisateur");
            }
            return response.json();
          })
          .then(userData => {
            appStore.dispatch(userLogin({ token: storedAuthentificationToken }));
            appStore.dispatch({
              type: `userProfile/setProfileSuccess`,
              payload: userData.body,
            });
          })
          .catch(error => {
            console.error("Échec de récupération des données détaillées de l'utilisateur:", error);
            appStore.dispatch(userLogout());
          });
      }
    } else {
      // Pas d'expiration : token valide uniquement pour la session, on le garde
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedAuthentificationToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Échec de récupération des données utilisateur");
          }
          return response.json();
        })
        .then(userData => {
          appStore.dispatch(userLogin({ token: storedAuthentificationToken }));
          appStore.dispatch({
            type: `userProfile/setProfileSuccess`,
            payload: userData.body,
          });
        })
        .catch(error => {
          console.error("Échec de récupération des données détaillées de l'utilisateur:", error);
          appStore.dispatch(userLogout());
        });
    }
  }

export default appStore;