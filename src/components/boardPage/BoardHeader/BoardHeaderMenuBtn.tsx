import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRecoilState } from "recoil";
import { boardMenuVisibilityState } from "../../../state/recoilStates";

export const BoardHeaderMenuBtn = () => {
  const [, setBoardVisibility] = useRecoilState(boardMenuVisibilityState);
  const iconSize = 24;

  function handleClick() {
    setBoardVisibility(true);
  }

  return (
    <div>
      <button className="btn btn-secondary h-100 ms-2" onClick={handleClick}>
        <GiHamburgerMenu size={iconSize} />
      </button>
    </div>
  );
};
