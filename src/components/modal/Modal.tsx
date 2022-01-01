/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import React from 'react';
import ReactModal, { Props } from 'react-modal';

import useThemedBreakpoint from '@/hooks/useThemedBreakpoint';

export type ModalVariant = 'big' | 'normal' | 'large' | 'screen';

// eslint-disable-next-line react/require-default-props
export type ModalProps = Props & { style?: ReactModal.Styles; variant?: ModalVariant };

const Modal: React.FC<ModalProps> = ({ children, variant = 'normal', style = {}, ...props }) => {
  const { isMobile } = useThemedBreakpoint();
  const getWidth = (variant: ModalVariant) => {
    switch (variant) {
      case 'big':
        return '48rem';
      case 'large':
        return '56rem';
      case 'normal':
        return '32rem';
      case 'screen':
        return '68rem';
      default:
        return '32rem';
    }
  };

  const customStyles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
    },
    content: {
      background: 'transparent',
      position: 'relative',
      border: 0,
      insetBlockStart: isMobile ? 0 : 40,
      insetBlockEnd: isMobile ? 0 : 40,
      inset: isMobile ? 0 : 40,
      padding: isMobile ? 0 : 20,
      width: '100vw',
      height: typeof window !== 'undefined' ? window.innerHeight : '',
      maxWidth: getWidth(variant),
    },
  } as ReactModal.Styles;

  return (
    <ReactModal {...props} style={{ ...customStyles, ...style }} overlayClassName="modal-overlay">
      <div
        style={{
          border: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className={clsx(
            'w-full ml-auto mr-auto p-6 bg-white drop-shadow-lg 100h max-h-screen overflow-y-scroll',
            isMobile ? '' : 'rounded-2xl'
          )}
          style={{
            maxHeight: isMobile ? 'auto' : '80vh',
            height: typeof window !== 'undefined' ? window.innerHeight : '',
          }}
        >
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

export const ModalActionWrapper: React.FC = ({ children }) => {
  return <div className="mt-4 flex justify-end">{children}</div>;
};

export default Modal;
