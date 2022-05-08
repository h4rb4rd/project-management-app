import React, { ReactNode } from 'react';

import cl from './Modal.module.scss';

interface ModalProps {
  isActive: boolean;
  close: () => void;
  children: ReactNode;
}

const Modal = ({ isActive, close, children }: ModalProps) => {
  if (!isActive) return null;

  return (
    <div className={cl.modal} onClick={close}>
      <div className={cl.content} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={cl.close} onClick={close}>
          &#10006;
        </button>
      </div>
    </div>
  );
};

export default Modal;
