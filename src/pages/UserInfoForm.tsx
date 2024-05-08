import { useEffect, useState } from 'react';
import { ApiClient } from '../api/apiClient';
import RequestStatus from '../api/requestStatusEnum';

export interface UserInfoFormData {
  name: string;
  age: number;
  married: boolean;
  dateOfBirth: string;
}

export function UserForm() {
  const [formData, setFormData] = useState<UserInfoFormData>({
    name: '',
    age: 0,
    married: false,
    dateOfBirth: '',
  });
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.INITIAL);

  useEffect(() => {
    if (status === RequestStatus.SEND_DATA) {
      setStatus(RequestStatus.SENDING_DATA);
      ApiClient.collectInfo(formData)
        .then(() => {
          setStatus(RequestStatus.DATA_SENDED);
        })
        .catch((e) => {
          setStatus(RequestStatus.ERROR_SENDING_DATA);
        });
    }
  }, [status, formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === 'married' ? e.target.checked : e.target.value,
    });
  };

  return (
    <div>
      <h1>Fill the form</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Married:
          <input
            type="checkbox"
            name="married"
            checked={formData.married}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={() => setStatus(RequestStatus.SEND_DATA)}>
          Submit
        </button>
      </form>
    </div>
  );
}
