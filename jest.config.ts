import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(scss|css)$": "<rootDir>/src/testing/jest/__mocks__/styleMock.ts",
  },
};
export default config;
