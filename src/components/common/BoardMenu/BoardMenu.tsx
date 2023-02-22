import React from "react";
import * as ReactDOM from "react-dom";
import "./BoardMenu.scss";
import logoImg from "../../../assets/logo.png";
import { MenuBtn } from "./MenuBtn";
import { GrHomeOption } from "react-icons/gr";
import { boardMenuVisibilityState } from "../../../state/recoilStates";
import { useRecoilState } from "recoil";

export const BoardMenu = () => {
  const [boardVisibility, setBoardVisibility] = useRecoilState(
    boardMenuVisibilityState
  );

  function handleContainerClick(e: React.MouseEvent) {
    if (e.currentTarget === e.target) {
      setBoardVisibility(false);
    }
  }

  if (!boardVisibility) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="board-menu-cont"
          onClick={(e) => handleContainerClick(e)}
        >
          <div className="board-menu pt-5">
            <div className="d-flex justify-content-center align-items-center">
              <img src={logoImg} alt="Project logo" className="logo" />
              <h4 className="m-0 p-0">GreatBoard</h4>
            </div>

            <div className="mt-5 board-menu-btn-cont">
              <MenuBtn Icon={GrHomeOption} text="Pruebas" />
              <MenuBtn Icon={GrHomeOption} text="Pruebas" />
              <MenuBtn Icon={GrHomeOption} text="Pruebas" />
            </div>
          </div>
        </div>,
        document.getElementById("task-list-option-modal") as any
      )}
    </>
  );
};
