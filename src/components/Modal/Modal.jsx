import { useEffect } from "react";
import {createPortal} from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, fullImage, onClose}) => {
  useEffect(() => {
    const handleKeyDown =(event)=> {
      if(event.code ==='Escape'){
        onClose();
      };
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [onClose]);

  const handleBackdropClick=(event)=> {
    if(event.currentTarget === event.target) {
      onClose();
    }
  };
  
  return createPortal(
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>
        {children}
        <img src={fullImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
};


Modal.propTypes = {
	fullImage: PropTypes.string.isRequired,
};
