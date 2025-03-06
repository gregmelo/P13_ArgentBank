import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignOut from './Components/signOut/SignOut';
import ProtectedRoute from './Components/protectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from './redux/slices/authentificationSlice';


// Ajoute ceci dans un fichier utilitaire ou dans ton `index.js`
window.addEventListener('storage', (event) => {
  console.log('Modification de localStorage détectée :', event.key, event.oldValue, event.newValue);
});

// Ou, pour un débogage manuel, surcharge temporairement setItem et removeItem :
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  console.log(`localStorage.setItem appelé - Clé: ${key}, Valeur: ${value}`);
  originalSetItem.apply(this, [key, value]);
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function (key) {
  console.log(`localStorage.removeItem appelé - Clé: ${key}`);
  originalRemoveItem.apply(this, [key]);
};


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      const token = localStorage.getItem("authentificationToken");
      if (token) {
          dispatch(userLogin({ token }));
      }
  }, [dispatch]);


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signOut" element={<SignOut />} />
          <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};