import React from "react";
import { SelectionPageHeader } from "../components/selectionPage/selectionPageHeader/SelectionPageHeader";
import { BoardCard } from "../components/selectionPage/boardCard/BoardCard";

export const BoardSelectPage = () => {
  return (
    <div className="page-cont full-height-cont">
      <SelectionPageHeader />
      <div className="container">
        <div className="row">
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </div>
    </div>
  );
};
