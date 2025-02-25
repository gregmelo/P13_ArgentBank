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

// Récupérer le token d'authentification depuis localStorage s'il existe.
const storedAuthentificationToken = localStorage.getItem('authentificationToken');

// Si un token est présent, récupérer les informations de l'utilisateur depuis l'API.
if (storedAuthentificationToken) {
    fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${storedAuthentificationToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            // Vérifie si la réponse est correcte.
            if (!response.ok) {
                throw new Error("Échec de récupération des données utilisateur");
            }
            return response.json();
        })
        .then(userData => {
            // Met à jour l'état d'authentification avec le token.
            appStore.dispatch(userLogin({ storedAuthentificationToken }));
            // Met à jour l'état du profil utilisateur avec les informations récupérées.
            appStore.dispatch({
                type: `userProfile/setProfileSuccess`,
                payload: userData,
            });
        })
        .catch(error => {
            // Si une erreur survient, déconnecte l'utilisateur et supprime le token du localStorage.
            console.error("Échec de récupération des données détaillées de l'utilisateur:", error);
            // Supprime le token du localStorage et réinitialise l'état d'authentification.
            appStore.dispatch(userLogout());
        });
}

export default appStore;