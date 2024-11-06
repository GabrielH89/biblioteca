import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'node', // Set the environment (node or jsdom)
  collectCoverage: true,
  coverageDirectory: "coverage",
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files with ts-jest
  },
  transformIgnorePatterns: [
    '/node_modules/',
  ],
};

export default config;
