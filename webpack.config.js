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
          'vueLib': 'vue/dist/vue.min.js',
          'font-awesome': 'font-awesome/css/font-awesome.min.css'
      },
      modulesDirectories: [
          'node_modules',
          '.'
      ]
  }
};
