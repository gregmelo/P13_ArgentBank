import { createSlice } from '@reduxjs/toolkit';

console.log("Token dans localStorage au chargement :", localStorage.getItem("authentificationToken"));

/**
 * État initial du slice d'authentification.
 * Récupère le token d'authentification depuis localStorage s'il est disponible, sinon l'initialise à null.
 * @type {Object}
 * @property {string|null} authentificationToken - Le token d'authentification de l'utilisateur, ou null s'il n'y en a pas.
 * @property {boolean} isLoggedIn - Indique si l'utilisateur est authentifié (true si un token est présent).
 * @property {Object|null} userData - Les informations de l'utilisateur, ou null s'il n'y en a pas.
 * @property {string|null} authError - Message d'erreur s'il y a une erreur d'authentification.
 */
const initialState = {
    token: localStorage.getItem('authentificationToken') ?? null,
    isLoggedIn: !!localStorage.getItem('authentificationToken'),
    // userData: null,
    authError: null,
};
console.log("Token initial dans localStorage :", localStorage.getItem('authentificationToken'));

/**
 * Création du slice Redux pour gérer l'authentification de l'utilisateur.
 * @type {Object}
 * @property {Function} userLogin - Action pour connecter un utilisateur.
 * @property {Function} userLogout - Action pour déconnecter un utilisateur.
 */
export const authentificationSlice = createSlice({
    name: 'authentification',
    initialState,
    reducers: {
        userLogin: (state, { payload }) => {
            const { token, userData } = payload;
            console.log('userLogin appelé - Nouveau token :', token);
            if (!token) {
              console.error('userLogin appelé avec un token invalide !', payload);
              return; // Ne rien faire si le token est manquant ou invalide
            }
            state.token = token;
            state.isLoggedIn = true;
            state.user = userData;
            localStorage.setItem('authentificationToken', token);
          },
      userLogout: (state) => {
        console.log('!!! userLogout déclenché !!!');
        state.token = null;
        state.isLoggedIn = false;
        state.user = null;
        localStorage.removeItem('authentificationToken');
        localStorage.removeItem('tokenExpiration');
        console.log('Déconnexion réussie. Token dans localStorage :', localStorage.getItem('authentificationToken'));
      },
    },
  });

// Exporter les actions du slice pour les utiliser dans les composants.
export const { userLogin, userLogout } = authentificationSlice.actions;

// Exporter le réducteur pour l'ajouter au store Redux.
export default authentificationSlice.reducer;