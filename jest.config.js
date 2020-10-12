module.exports = {
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/config/setup.js'],
  globals: {
      'ts-jest': {
          'babelConfig': true
      }
  },
  testRegex: '/__tests__/.*\\.(test|spec)\\.tsx?$',
  transform: {
      '^.+\\.tsx?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>[/\\\\](build|docs|node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',

  moduleFileExtensions: [
      'ts', 'tsx', 'js', 'jsx', 'json'
  ],
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
  }
};
