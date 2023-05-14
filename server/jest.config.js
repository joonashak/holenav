const config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/{(*.service),(*.guard)}.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/../test/test-env.ts"],
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};

module.exports = config;
