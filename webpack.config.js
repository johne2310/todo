/* eslint-disable */
/**
 * DON'T EDIT THIS FILE!!
 *
 * This file is generated to help IntelliJ resolve Webpack aliases. It is never run in the app.
 * If you need to extend your webpack config, put your code in quasar.conf.js into extendWebpack function
 */
module.exports = {
  target: 'electron-main',
  mode: 'development',
  externals: [
    '@quasar/babel-preset-app',
    '@quasar/fastclick',
    '@types/cordova',
    '@types/electron-packager',
    '@types/express',
    '@types/lru-cache',
    '@types/terser-webpack-plugin',
    '@types/webpack',
    '@types/webpack-bundle-analyzer',
    '@types/webpack-dev-server',
    '@vue/preload-webpack-plugin',
    'archiver',
    'autoprefixer',
    'chalk',
    'chokidar',
    'ci-info',
    'compression-webpack-plugin',
    'copy-webpack-plugin',
    'cross-spawn',
    'css-loader',
    'cssnano',
    'dot-prop',
    'elementtree',
    'express',
    'fast-glob',
    'file-loader',
    'fork-ts-checker-webpack-plugin',
    'friendly-errors-webpack-plugin',
    'fs-extra',
    'html-minifier',
    'html-webpack-plugin',
    'inquirer',
    'isbinaryfile',
    'launch-editor-middleware',
    'lodash.debounce',
    'lodash.template',
    'lodash.throttle',
    'log-update',
    'lru-cache',
    'memory-fs',
    'mini-css-extract-plugin',
    'minimist',
    'ms',
    'node-loader',
    'node-sass',
    'open',
    'optimize-css-assets-webpack-plugin',
    'ouch',
    'postcss-loader',
    'postcss-rtl',
    'postcss-safe-parser',
    'register-service-worker',
    'sass-loader',
    'semver',
    'strip-ansi',
    'stylus',
    'stylus-loader',
    'terser-webpack-plugin',
    'ts-loader',
    'typescript',
    'url-loader',
    'vue',
    'vue-loader',
    'vue-router',
    'vue-server-renderer',
    'vue-style-loader',
    'vue-template-compiler',
    'vuex',
    'webpack',
    'webpack-bundle-analyzer',
    'webpack-chain',
    'webpack-dev-server',
    'webpack-merge',
    'webpack-node-externals',
    'workbox-webpack-plugin',
    'write-file-webpack-plugin',
    'yargs',
    '@quasar/extras',
    'acorn',
    'dayjs',
    'firebase',
    'minimist',
    'moment',
    'quasar',
    'vue-i18n',
    // 'vuelidate',
    // 'vuex-easy-firestore',
    'vuex-persistedstate',
    'vuexfire',
  ],
  node: {
    __dirname: true,
    __filename: true,
  },
  output: {
    filename: 'electron-main.js',
    libraryTarget: 'commonjs2',
    path:
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/.quasar/electron',
  },
  resolve: {
    extensions: ['.js', '.json', '.node'],
    modules: [
      'node_modules',
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/node_modules',
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/node_modules/@quasar/app/node_modules',
    ],
  },
  resolveLoader: {
    modules: [
      'node_modules',
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/node_modules',
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/node_modules/@quasar/app/node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: {},
        exclude: [{}],
        use: [
          {
            loader: 'babel-loader',
            options: {
              extends:
                '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/babel.config.js',
            },
          },
        ],
      },
      {
        test: {},
        use: [
          {
            loader: 'node-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    noEmitOnErrors: true,
  },
  plugins: [
    {
      profile: false,
      modulesCount: 500,
      showEntries: false,
      showModules: true,
      showActiveModules: true,
      opts: {
        name: 'Main process',
      },
    },
    {
      definitions: {
        'process.env': {
          NODE_ENV: '"development"',
          CLIENT: true,
          SERVER: false,
          DEV: true,
          PROD: false,
          MODE: '"electron"',
          VUE_ROUTER_MODE: '"hash"',
          VUE_ROUTER_BASE: '""',
          APP_URL: '"http://localhost:8080"',
        },
        QUASAR_NODE_INTEGRATION: 'false',
      },
    },
  ],
  entry: {
    'electron-main': [
      '/Users/johnevans/OneDrive (Personal)/OneDrive/apps/Vue/quasar/todo/src-electron/main-process/electron-main.dev.js',
    ],
  },
};
