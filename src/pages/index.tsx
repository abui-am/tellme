import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import TextField from '@/components/field/TextField';
import { usePutProfileByIdMutation } from '@/services/profile';
import { useGetMyselfQuery } from '@/services/secured/profile';

const IndexPage = () => {
  const [username, setUsername] = useState('');
  const [editProfile] = usePutProfileByIdMutation();
  const { data } = useGetMyselfQuery('');
  console.log(data, 'ASD');

  const handleSubmit = async () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);

      editProfile({
        id: auth.user?.uid,
        data: {
          username,
        },
      });
    }
  };

  if (!data?.username) {
    return (
      <div>
        <TextField name="username" onChange={(e: any) => setUsername(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    );
  }
  return <div />;
};

export default IndexPage;
