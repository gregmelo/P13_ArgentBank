import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
  );
};