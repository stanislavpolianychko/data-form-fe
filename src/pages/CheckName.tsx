import { useEffect, useState } from 'react';
import { BaseResponse } from '../interfaces';
import { ApiClient } from '../api/apiClient';
import RequestStatus from '../api/requestStatusEnum';

export function CheckName() {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.INITIAL);
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<BaseResponse>();

  useEffect(() => {
    if (status === RequestStatus.SEND_DATA) {
      setStatus(RequestStatus.SENDING_DATA);
      ApiClient.validateName(value)
        .then((response: BaseResponse | null) => {
          if (response) {
            setStatus(RequestStatus.DATA_SENDED);
            setData(response);
          } else {
            throw new Error();
          }
        })
        .catch((e) => {
          setStatus(RequestStatus.ERROR_SENDING_DATA);
        });
    }
  }, [status, value]);

  if (status === RequestStatus.ERROR_SENDING_DATA) {
    return (
      <div>
        <h1>ERROR SENDING DATA</h1>
        <button onClick={() => setStatus(RequestStatus.INITIAL)}>RIPROVA</button>
      </div>
    );
  }

  if (status === RequestStatus.SEND_DATA || status === RequestStatus.SENDING_DATA) {
    return (
      <div>
        <h1>SENDING IN PROGRESS</h1>
        <button onClick={() => setStatus(RequestStatus.INITIAL)}>CANCEL</button>
      </div>
    );
  }

  if (status === RequestStatus.DATA_SENDED) {
    return (
      <div>
        {data?.success === true && <h1>DATA SENT VALID</h1>}
        {data?.success === false && <h1>DATA SENT INVALID</h1>}
        <button onClick={() => setStatus(RequestStatus.INITIAL)}>SEND ANOTHER VALUE</button>
      </div>
    );
  }

  return (
    <div>
      <h1>INSERT NAME</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button onClick={() => setStatus(RequestStatus.SEND_DATA)}>VALIDATE</button>
    </div>
  );
}
