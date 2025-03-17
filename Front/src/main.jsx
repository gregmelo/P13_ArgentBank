import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './App.jsx';
import './scss/index.scss';

/**
 * Point d'entrée principal de l'application React.
 * Ce fichier monte l'application dans le DOM et l'encapsule avec Redux et React Strict Mode.
 */

// Sélectionne l'élément root du DOM et initialise l'application React
createRoot(document.getElementById('root')).render(
  /**
   * Le composant `Provider` permet à l'application d'accéder au store Redux.
   * Le mode `StrictMode` aide à détecter des erreurs et des comportements non sécurisés en développement.
   */
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
);
