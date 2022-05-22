import React, { useState } from 'react';

import handleResponse from '@/helpers/handleResponse';
import { usePutProfileByIdMutation } from '@/services/secured/profile';

import { Button } from '../Button';
import TextField from '../field/TextField';

type UsernameFormProps = {
  onSubmit: () => void;
};

const UsernameForm: React.FC<UsernameFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [editProfile] = usePutProfileByIdMutation();
  const handleSubmit = async () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);

      const data = await editProfile({
        id: auth.user?.uid,
        data: {
          username,
        },
      });

      handleResponse(data, {
        onSuccess: () => {
          onSubmit();
        },
        onError: () => {},
      });
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-3 font-bold">
        Satu <br />
        Langkah Lagi
      </h1>
      <span className="text-base mb-9 block">Masukan username yang ingin kamu pakai</span>
      <TextField
        name="username"
        className="mb-8"
        placeholder="Masukan username"
        onChange={(e: any) => setUsername(e.target.value)}
      />
      <Button disabled={!username} onClick={handleSubmit}>
        Ajukan
      </Button>
    </div>
  );
};

export default UsernameForm;
