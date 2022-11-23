/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        '@icons': path.resolve(__dirname, 'src/components/icons'),
        '@hoc': path.resolve(__dirname, 'src/components/hoc'),
        '@atoms': path.resolve(__dirname, 'src/components/UI/atoms'),
        '@molecules': path.resolve(__dirname, 'src/components/UI/molecules'),
        '@organisms': path.resolve(__dirname, 'src/components/UI/organisms'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@types': path.resolve(__dirname, 'src/types'),
        '@style': path.resolve(__dirname, 'src/style'),
        '@utils': path.resolve(__dirname, 'src/utils'),
    })
);
