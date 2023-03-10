import { cleanup, render, waitFor } from "@testing-library/react";
import { BoardSelectPage } from "../pages/BoardSelectPage";
import React from "react";
import { RecoilRoot } from "recoil";
import { IUserState } from "../appState/userState";
import { boardsDataMock } from "./__mocks__/mockData/boardSelectPageData";
import "@testing-library/jest-dom";

afterEach(cleanup);

jest.mock("../hooks/useUserState", () => ({
  useUserState: () => {
    const user: IUserState = {
      userData: {
        authType: "admin",
        email: "admin@admin.com",
        firstName: "admin",
        lastName: "admin",
        id: 1,
      },
    };

    return { user };
  },
}));

jest.mock("../hooks/useBoardState", () => ({
  useBoardState: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fetchUserBoards = async (userId: number) => {
      const userBoards: { id: number; title: string }[] = boardsDataMock;
      return userBoards;
    };

    return { fetchUserBoards };
  },
}));

it("Board select page renders it title correctly", async () => {
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
    const mockedBoardTitle = boardsDataMock[index].title;

    expect(boardHeaderText).toBe(mockedBoardTitle);
  }
});
