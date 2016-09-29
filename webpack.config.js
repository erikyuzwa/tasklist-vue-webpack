/**
 * setting up Webpack isn't the easiest of tasks if you haven't seen it before.
 * entry.app - define the root entry point of your application's JS
 * output    - define where the JS will be "exported" to by WebPack - this is the JS file that you include in your
 *             index.html
 * resolve   - define a virtual mapping to 3rd party scripts. Define your references here for things like jQuery,
 *             lodash, angular, etc. that Webpack will define for us
 */
var path = require('path');
module.exports = {
  entry: {
    app: ['./app/scripts/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
      alias: {
          'vueLib': 'vue/dist/vue.min.js'
      },
      modulesDirectories: [
          'node_modules',
          '.'
      ]
  }
};
