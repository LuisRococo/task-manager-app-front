import React, { useEffect, useState } from "react";
import { SelectionPageHeader } from "../components/selectionPage/selectionPageHeader/SelectionPageHeader";
import { BoardCard } from "../components/selectionPage/boardCard/BoardCard";
import { useBoardState } from "../hooks/useBoardState";
import { useUserState } from "../hooks/useUserState";
import { selectedBoardIdState } from "../appState/selectedBoardIdState";
import { useSetRecoilState } from "recoil";

export const BoardSelectPage = () => {
  const [boards, setBoards] = useState<{ id: number; title: string }[]>([]);
  const { fetchUserBoards } = useBoardState();
  const { user } = useUserState();
  const setSelectedBoard = useSetRecoilState(selectedBoardIdState);

  function handleCardButtonClick(idBoard: number) {
    setSelectedBoard({ id: idBoard });
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
    <div
      data-testid="board-select-pg-cont"
      className="page-cont full-height-cont"
    >
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
