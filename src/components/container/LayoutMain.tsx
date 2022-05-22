import clsx from 'clsx';
import React from 'react';

interface LayoutMainProps {
  id: string;
}

const LayoutMain: React.FC<
  LayoutMainProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ id, children, className, ...props }) => {
  return (
    <section id={id} className={clsx('max-w-screen-lg ml-auto mr-auto p-4', className)} {...props}>
      {children}
    </section>
  );
};

export default LayoutMain;
