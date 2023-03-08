import React from "react";
import logoImg from "../../../assets/logo.png";
import "./Navigation.scss";
import { selectedBoardIdState } from "../../../appState/selectedBoardIdState";
import { useSetRecoilState } from "recoil";
import profileImg from "../../../assets/profile.png";
import { useUserState } from "../../../hooks/useUserState";
import { AiFillEdit } from "react-icons/ai";
import { MdArrowDropDown, MdOutlineLogout } from "react-icons/md";
import { ProfileMenuBtn } from "./ProfileMenuBtn";

export const Navigation: React.FC = () => {
  const setSelectedBoard = useSetRecoilState(selectedBoardIdState);
  const { user, logout } = useUserState();
  const { userData } = user;
  const { firstName, authType } = userData || {};

  function handleNavLogoClick() {
    setSelectedBoard({ id: null });
  }

  function handleLogOutBtnClick() {
    logout();
  }

  return (
    <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
      <div className="page-cont py-2">
        <div className="d-flex justify-content-between">
          <div
            onClick={handleNavLogoClick}
            className="nav-logo d-flex align-items-center text-white"
          >
            <img src={logoImg} alt="Project logo" className="logo" />
            GreatBoard
          </div>

          {userData && (
            <div className="dropdown">
              <div className="profile">
                <img src={profileImg} alt="user-logo" />
                <div>
                  <div className="d-flex align-items-center">
                    <p className="text-white m-0">{firstName}</p>
                    <MdArrowDropDown size={20} color="#fff" />
                  </div>
                  <p className="user-auth-type m-0">{authType}</p>
                </div>
              </div>

              <div className="dropdown-content">
                <ProfileMenuBtn
                  title="Edit Profile"
                  Icon={AiFillEdit}
                  onClick={() => {
                    console.log("Placeholder");
                  }}
                />
                <ProfileMenuBtn
                  title="Logout"
                  Icon={MdOutlineLogout}
                  onClick={handleLogOutBtnClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
