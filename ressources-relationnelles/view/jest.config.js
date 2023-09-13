module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  module: {
    rules: [
      // Other configuration rules...

      // Rule for CSS files
      {
        test: /\.css$/,
        use: [
          'style-loader', // Loads CSS styles into the DOM
          'css-loader' // Interprets CSS file imports
        ],
      },
    ],
  }
};