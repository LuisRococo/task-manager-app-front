import { cleanup, render } from "@testing-library/react";
import { TaskCard } from "../components/boardPage/TaskCard.tsx/TaskCard";
import { taskCardParamsMock } from "./__mocks__/mockData/taskCardParams";
import { RecoilRoot } from "recoil";
import { createRef } from "react";

afterEach(cleanup);

jest.mock("react-dnd", () => ({
  useDrop: () => [0, createRef()],
  useDrag: () => [{ opacity: 1 }, createRef()],
}));

it("It shows a correct title", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <TaskCard {...taskCardParamsMock} />
    </RecoilRoot>
  );

  const taskCardTitle = getByTestId("task-card-title");

  expect(taskCardTitle.textContent).toBe(taskCardParamsMock.title);
});

it("It shows a tag with 'Completed' value on 'completed' property equals true", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <TaskCard {...taskCardParamsMock} />
    </RecoilRoot>
  );

  const taskCardTagText = getByTestId("task-card-tag-text");

  expect(taskCardTagText.textContent).toBe("Completed");
});

it("It shows a tag with 'Incomplete' value on 'completed' property equals false", () => {
  const { getByTestId } = render(
    <RecoilRoot>
      <TaskCard {...{ ...taskCardParamsMock, completed: false }} />
    </RecoilRoot>
  );

  const taskCardTagText = getByTestId("task-card-tag-text");

  expect(taskCardTagText.textContent).toBe("Incomplete");
});
