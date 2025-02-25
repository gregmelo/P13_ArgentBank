import { createSlice } from '@reduxjs/toolkit';

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
    token: localStorage.getItem('authentificationToken') || null,
    isLoggedIn: !!localStorage.getItem('authentificationToken'),
    // userData: null,
    authError: null,
};

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
        /**
         * Connecte un utilisateur en mettant à jour l'état avec le token et les informations de l'utilisateur.
         * @param {Object} state - L'état actuel du slice.
         * @param {Object} action - L'action contenant le payload.
         * @param {Object} action.payload - Les données de connexion.
         * @param {string} action.payload.token - Le token d'authentification de l'utilisateur.
         * @param {Object} action.payload.user - Les informations de l'utilisateur.
         */
        userLogin: (state, { payload }) => {
            const { token, userData } = payload;
            state.token = token;
            state.isLoggedIn = true;
            state.user = userData;
            localStorage.setItem('authentificationToken', token);
        },
        /**
         * Déconnecte un utilisateur en réinitialisant l'état et en supprimant le token de localStorage.
         * @param {Object} state - L'état actuel du slice.
         */
        userLogout: (state) => {
            console.log('Déconnexion en cours...'); // Debug
            state.token = null;
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('authentificationToken');
            console.log('Déconnexion réussie. État actuel :', state); // Debug
        },
    },
});

// Exporter les actions du slice pour les utiliser dans les composants.
export const { userLogin, userLogout } = authentificationSlice.actions;

// Exporter le réducteur pour l'ajouter au store Redux.
export default authentificationSlice.reducer;