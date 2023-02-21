import React, { useState } from "react";
import "./Modal.scss";
import { VscChromeClose } from "react-icons/vsc";

interface Modal {
  children: React.ReactNode;
  visibility: boolean;
  onModalOpen: () => void;
}

export const Modal: React.FC<Modal> = ({
  children,
  visibility,
  onModalOpen,
}) => {
  const handleButtonClose = () => {
    onModalOpen();
  };

  if (!visibility) {
    return null;
  }

  return (
    <div className="page-modal">
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
