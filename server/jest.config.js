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
};

module.exports = config;
