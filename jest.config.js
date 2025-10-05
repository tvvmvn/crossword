// jest.config.js
module.exports = {
  // ... other Jest configurations
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // ...
};