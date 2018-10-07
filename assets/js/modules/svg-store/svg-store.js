import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';

const __svg__ = {
  path: '../../../icons/**/*.svg',
  name: './static/svg/[hash].sprite.svg',
};

svgxhr(__svg__);