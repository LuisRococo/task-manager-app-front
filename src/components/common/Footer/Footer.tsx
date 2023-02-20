import React from "react";
import "./Footer.scss";
import logoImg from "../../../assets/logo.png";

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-top footer-section">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <img className="logo" src={logoImg} alt="" />
            <h5>GreatBoard</h5>
          </div>
          <hr className="my-4" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            nisi sint, fugit voluptatibus rerum rem distinctio suscipit,
            cupiditate tempora accusamus earum? Fuga voluptate perspiciatis
            officia reprehenderit maiores, cum quidem reiciendis!
          </p>
        </div>
      </div>

      <div className="footer-bottom footer-section">
        <div className="container">
          <p className="text-center m-0">© 2022 Copyright</p>
        </div>
      </div>
    </div>
  );
};
