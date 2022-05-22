module.exports = {
  testPathIgnorePatterns: ["/node-modules/", "/.next/"],
  setupFilesAfterEnv: [
    "<rootDir>/tests/setup-tests.ts",
    "@testing-library/jest-dom/extend-expect"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss)$": 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ["lcov", "json"]
};