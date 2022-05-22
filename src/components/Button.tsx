import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  variant?: 'default' | 'outlined';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ className, children, variant = 'default', ...props }) => {
  const styles = {
    default: 'w-full h-10 flex justify-center text-white bg-gray-900 rounded-full px-3 pt-2 font-bold',
    outlined: 'w-full h-10 flex justify-center text-gray-900 border-gray-900 border rounded-full px-3 pt-2 font-bold',
  };
  return (
    <button type="button" {...props} className={clsx(styles[variant], className)}>
      {children}
    </button>
  );
};
