import React, { useEffect, useState } from 'react';
import { BaseResponse, UpdateNameRequest } from '../interfaces';
import { ApiClient } from '../api/apiClient';
import RequestStatus from '../api/requestStatusEnum';
import LanguageSystem from '../translations/languageSystem';
import { RequestResultState } from '../components/RequestResultState';

/**
 * Component for checking a name.
 *
 * This component allows users to input a name, validate it, and view the result.
 *
 * @returns {JSX.Element} The CheckName component.
 */
function CheckName(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.INITIAL);
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<BaseResponse>();

  useEffect(() => {
    // Send data to API for validation when status changes to SEND_DATA
    if (status === RequestStatus.SEND_DATA) {
      setStatus(RequestStatus.SENDING_DATA);
      const requestBody: UpdateNameRequest = { name: value };
      ApiClient.validateName(requestBody)
        .then((response: BaseResponse | null) => {
          if (response) {
            setStatus(RequestStatus.DATA_SENDED);
            setData(response);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          setStatus(RequestStatus.ERROR_SENDING_DATA);
        });
    }
  }, [status, value]);

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
