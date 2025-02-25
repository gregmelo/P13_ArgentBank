import PropTypes from "prop-types";

export default function Input({id, label, type, placeholder, value, onChange, className, autoComplete }) {
    return (
        <div className={className}>
        <label htmlFor={id}>{label}</label>
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
    )
}

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