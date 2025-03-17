import Header from '../Components/header/Header'; // Importation du composant Header (l'en-tête de la page)
import Footer from '../Components/footer/Footer'; // Importation du composant Footer (le pied de page)
import { Outlet } from 'react-router-dom' // Importation de l'Outlet de React Router, utilisé pour afficher le contenu des routes dynamiques

/**
 * Composant de mise en page principal.
 * 
 * Ce composant sert de structure générale pour l'application, 
 * comprenant un en-tête, un contenu principal (géré via React Router `Outlet`), 
 * et un pied de page.
 * 
 * @returns {JSX.Element} Le composant JSX représentant la mise en page.
 */
export default function Layout() {
  return (
    <>
      {/* Affichage du composant Header pour l'en-tête de la page */}
      <Header/>
      
      {/* L'Outlet rend le contenu spécifique à chaque route */}
      <Outlet/>
      
      {/* Affichage du composant Footer pour le pied de page */}
      <Footer/>
    </>
  )
}