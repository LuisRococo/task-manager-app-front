import { cleanup, render, waitFor } from "@testing-library/react";
import { BoardSelectPage } from "../pages/BoardSelectPage";
import React from "react";
import { RecoilRoot } from "recoil";
import { IUserState } from "../appState/userState";
import { userBoardsFetchResultMock } from "./__mocks__/mockData/boardSelectPageData";
import "@testing-library/jest-dom";
import { userStateMock } from "./__mocks__/mockData/userMockData";

afterEach(cleanup);

jest.mock("../hooks/useUserState", () => ({
  useUserState: () => {
    const user: IUserState = userStateMock;

    return { user };
  },
}));

jest.mock("../hooks/useBoardState", () => ({
  useBoardState: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchUserBoards = async (userId: number) => {
      const userBoards: { id: number; title: string }[] =
        userBoardsFetchResultMock;
      return userBoards;
    };

    return { fetchUserBoards };
  },
}));

it("Should render page title correctly", async () => {
  const { getByTestId, getAllByTestId } = render(
    <RecoilRoot>
      <BoardSelectPage />
    </RecoilRoot>
  );

  await waitFor(() => {
    expect(getAllByTestId("board-card-title")[0]).toBeInTheDocument();
  });

  const boardSelectPageHeader = getByTestId("board-select-page-header");

  expect(boardSelectPageHeader.textContent).toBe("Boards Menu");
});

it("Should render board cards", async () => {
  const { getAllByTestId } = render(
    <RecoilRoot>
      <BoardSelectPage />
    </RecoilRoot>
  );

  await waitFor(() => {
    expect(getAllByTestId("board-card-title")[0]).toBeInTheDocument();
  });

  const boardCardHeaders = getAllByTestId("board-card-title");

  for (let index = 0; index < boardCardHeaders.length; index++) {
    const boardHeaderText = boardCardHeaders[index].textContent;
    const mockedBoardTitle = userBoardsFetchResultMock[index].title;

    expect(boardHeaderText).toBe(mockedBoardTitle);
  }
});
