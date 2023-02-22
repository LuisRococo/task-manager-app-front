import React from "react";
import { IconType } from "react-icons";

interface MebuBtn {
  text: string;
  Icon: IconType;
}

export const MenuBtn: React.FC<MebuBtn> = ({ text, Icon }) => {
  return (
    <div className="board-menu-btn">
      <div className="d-flex align-items-center">
        <Icon /> <p className="p-0 m-0 ms-2">{text}</p>
      </div>
    </div>
  );
};
