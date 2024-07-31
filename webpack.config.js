const path = require('path');

module.exports = {
  entry: {
    main: './script/script.js',
    gradientField: './script/gradient_field.js',
    linearRegression: './script/linear-regression-visual.js',
    particleBall: './script/particle-ball.js',
    probDensity: './script/prob-density-function.js',
    testimonials: './script/testimonial-neon-change.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production', // Change to 'development' if you need source maps for debugging
};
