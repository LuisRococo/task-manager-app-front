import React from "react";
import { selectedBoardIdState } from "../../../appState/selectedBoardIdState";
import { useSetRecoilState } from "recoil";

export const GeneralErrorMessage: React.FC = () => {
  const setSelectedBoardId = useSetRecoilState(selectedBoardIdState);

  function handleResetBoardIdBtnClick() {
    setSelectedBoardId({ id: null });
  }

  return (
    <div className="page-cont full-height-cont">
      <div className="text-center mt-5">
        <h3>There was an error</h3>
        <p className="m-0">Maybe you selected an invalid board</p>
        <button
          onClick={handleResetBoardIdBtnClick}
          className="btn btn-primary mt-3"
        >
          See all boards
        </button>
      </div>
    </div>
  );
};
