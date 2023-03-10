import { cleanup, render } from "@testing-library/react";
import { BoardCard } from "../components/selectionPage/boardCard/BoardCard";
import { boardCardProps } from "./__mocks__/mockData/boardCardParams";

afterEach(cleanup);

it("Board card component show correct title", () => {
  const { getByTestId } = render(<BoardCard {...boardCardProps} />);

  const boardHeader = getByTestId("board-card-title");

  expect(boardHeader.textContent).toBe(boardCardProps.boardTitle);
});
