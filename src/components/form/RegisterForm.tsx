import { Field, Form, Formik } from 'formik';
import React from 'react';

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
  const handleSubmit = async (values: SignUpPayload) => {
    await signUp(values);
  };
  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form>
        <Field name="displayName" placeholder="Masukan Nama" component={FormikTextField} />
        <Field name="username" placeholder="Masukan username" component={FormikTextField} />
        <Field name="email" placeholder="Masukan email" component={FormikTextField} />
        <Field name="password" type="password" placeholder="Masukan password" component={FormikTextField} />
        <Field name="confirmPassword" placeholder="Konfirmasi password" component={FormikTextField} />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
