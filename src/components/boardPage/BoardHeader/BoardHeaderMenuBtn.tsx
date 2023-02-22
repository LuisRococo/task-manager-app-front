import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const BoardHeaderMenuBtn = () => {
  const iconSize = 24;

  return (
    <div>
      <button className="btn btn-secondary h-100 ms-2" onClick={() => {}}>
        <GiHamburgerMenu />
      </button>
    </div>
  );
};
