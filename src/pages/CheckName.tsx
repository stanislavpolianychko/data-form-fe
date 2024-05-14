import React, { useState } from 'react';
import { RequestResultState } from '../components/RequestResultState';
import { UpdateNameRequest } from '../interfaces';
import { ApiClient } from '../api/apiClient';
import RequestStatus from '../api/requestStatusEnum';
import LanguageSystem from '../translations/languageSystem';
import useRequestState from '../hooks/useRequestState';

/**
 * Component for checking a name.
 *
 * This component allows users to input a name, validate it, and view the result.
 *
 * @returns {JSX.Element} The CheckName component.
 */
function CheckName(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const { status, data, setStatus } = useRequestState(
    RequestStatus.INITIAL,
    () => {
      const requestBody: UpdateNameRequest = { name: value };
      return ApiClient.validateName(requestBody);
    },
  );

  return (
    <>
      {/* Render input field and button for sending data */}
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => setStatus(RequestStatus.SEND_DATA)}>
          {LanguageSystem.getTranslation('validateBtn')}
        </button>
      </div>
      {/* Display request result state */}
      <RequestResultState
        status={status}
        data={data}
        onRetry={() => setStatus(RequestStatus.INITIAL)}
      />
    </>
  );
}

export default CheckName;
