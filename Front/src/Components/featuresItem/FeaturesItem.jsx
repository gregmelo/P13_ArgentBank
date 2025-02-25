import PropTypes from 'prop-types';

export default function FeaturesItem({ icon, title, text }) {
    return (
        <div className="feature-item">
                <img src={icon} alt={title} className="feature-icon"/>
                <h3 className="feature-item-title">{title}</h3>
                <p>
                    {text}
                </p>
        </div>
    );
};

FeaturesItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};