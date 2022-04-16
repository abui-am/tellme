import clsx from 'clsx';
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

const TextField: React.FC<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & { onClickButton?: () => void }
> = ({ className, onClickButton = () => {}, ...props }) => {
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
      <button type="button" onClick={onClickButton}>
        <FiArrowRight className="w-5 h-5 text-slate-500 mr-2 hover:text-indigo-500" />
      </button>
    </div>
  );
};

export default TextField;
