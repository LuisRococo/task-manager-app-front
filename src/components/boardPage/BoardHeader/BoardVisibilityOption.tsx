import React from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useBoardState } from "../../../hooks/useBoardState";

interface BoardVisibilityOption {
  visible: boolean;
}

export const BoardVisibilityOption: React.FC<BoardVisibilityOption> = ({
  visible,
}) => {
  const iconSize = 24;
  const textContent = visible ? "Visible" : "Private";
  const { changeBoardVisibility, board } = useBoardState();
  const Icon = visible ? (
    <HiOutlineEye size={iconSize} />
  ) : (
    <HiOutlineEyeOff size={iconSize} />
  );

  function handleClick() {
    changeBoardVisibility(!board?.isPublic);
  }

  return (
    <div>
      <button
        data-testid="board-visibility-btn"
        className="btn btn-primary"
        onClick={handleClick}
      >
        {Icon}{" "}
        <span data-testid="board-visibility-btn-text">{textContent}</span>
      </button>
    </div>
  );
};
