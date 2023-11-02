module.exports = {
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
};
