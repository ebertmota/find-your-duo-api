module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '<rootDir>/src/**/**/*.ts',
    '<rootDir>/src/domain/entities/**',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],
};
