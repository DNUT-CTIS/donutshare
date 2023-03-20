import React from 'react';
import ReactDOM from 'react-dom';

const ModalContainer = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4">{children}</div>
    </div>,
    document.body
  );
};

export default ModalContainer;
