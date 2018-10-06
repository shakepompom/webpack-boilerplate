module.exports = {
    plugins: {
      'postcss-import': {},
      'postcss-short': {},
      'postcss-cssnext': {
        browsers: ['last 2 versions'],
      },
      'css-mqpacker': {
        sort: true,
      },
      'postcss-csso': {},
    }
  }