import React from 'react';
import { BaseResponse } from '../interfaces';
import RequestStatus from '../api/requestStatusEnum';
import LanguageSystem from '../translations/languageSystem';

/**
 * Props for the RequestResultState component.
 */
interface RequestResultStateProps {
  status: RequestStatus;
  data: BaseResponse | undefined;
  onRetry: () => void;
}

/**
 * Component to display the state of a request.
 *
 * This component renders different messages based on the status of the request.
 *
 * @param {RequestResultStateProps} props - The props for the component.
 * @returns {JSX.Element} The RequestResultState component.
 */
export const RequestResultState: React.FC<RequestResultStateProps> = ({ status, data, onRetry }: RequestResultStateProps): JSX.Element => {
  return (
    <>
      {/* Display error message and retry button */}
      {status === RequestStatus.ERROR_SENDING_DATA && (
        <div className="request-result-state">
          <h1>{LanguageSystem.getTranslation("requestStatusErrorSendingData")}</h1>
          <button onClick={onRetry}>{LanguageSystem.getTranslation("buttonSendAnotherRequest")}</button>
        </div>
      )}

      {/* Display sending in progress message */}
      {(status === RequestStatus.SEND_DATA || status === RequestStatus.SENDING_DATA) && (
        <div className="request-result-state">
          <h1>{LanguageSystem.getTranslation("requestStatusSendingInProgress")}</h1>
        </div>
      )}

      {/* Display validation success or failure message */}
      {status === RequestStatus.DATA_SENDED && (
        <div className="request-result-state">
          {data?.success === true && <h1>{LanguageSystem.getTranslation("requestStatusValidationSuccess")}</h1>}
          {data?.success === false && <h1>{LanguageSystem.getTranslation("requestStatusValidationFailed")}</h1>}
        </div>
      )}
    </>
  );
};
