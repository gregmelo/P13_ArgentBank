import Hero from '../Components/hero/Hero'; // ✨ Composant affichant la bannière principale de la page d'accueil
import Features from '../Components/features/Features'; // ✨ Composant affichant les fonctionnalités principales

// 🏠 Composant représentant la page d'accueil
export default function HomePage() {
  return (
    <main>
      <Hero /> {/* Affichage du composant Hero en tête de page */}
      <Features /> {/* Affichage des fonctionnalités */}
    </main>
  );
};