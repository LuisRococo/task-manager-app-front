import { cleanup, fireEvent, render } from "@testing-library/react";
import { BoardVisibilityOption } from "../components/boardPage/BoardHeader/BoardVisibilityOption";

afterEach(cleanup);

let boardVisibility = true;
jest.mock("../hooks/useBoardState", () => {
  const useBoardState = () => {
    const changeBoardVisibility = (newState: boolean) => {
      board.isPublic = newState;
      boardVisibility = board.isPublic;
    };

    const board = { isPublic: boardVisibility };

    return { changeBoardVisibility, board };
  };
  return { useBoardState };
});

it("BoardVisibilityOption changes its text to 'Visible' on click while being 'Private'", () => {
  const { getByTestId, rerender } = render(
    <BoardVisibilityOption visible={boardVisibility} />
  );

  const buttonComponentText = getByTestId("board-visibility-btn-text");
  const buttonComponent = getByTestId("board-visibility-btn");

  expect(buttonComponentText.textContent).toBe("Visible");

  fireEvent.click(buttonComponent);

  rerender(<BoardVisibilityOption visible={boardVisibility} />);

  expect(buttonComponentText.textContent).toBe("Private");
});

it("BoardVisibilityOption changes its text to 'Private' on click while being 'Visible'", () => {
  const { getByTestId, rerender } = render(
    <BoardVisibilityOption visible={boardVisibility} />
  );

  const buttonComponentText = getByTestId("board-visibility-btn-text");
  const buttonComponent = getByTestId("board-visibility-btn");

  expect(buttonComponentText.textContent).toBe("Private");

  fireEvent.click(buttonComponent);

  rerender(<BoardVisibilityOption visible={boardVisibility} />);

  expect(buttonComponentText.textContent).toBe("Visible");
});
