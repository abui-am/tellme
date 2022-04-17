import { Field, Form, Formik } from 'formik';
import React from 'react';

import { usePostLoginMutation } from '@/services/auth';
import { LoginPayload } from '@/typings/auth';

import { Button } from '../Button';
import { FormikTextField } from '../field/TextField';

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [login] = usePostLoginMutation();
  const handleSubmit = async (values: LoginPayload) => {
    const res = await login(values);
    if ('data' in res) {
      localStorage.setItem('auth', JSON.stringify(res.data));
    }
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        <Field name="email" placeholder="Masukan email" component={FormikTextField} />
        <Field name="password" type="password" placeholder="Masukan password" component={FormikTextField} />
        <Button type="submit">Login</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
