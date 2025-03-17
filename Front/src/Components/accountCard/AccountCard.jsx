// Importation de PropTypes pour la validation des props
import PropTypes from "prop-types";
// Importation du composant Button depuis un fichier relatif
import Button from "../button/Button";

// Définition du composant fonctionnel AccountCard qui prend trois props : title, amount et description
export default function AccountCard({ title, amount, description }) {
    return (
        // Section principale du composant avec la classe CSS "account"
        <section className="account">
            {/* Première div pour regrouper le titre, le montant et la description */}
            <div className="account-content-wrapper">
                {/* Titre du compte affiché dans une balise h3 */}
                <h3 className="account-title">{title}</h3>
                {/* Montant du compte affiché avec un symbole $ devant */}
                <p className="account-amount">${amount}</p>
                {/* Description du montant (ex : type de compte ou solde) */}
                <p className="account-amount-description">{description}</p>
            </div>
            {/* Deuxième div pour le bouton d'appel à l'action (CTA) */}
            <div className="account-content-wrapper cta">
                {/* Utilisation du composant Button avec un texte et une classe personnalisés */}
                <Button text="View transactions" className="transaction-button" />
            </div>
        </section>
    );
};

// Définition des types attendus pour les props avec PropTypes
AccountCard.propTypes = {
    // title doit être une chaîne de caractères et est requis
    title: PropTypes.string.isRequired,
    // amount doit être un nombre et est requis
    amount: PropTypes.number.isRequired,
    // description doit être une chaîne de caractères et est requis
    description: PropTypes.string.isRequired,
};