module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    globalSetup: 'jest-preset-angular/global-setup',
    testMatch: ["**/__tests__/**/*.spec.ts"],
    transform: {
      "^.+\\.(ts|html)$": "ts-jest",
    },
    moduleNameMapper: {
      '^@app/(.*)$': '<rootDir>/src/app/$1',
      '^@environments/(.*)$': '<rootDir>/src/environments/$1'
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    transformIgnorePatterns: [
      'node_modules/(?!.*\\.mjs$)',
    ],
    resolver: 'jest-preset-angular/build/resolvers/ng-jest-resolver.js'
  };