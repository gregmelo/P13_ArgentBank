import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function SignIn() {
    const handleSubmit = (event) => {
      event.preventDefault(); 
      
      console.log("Formulaire soumis !");
    };
  
    return (
      <main className="main bg-dark">
        <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} className="sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    );
  }