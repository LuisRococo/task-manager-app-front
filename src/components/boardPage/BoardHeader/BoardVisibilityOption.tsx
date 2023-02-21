import React from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface BoardVisibilityOption {
  visible: boolean;
  onClick: () => void;
}

export const BoardVisibilityOption: React.FC<BoardVisibilityOption> = ({
  onClick,
  visible,
}) => {
  const iconSize = 24;
  const textContent = visible ? "Visible" : "Private";
  const Icon = visible ? (
    <HiOutlineEye size={iconSize} />
  ) : (
    <HiOutlineEyeOff size={iconSize} />
  );

  return (
    <div>
      <button className="btn btn-primary">
        {Icon} {textContent}
      </button>
    </div>
  );
};
