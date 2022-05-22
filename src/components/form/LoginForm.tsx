import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { FormikTextField } from '@/components/field/TextField';
import { authClient } from '@/firebase/clientApp';
import handleResponse from '@/helpers/handleResponse';
import { usePostLoginMutation, usePostSignUpWithGoogleMutation } from '@/services/auth';
import { LoginPayload } from '@/typings/auth';

import { Button } from '../Button';

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [login] = usePostLoginMutation();
  const [getProfile] = usePostSignUpWithGoogleMutation();

  const router = useRouter();
  const handleSubmit = async (values: LoginPayload) => {
    const res = await login(values);
    if ('data' in res) {
      localStorage.setItem('auth', JSON.stringify(res.data));
      router.push('/');
    }
  };

  const signInWithFirebase = async () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(authClient, googleProvider)
      .then(async (res) => {
        const idToken = await res?.user?.getIdToken();
        const { refreshToken } = res.user;
        const data = await getProfile({ idToken, refreshToken });
        handleResponse(data, {
          onSuccess: (data) => {
            localStorage.setItem('auth', JSON.stringify(data));
            router.push('/');
          },
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        <h1 className="text-4xl mb-3 font-bold">
          Masuk <br />
          Sekarang Juga
        </h1>
        <span className="text-base mb-9 block">Masuk untuk membuat board-mu sendiri!</span>
        <Field name="email" placeholder="Masukan email" component={FormikTextField} />
        <Field
          name="password"
          type="password"
          placeholder="Masukan password"
          component={FormikTextField}
          className="mb-12"
        />
        <Button type="submit">Login</Button>

        <Button onClick={signInWithFirebase} variant="outlined" className="mt-4" type="button">
          Masuk menggunakan Google
        </Button>

        <span className="mt-8 text-center w-full block">
          Tidak punya akun?{' '}
          <Link href="/auth/sign-up">
            <a className="font-bold">Daftar di sini!</a>
          </Link>
        </span>
      </Form>
    </Formik>
  );
};

export default LoginForm;
