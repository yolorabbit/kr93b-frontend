module.exports = {
  moduleNameMapper: {
    '^components/(.*)': '<rootDir>/src/components/$1',
    '^store/(.*)': '<rootDir>/src/store/$1',
    '^utils/(.*)': '<rootDir>/src/utils/$1',
    '^api/(.*)': '<rootDir>/src/api/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.js'
  ],
  testEnvironment: 'jsdom'
}; 