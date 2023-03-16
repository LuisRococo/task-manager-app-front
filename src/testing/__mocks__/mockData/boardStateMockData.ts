import { IBoardState } from "../../../interfaces/board";

export const boardDataMock: IBoardState = {
  id: 1,
  author: { firstName: "Admin", id: 1, lastName: "Admin" },
  isPublic: true,
  title: "Board Mock 1",
};

export const boardBeforeChange: IBoardState = {
  ...boardDataMock,
};

export const boardAfterChange: IBoardState = {
  ...boardBeforeChange,
  title: "Board Mock 1 Patched",
};
