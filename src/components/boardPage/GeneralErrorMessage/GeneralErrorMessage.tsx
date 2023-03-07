import React from "react";

interface IGeneralErrorMessage {
  onSelectededBoardIdReset: () => void;
}

export const GeneralErrorMessage: React.FC<IGeneralErrorMessage> = ({
  onSelectededBoardIdReset,
}) => {
  return (
    <div className="page-cont full-height-cont">
      <div className="text-center mt-5">
        <h3>There was an error</h3>
        <p className="m-0">Maybe you selected an invalid board</p>
        <button onClick={onSelectededBoardIdReset} className="btn btn-primary">
          See all boards
        </button>
      </div>
    </div>
  );
};
