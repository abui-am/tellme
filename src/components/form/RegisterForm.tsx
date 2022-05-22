import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import handleResponse from '@/helpers/handleResponse';
import { usePostSignUpMutation } from '@/services/auth';
import { SignUpPayload } from '@/typings/auth';

import { Button } from '../Button';
import { FormikTextField } from '../field/TextField';

const initialValues: SignUpPayload = {
  username: '',
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterForm = () => {
  const [signUp] = usePostSignUpMutation();
  const router = useRouter();
  const handleSubmit = async (values: SignUpPayload) => {
    const data = await signUp(values);
    handleResponse(data, {
      onSuccess: (res) => {
        localStorage.setItem('auth', JSON.stringify(res));
        router.push('/');
      },
    });
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        <h1 className="text-4xl mb-3 font-bold">
          Daftar <br />
          Sekarang Juga
        </h1>
        <span className="text-base mb-9 block">Masuk untuk membuat board-mu sendiri!</span>

        <Field name="displayName" placeholder="Masukan nama" component={FormikTextField} />
        <Field name="username" placeholder="Masukan username" component={FormikTextField} />
        <Field name="email" placeholder="Masukan email" component={FormikTextField} />
        <Field name="password" type="password" placeholder="Masukan password" component={FormikTextField} />
        <Field
          name="confirmPassword"
          type="password"
          placeholder="Konfirmasi password"
          className="mb-12"
          component={FormikTextField}
        />
        <Button type="submit">Sign Up</Button>
        <span className="mt-8 text-center w-full block">
          Sudah punya akun?{' '}
          <Link href="/auth/login">
            <a className="font-bold">Masuk di sini!</a>
          </Link>
        </span>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
