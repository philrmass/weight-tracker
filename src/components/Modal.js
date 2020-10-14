import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Modal.module.css';

function Modal({
  isOpen = false,
  children,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.main}>
      <div className={styles.modal}>
        <div className={styles.content}>
          { children }
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.object,
};

export default Modal;
