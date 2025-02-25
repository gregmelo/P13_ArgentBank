import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <main className="main">
        <div className="notfound">
          <h1>404</h1>
          <h2>Oups! La page que vous demandez n&apos;existe pas.</h2>
          <Link to="/">Retourner sur la page d’accueil</Link>
        </div>
      </main>
    </>
  )
}