import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';

import { Button } from '@/components/Button';
import TextField from '@/components/field/TextField';
import LoginForm from '@/components/form/LoginForm';
import { authClient } from '@/firebase/clientApp';
import { usePostSignUpWithGoogleMutation } from '@/services/auth';
const IndexPage = () => {
  const [credential, setCredential] = useState<{ idToken: string; refreshToken: string } | null>(null);
  const [signUpWithGoogle] = usePostSignUpWithGoogleMutation();
  const [username, setUsername] = useState('');

  const signInWithFirebase = async () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(authClient, googleProvider)
      .then(async (res) => {
        const idToken = await res?.user?.getIdToken();
        const { refreshToken } = res.user;

        setCredential({
          refreshToken,
          idToken,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const signInToken = async () => {
    if (credential) {
      signUpWithGoogle({
        idToken: credential.idToken,
        refreshToken: credential.refreshToken,
        username,
      });
    }
  };

  return (
    <div>
      {credential ? (
        <>
          <TextField name="username" onChange={(e) => setUsername(e.target.value)} />
          <Button onClick={signInToken}>Login</Button>
        </>
      ) : (
        <>
          <LoginForm />
          <Button onClick={signInWithFirebase}>Sign In</Button>
        </>
      )}
    </div>
  );
};

export default IndexPage;
