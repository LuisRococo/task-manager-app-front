import React from "react";
import { IconType } from "react-icons";

interface IProfileMenuBtn {
  Icon: IconType;
  title: string;
  onClick: () => void;
}

export const ProfileMenuBtn: React.FC<IProfileMenuBtn> = ({
  Icon,
  onClick,
  title,
}) => {
  return (
    <div className="dropdown-btn" onClick={onClick}>
      <Icon size={20} color="#d3451a" />
      <p>{title}</p>
    </div>
  );
};
