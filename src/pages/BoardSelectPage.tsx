import React, { FC, useEffect, useState } from "react";
import { SelectionPageHeader } from "../components/selectionPage/selectionPageHeader/SelectionPageHeader";
import { BoardCard } from "../components/selectionPage/boardCard/BoardCard";
import { useBoardState } from "../hooks/useBoardState";
import { useUserState } from "../hooks/useUserState";

interface IBoardSelectPage {
  onBoardSelection: (idBoard: number) => void;
}

export const BoardSelectPage: FC<IBoardSelectPage> = ({ onBoardSelection }) => {
  const [boards, setBoards] = useState<{ id: number; title: string }[]>([]);
  const { fetchUserBoards } = useBoardState();
  const { user } = useUserState();

  function handleCardButtonClick(idBoard: number) {
    onBoardSelection(idBoard);
  }

  async function getBoardsToSelect() {
    try {
      if (user.userData) {
        const fetchBoards = await fetchUserBoards(user.userData.id);
        setBoards(fetchBoards);
      }
    } catch (error) {
      alert("There was an error, try later");
    }
  }

  useEffect(() => {
    getBoardsToSelect();
  }, [user]);

  return (
    <div className="page-cont full-height-cont">
      <SelectionPageHeader />
      <div className="container">
        <div className="row">
          {boards.map((b) => {
            return (
              <BoardCard
                key={b.id}
                boardId={b.id}
                boardTitle={b.title}
                onBoardSelection={handleCardButtonClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
