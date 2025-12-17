/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts",
    "!src/**/__tests__/**",
  ],
  moduleNameMapper: {
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@controllers/(.*)$": "<rootDir>/src/api/controllers/$1",
    "^@middleware/(.*)$": "<rootDir>/src/api/middleware/$1",
    "^@services$": "<rootDir>/src/services",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@database/(.*)$": "<rootDir>/src/database/$1",
    "^@repositories$": "<rootDir>/src/database/repositories",
    "^@repositories/(.*)$": "<rootDir>/src/database/repositories/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@constants/(.*)$": "<rootDir>/src/shared/constants/$1",
    "^@errors/(.*)$": "<rootDir>/src/shared/errors/$1",
    "^@loan-types/(.*)$": "<rootDir>/src/shared/types/$1",
    "^@mappers/(.*)$": "<rootDir>/src/mappers/$1",
  },
};
