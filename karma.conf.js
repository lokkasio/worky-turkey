// Karma configuration

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['qunit'],

    files: [
      {
        pattern: 'test/worker.js',
        included: false
      },
      'dist/worky-turkey.min.js',
      'test/index.js'
    ],

    reporters: ['dots'],

    autoWatch: false,

    browsers: ['FirefoxHeadless'],

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },

    singleRun: true
  })
}
