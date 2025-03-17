// Importation de PropTypes pour la validation des props
import PropTypes from "prop-types";

// Définition du composant fonctionnel Button qui prend trois props : text, onClick et className
export default function Button({ text, onClick, className }) {
  return (
    // Élément button avec une classe dynamique et un gestionnaire d'événement onClick
    <button className={className} onClick={onClick}>
      {/* Affichage du texte passé via la prop text à l'intérieur du bouton */}
      {text}
    </button>
  );
}

// Définition des types attendus pour les props avec PropTypes
Button.propTypes = {
    // text doit être une chaîne de caractères et est requis
    text: PropTypes.string.isRequired,
    // onClick est une fonction optionnelle pour gérer les clics
    onClick: PropTypes.func,
    // className est une chaîne de caractères optionnelle pour personnaliser le style
    className: PropTypes.string,
};