import { createSlice } from "@reduxjs/toolkit";

/**
 * État initial du slice du profil utilisateur.
 * @type {Object}
 * @property {Object|null} user - Les informations du profil utilisateur.
 * @property {boolean} isLoading - Indique si la récupération/mise à jour des informations est en cours.
 * @property {string|null} errorMessage - Message d'erreur en cas de problème.
 */
const initialState = {
    user: null,
    isLoading: false,
    errorMessage: null,
};

/**
 * Création du slice Redux pour gérer le profil utilisateur.
 */
export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        /**
         * Action pour démarrer la récupération ou la mise à jour des informations utilisateur.
         */
        startLoadingProfile: (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        },
        /**
         * Action pour récupérer les informations de l'utilisateur avec succès.
         */
        setProfileSuccess: (state, { payload }) => {
            state.user = payload;
            state.isLoading = false;
        },
        /**
         * Action pour gérer les erreurs lors de la récupération/mise à jour des informations utilisateur.
         */
        setProfileError: (state, { payload }) => {
            state.errorMessage = payload;
            state.isLoading = false;
        },
        /**
         * Action pour mettre à jour les informations utilisateur.
         */
        modifyUserProfile: (state, { payload } ) => {
            state.user = { ...state.user, ...payload };
            // state.user = payload;
        }
    },
});

// Exporter les actions pour les utiliser dans les composants
export const {
    startLoadingProfile,
    setProfileSuccess,
    setProfileError,
    modifyUserProfile
} = userProfileSlice.actions;

export default userProfileSlice.reducer;