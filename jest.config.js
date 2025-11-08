module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true,
  forceExit: true, // Not always recommended, but useful for this context
  clearMocks: true,
};