import React, { useEffect, useRef, useState } from "react";
import styles from './Modal.module.scss'
import cx from 'classnames'

type Props = {
  showModal: boolean;
  closeModal: () => void;
}

export const Modal:React.FC<Props> = ({showModal, closeModal}) => {
  const [full, setFull] = useState(false)
  const ref = useRef<HTMLDivElement>(null);

  let startY: number;
  let endY: number;

  const logSwipeStart = (event) => {
    startY = event.touches[0].pageY;
  }

  const logSwipe = (event) => {
    endY = event.touches[0].pageY;
  }

  const logSwipeEnd = (event) => {
    if( 0 < (endY - startY) ) {
      console.log("下向き");
    } else {
      console.log("上向き");
      setFull(true)
    }
  }
  useEffect(() => {
    ref.current?.addEventListener("touchstart", logSwipeStart, { passive: false });
    ref.current?.addEventListener("touchmove", logSwipe, { passive: false });
    ref.current?.addEventListener("touchend", logSwipeEnd, { passive: false });
    return (() => {
      ref.current?.removeEventListener("touchstart", logSwipeEnd);
      ref.current?.removeEventListener("touchmove", logSwipe);
      ref.current?.removeEventListener("touchend", logSwipeEnd);
    });
  });
  return (
    <div className={cx(styles.overlay, showModal ? styles['is-active']: '')}>
      <div className={cx(styles.modal, showModal ? styles['is-active']: '', full ? styles['full'] : '')}>
        <p>This is ModalContent</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};