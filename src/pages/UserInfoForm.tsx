import { useEffect, useState } from 'react';

interface FormData {
    name: string;
    age: number;
    married: boolean;
    dateOfBirth: string;
}

export function UserForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: 0,
        married: false,
        dateOfBirth: '',
    });
    const [status, setStatus] = useState<'INITIAL' | 'SEND_DATA' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>('INITIAL');

    useEffect(() => {
        if (status === 'SEND_DATA') {
            setStatus('SENDING_DATA');
            fetch('http://localhost:3001/info/validate-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((rawResponse) => {
                    if ([200, 201].includes(rawResponse.status)) {
                        return rawResponse.json();
                    } else {
                        throw new Error();
                    }
                })
                .then((response) => {
                    setStatus('DATA_SENDED');
                })
                .catch((e) => {
                    setStatus('ERROR_SENDING_DATA');
                });
        }
    }, [status, formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === 'married' ? e.target.checked : e.target.value,
        });
    };

    return (
        <div>
            <h1>Fill the form</h1>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <label>
                    Married:
                    <input type="checkbox" name="married" checked={formData.married} onChange={handleChange} />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                </label>
                <button type="button" onClick={() => setStatus('SEND_DATA')}>
                    Submit
                </button>
            </form>
        </div>
    );
}