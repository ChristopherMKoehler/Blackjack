var path = require('path');

module.exports = {
  entry: './blackjack.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname)
  }
};
