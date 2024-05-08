import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * Layout component for rendering the application layout.
 *
 * This component includes the Navbar component and renders the child routes.
 *
 * @returns {JSX.Element} The Layout component.
 */
function Layout(): JSX.Element {
  return (
    <div>
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
