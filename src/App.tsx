import NotFound from './pages/NotFound';
import Paths from './routes';
import React from 'react';
import Layout from './pages/Layout';
import { Routes, Route } from 'react-router-dom';
import CheckName from './pages/CheckName';
import UserForm from './pages/UserInfoForm';
import Home from './pages/Home';
import './styles/App.css';

/**
 * The main App component that defines the routes for the application.
 * @returns {JSX.Element} A Routes component with defined Route components.
 */
function App(): JSX.Element {
  return (
    <Routes>
      <Route path={Paths.HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={Paths.CHECK_NAME} element={<CheckName />} />
        <Route path={Paths.USER_INFO_FORM} element={<UserForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
