import clsx from 'clsx';
import { FieldProps } from 'formik';
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export type TextFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  onClickButton?: () => void;
  name: string;
};

type Props = FieldProps & TextFieldProps;

const TextField: React.FC<TextFieldProps> = ({ className, onClickButton, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleUnfocus = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={clsx(
        'relative flex rounded-full border w-full px-2 h-10',
        isFocused ? 'outline-1 outline outline-indigo-500' : '',
        className
      )}
    >
      <input
        onFocus={handleFocus}
        onBlur={handleUnfocus}
        className="ml-2 focus:none flex-1 bg-transparent w-full outline-none"
        {...props}
      />
      {onClickButton && (
        <button type="button" onClick={onClickButton}>
          <FiArrowRight className="w-5 h-5 text-slate-500 mr-2 hover:text-indigo-500" />
        </button>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FormikTextField: React.FC<Props> = ({ form: _, field, ...props }) => {
  return (
    <div className="mb-4">
      <TextField {...props} {...field} />
    </div>
  );
};

export default TextField;
