import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BoardHeader from "../../components/boardPage/BoardHeader/BoardHeader";
import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { boardState } from "../../appState/boardState";
import {
  boardAfterChange,
  boardBeforeChange,
} from "../__mocks__/mockData/boardStateMockData";
import { MockedProvider } from "@apollo/react-testing";
import { EditBoardModal } from "../../components/boardPage/EditBoardModal/EditBoardModal";

const BoardPageTestEnviroment: React.FC = () => {
  const [board, setBoard] = useRecoilState(boardState);

  useEffect(() => {
    setBoard(boardBeforeChange);
  }, []);

  if (!board) return null;

  return (
    <BoardHeader
      boardTitle={board.title}
      projectImage=""
      boardVisibility={board.isPublic}
    />
  );
};

function setup() {
  const boardModalPortal = document.createElement("div");
  boardModalPortal.id = "edit-board-modal";
  document.body.appendChild(boardModalPortal);

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <RecoilRoot>
        <EditBoardModal />
        <BoardPageTestEnviroment />
      </RecoilRoot>
    </MockedProvider>
  );
}

it("BoardModal should be opened", async () => {
  setup();

  await waitFor(() => {
    expect(screen.queryByTestId("header-edit-board-btn")).not.toBeNull();
  });

  fireEvent.click(screen.getByTestId("header-edit-board-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("board-modal-cont")).not.toBeNull();
  });
});

it("BoardModal should be able to patch board data", async () => {
  setup();

  await waitFor(() => {
    expect(screen.queryByTestId("header-edit-board-btn")).not.toBeNull();
  });

  fireEvent.click(screen.getByTestId("header-edit-board-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("board-modal-cont")).not.toBeNull();
  });

  fireEvent.change(screen.getByTestId("board-modal-title-input"), {
    target: { value: boardAfterChange.title },
  });

  fireEvent.click(screen.getByTestId("board-modal-update-btn"));

  await waitFor(() => {
    expect(screen.queryByTestId("board-header-title")?.textContent).toBe(
      boardAfterChange.title
    );
  });
});
