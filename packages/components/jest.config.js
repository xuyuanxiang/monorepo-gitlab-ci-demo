module.exports = {
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook/', '<rootDir>/lib/', '/__stories__/'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook/', '<rootDir>/lib/', '/__stories__/'],
  testEnvironment: 'enzyme',
  setupFilesAfterEnv: ['jest-enzyme', '<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  transformIgnorePatterns: ['/node_modules/', '<rootDir>/.storybook/', '<rootDir>/lib/', '/__stories__/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
