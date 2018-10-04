// Base kyt config.
// Edit these properties to make changes.

module.exports = {
  debug: false,
  modifyJestConfig(baseConfig) {
    return Object.assign(baseConfig, {
      collectCoverageFrom: [
        '!src/**/constants.js',
        '!src/**/index.js',
        '!src/server/template.js',
        'src/**/*.{js,jsx,mjs}',
      ],
    })
  },
}
