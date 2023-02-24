import React from "react";
import "./Modal.scss";
import { VscChromeClose } from "react-icons/vsc";

interface Modal {
  children: React.ReactNode;
  visibility: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Modal> = ({ children, visibility, onClose }) => {
  const handleButtonClose = () => {
    onClose();
  };

  function handleBackgroundClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  if (!visibility) {
    return null;
  }

  return (
    <div className="page-modal" onClick={handleBackgroundClick}>
      <div className="modal-card">
        <div className="d-flex justify-content-end">
          <div className="modal-btn" onClick={handleButtonClose}>
            <VscChromeClose style={{ color: "#fff" }} size={22} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
