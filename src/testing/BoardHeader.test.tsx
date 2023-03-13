import { cleanup, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import BoardHeader from "../components/boardPage/BoardHeader/BoardHeader";

afterEach(cleanup);

it("It shows a correct board title", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <BoardHeader
        boardTitle="Test Board 1"
        boardVisibility={true}
        projectImage=""
      />
    </RecoilRoot>
  );

  const boardHeaderTitle = getByTestId("board-header-title");

  expect(boardHeaderTitle.textContent).toBe("Test Board 1");
});
