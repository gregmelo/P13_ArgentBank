const API_URL = "http://127.0.0.1:3001/api/v1";

/**
 * Effectue la connexion et retourne le token JWT.
 * @param {string} email - Email.
 * @param {string} password - Mot de passe.
 * @returns {Promise<string>} - Retourne le token JWT.
 */
export const loginUser = async (email, password) => {

    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la connexion.");
    }

    const data = await response.json();
    console.log("Données de connexion:", data);

    return data;
};

/**
 * Récupère les informations de l'utilisateur via le token JWT.
 * @param {string} token - Token JWT de l'utilisateur.
 * @returns {Promise<Object>} - Retourne les données de l'utilisateur.
 */
export const getUserData = async (token) => {
  if(!token) {
    throw new Error("Token manquant.");
  }

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données utilisateur.");
    }

    return response.json();
};

/**
 * Met à jour les informations de l'utilisateur.
 * @param {string} token - Token JWT de l'utilisateur.
 * @param {Object} userData - Données utilisateur à modifier.
 * @returns {Promise<Object>} - Retourne les données mises à jour.
 */
export const updateUserData = async (token, userData) => {
  console.log("Données utilisateur à mettre à jour:", userData);
  console.log("Token utilisateur:", token);

  if(!token) {
    throw new Error("Token manquant.");
  }

    const response = await fetch(`${API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour des données utilisateur.");
    }

    const data = await response.json();
    console.log("Données utilisateur mises à jour:", data);
    return data;
};

/**
 * Inscrit un nouvel utilisateur.
 * @param {string} email - Email de l'utilisateur.
 * @param {string} password - Mot de passe de l'utilisateur.
 * @param {string} firstName - Prénom de l'utilisateur.
 * @param {string} lastName - Nom de l'utilisateur.
 * @returns {Promise<Object>} - Réponse de l'API avec le token.
 */
export const signUpUser = async (email, password, firstName, lastName) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur lors de l’inscription");
  }

  const data = await response.json();
  console.log("Réponse signUpUser:", data);
  return data;
};
