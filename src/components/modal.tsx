import React from "react";

type Props = {
  showModal: boolean;
  closeModal: () => void;
}

export const Modal:React.FC<Props> = ({showModal, closeModal}) => {
  const isDisplay = showModal ? 'block' : 'none';
  return (
    <div className="overlay" style={{display: isDisplay}}>
      <div className="modalContent">
        <p>This is ModalContent</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};