import PropTypes from "prop-types";

// Composant Input - Champ de saisie réutilisable
export default function Input({ id, label, type, placeholder, value, onChange, className, autoComplete }) {
    return (
        <div className={className}>
            {/* Label associé à l'input */}
            <label htmlFor={id}>{label}</label>
            {/* Champ de saisie */}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
                autoComplete={autoComplete}
            />
        </div>
    );
}

// Définition des types attendus pour les props
Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
};
