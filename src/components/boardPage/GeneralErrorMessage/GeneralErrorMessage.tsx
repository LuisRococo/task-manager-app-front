import React from "react";

export const GeneralErrorMessage = () => {
  return (
    <div className="page-cont full-height-cont">
      <div className="text-center mt-5">
        <h3>There was an error</h3>
        <p className="m-0">Maybe you selected an invalid board</p>
        <p className="fst-italic">/?boardId=1</p>
      </div>
    </div>
  );
};
