import { useState, useEffect } from 'react';
import { BaseResponse } from '../interfaces';
import RequestStatus from '../api/requestStatusEnum';
import RequestFunction from '../types/requestFunction';

const useRequestState = (
  initialState: RequestStatus,
  requestFunction: RequestFunction,
) => {
  const [status, setStatus] = useState<RequestStatus>(initialState);
  const [data, setData] = useState<BaseResponse>();

  useEffect(() => {
    const fetchData = async () => {
      if (status !== RequestStatus.SEND_DATA) {
        return;
      }

      setStatus(RequestStatus.SENDING_DATA);

      try {
        const response = await requestFunction();

        if (!response) {
          return;
        }

        setStatus(RequestStatus.DATA_SENDED);
        setData(response);
      } catch {
        setStatus(RequestStatus.ERROR_SENDING_DATA);
      }
    };

    fetchData().then(() => console.log('Data fetched'));
  }, [status, requestFunction]);

  return { status, data, setStatus };
};

export default useRequestState;
