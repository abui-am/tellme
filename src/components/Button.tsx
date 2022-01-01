import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'w-full h-10 flex justify-center text-white bg-indigo-500 rounded-full px-3 pt-2 font-bold',
        className
      )}
    >
      {children}
    </button>
  );
};
