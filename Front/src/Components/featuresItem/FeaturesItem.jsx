// Importation de PropTypes pour la validation des props
import PropTypes from 'prop-types';

// Définition du composant fonctionnel FeaturesItem qui prend trois props : icon, title et text
export default function FeaturesItem({ icon, title, text }) {
    return (
        // Conteneur principal avec la classe CSS "feature-item" pour le style
        <div className="feature-item">
            {/* Image de l'icône, avec une source dynamique et un texte alternatif basé sur le titre */}
            <img src={icon} alt={title} className="feature-icon"/>
            {/* Titre de l'élément affiché dans une balise h3 avec une classe spécifique */}
            <h3 className="feature-item-title">{title}</h3>
            {/* Paragraphe contenant le texte descriptif passé en prop */}
            <p>
                {text}
            </p>
        </div>
    );
};

// Définition des types attendus pour les props avec PropTypes
FeaturesItem.propTypes = {
    // icon doit être une chaîne de caractères (URL de l'image) et est requis
    icon: PropTypes.string.isRequired,
    // title doit être une chaîne de caractères et est requis
    title: PropTypes.string.isRequired,
    // text doit être une chaîne de caractères et est requis
    text: PropTypes.string.isRequired,
};