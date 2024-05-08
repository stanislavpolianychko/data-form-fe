import React from 'react';
import LanguageSystem from '../translations/languageSystem';

/**
 * Component for displaying the not found page.
 *
 * This component renders a message indicating that the page is not found.
 *
 * @returns {JSX.Element} The NotFound component.
 */

export function NotFound(): JSX.Element {
  return (
    <div>
      {/* Display 404 error message */}
      <h1>{LanguageSystem.getTranslation('404Error')}</h1>
      <p>{LanguageSystem.getTranslation('404ErrorMessage')}</p>
    </div>
  );
}

export default NotFound;
