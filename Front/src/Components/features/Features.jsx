// Importation des données depuis un fichier local, incluant directement la propriété `features`
import data from '../../data/data'; 
// Importation du composant FeaturesItem depuis un fichier relatif
import FeaturesItem from '../featuresItem/FeaturesItem';

// Définition du composant fonctionnel Features sans props explicites
export default function Features() {
  // Extraction de la propriété `features` depuis l'objet `data` importé
  const { features } = data;
  return (
    // Section principale avec la classe CSS "features" pour styliser le conteneur
    <section className="features">
      {/* Titre de niveau 2 masqué visuellement (screen reader only) pour l'accessibilité */}
      <h2 className="sr-only">Features</h2>
      {/* Mapping sur le tableau `features` pour générer un FeaturesItem par élément */}
      {features.map((feat, index) => (
        // Appel du composant FeaturesItem avec des props spécifiques pour chaque élément
        <FeaturesItem
          // Utilisation de l'index comme clé unique pour chaque élément dans la liste
          key={index}
          // Passage de l'icône définie dans les données
          icon={feat.icon}
          // Passage du titre défini dans les données
          title={feat.title}
          // Passage du texte descriptif défini dans les données
          text={feat.text}
        />
      ))}
    </section>
  );
};