import clsx from 'clsx';
import React from 'react';

const TextField: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any>> = ({
  className,
  ...props
}) => {
  return (
    <input {...props} className={clsx('rounded-full focus:outline-indigo-500 border w-full px-2 h-10', className)} />
  );
};

export default TextField;
