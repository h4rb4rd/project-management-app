import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Modal from '../components/Modal';

const root = document.getElementById('modal');

interface ModalPortalProps {
  isActive: boolean;
  close: () => void;
  children: ReactNode;
}
const ModalPortal = ({ isActive, close, children }: ModalPortalProps) => {
  return root
    ? ReactDOM.createPortal(
        <Modal isActive={isActive} close={close}>
          {children}
        </Modal>,
        root
      )
    : null;
};

export default ModalPortal;
