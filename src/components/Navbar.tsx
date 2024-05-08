import { Link } from 'react-router-dom';
import Paths from '../routes';
import LanguageSystem from '../translations/languageSystem';

/**
 * Navbar component displays navigation links.
 *
 * @returns {JSX.Element} The Navbar component.
 */
function Navbar(): JSX.Element {
  return (
    <nav>
      <ul>
        {/* Navigation link for the home page */}
        <li>
          <Link to={Paths.HOME}>{LanguageSystem.getTranslation('homeHeader')}</Link>
        </li>
        {/* Navigation link for checking name */}
        <li>
          <Link to={Paths.CHECK_NAME}>{LanguageSystem.getTranslation('checkNameTabName')}</Link>
        </li>
        {/* Navigation link for user information form */}
        <li>
          <Link to={Paths.USER_INFO_FORM}>{LanguageSystem.getTranslation('userInfoFormTabName')}</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
