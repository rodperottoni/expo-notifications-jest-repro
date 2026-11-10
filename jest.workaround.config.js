// Same as the default config plus a setup file that mocks the native handler module.
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/workaround/jest.setup.js'],
}
