import React, { useState } from 'react';
import { UpdateUserInfoRequest } from '../interfaces';
import { RequestResultState } from '../components/RequestResultState';
import { ApiClient } from '../api/apiClient';
import RequestStatus from '../api/requestStatusEnum';
import LanguageSystem from '../translations/languageSystem';
import useRequestState from '../hooks/useRequestState';

// Initial form data
const initialFormData: UpdateUserInfoRequest = {
  name: '',
  age: 0,
  married: false,
  dateOfBirth: '',
};

/**
 * Component for rendering the user information form.
 *
 * This component allows users to input their information and submit it.
 *
 * @returns {JSX.Element} The UserForm component.
 */
function UserForm(): JSX.Element {
  const [formData, setFormData] =
    useState<UpdateUserInfoRequest>(initialFormData);
  const { status, data, setStatus } = useRequestState(
    RequestStatus.INITIAL,
    () => {
      return ApiClient.collectInfo(formData);
    },
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(RequestStatus.SEND_DATA);
  };

  return (
    <div>
      {/* Form header */}
      <h1>{LanguageSystem.getTranslation('fillTheFormHeader')}</h1>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <label>
          {LanguageSystem.getTranslation('userNameFormHeader')}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {/* Age input */}
        <label>
          {LanguageSystem.getTranslation('ageFormHeader')}
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        {/* Married checkbox */}
        <label>
          {LanguageSystem.getTranslation('marriedFormHeader')}
          <input
            type="checkbox"
            name="married"
            checked={formData.married}
            onChange={handleChange}
          />
        </label>
        {/* Date of birth input */}
        <label>
          {LanguageSystem.getTranslation('dateOfBirthFormHeader')}
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        {/* Submit button */}
        <button type="submit">
          {LanguageSystem.getTranslation('submitButton')}
        </button>
      </form>

      {/* Display request result state */}
      <RequestResultState
        status={status}
        data={data}
        onRetry={() => setStatus(RequestStatus.INITIAL)}
      />
    </div>
  );
}

export default UserForm;
