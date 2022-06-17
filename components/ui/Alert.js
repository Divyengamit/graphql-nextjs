import React from "react";
import Image from "next/image";
import not_allow_image from "../../assets/not-allow.png";
import success_icon from "../../assets/success-icon.png";

const Alert = ({ isError, onClose }) => {
  return (
    <div className="overlay-modal">
      <div className="modal-contains">
        <div className="not-allow-icon">
          <Image src={isError ? not_allow_image : success_icon} alt="icon" />
        </div>
        <p className="highlight-text">
          Sorry, You are not eligible for this finance option!
        </p>
        <button className="popup-btn" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default Alert;
