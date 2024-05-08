import LanguageSystem from '../translations/languageSystem';

/**
 * Component for displaying the home page.
 *
 * This component renders the home page content.
 *
 * @returns {JSX.Element} The Home component.
 */
function Home(): JSX.Element {
  return (
    <div>
      {/* Display home page header */}
      <h2>{LanguageSystem.getTranslation('homeHeader')}</h2>
    </div>
  );
}

export default Home;
