import React from 'react';

import LayoutMain from '@/components/container/LayoutMain';
import RegisterForm from '@/components/form/RegisterForm';
const SignUp = () => {
  return (
    <LayoutMain id="signup" className="pt-16">
      <RegisterForm />
    </LayoutMain>
  );
};

export default SignUp;
