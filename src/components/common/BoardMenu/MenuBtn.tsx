import React from "react";
import { IconType } from "react-icons";

interface MebuBtn {
  text: string;
  Icon: IconType;
  onClick: () => void;
}

export const MenuBtn: React.FC<MebuBtn> = ({ text, Icon, onClick }) => {
  return (
    <div className="board-menu-btn" onClick={onClick}>
      <div className="d-flex align-items-center">
        <Icon color="#d3451a" /> <p className="p-0 m-0 ms-2">{text}</p>
      </div>
    </div>
  );
};
