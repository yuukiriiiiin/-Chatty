import React from "react";
import styles from './Modal.module.scss'
import cx from 'classnames'

type Props = {
  showModal: boolean;
  closeModal: () => void;
}

export const Modal:React.FC<Props> = ({showModal, closeModal}) => {
  const isDisplay = showModal ? 'block' : 'none';
  return (
    <div className={cx(styles.overlay, showModal ? styles['is-active']: '')}>
      <div className={cx(styles.modal, showModal ? styles['is-active']: '')}>
        <p>This is ModalContent</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};