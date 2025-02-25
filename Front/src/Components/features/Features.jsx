import data from '../../data/data'; // Importez directement `features`
import FeaturesItem from '../featuresItem/FeaturesItem';


export default function Features() {
  const { features } = data;
  return (
    <section className="features">
    <h2 className="sr-only">Features</h2>
        {features.map((feat, index) => (
            <FeaturesItem
                key={index}
                icon={feat.icon}
                title={feat.title}
                text={feat.text}
            />
        ))}
    </section>
  );
};
