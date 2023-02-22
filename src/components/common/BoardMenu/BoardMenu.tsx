import React from "react";
import * as ReactDOM from "react-dom";
import "./BoardMenu.scss";
import logoImg from "../../../assets/logo.png";
import { MenuBtn } from "./MenuBtn";
import { GrHomeOption } from "react-icons/gr";

export const BoardMenu = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <div className="board-menu-cont">
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
