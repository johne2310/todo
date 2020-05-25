// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const envFile = require('./.quasar.env.json');
const env = envFile[process.env.QENV];

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ['i18n', 'firebase'],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'material-icons-outlined',
      'material-icons-round',
      'material-icons-sharp',
      'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {
        screen: {
          bodyClasses: true, // <<< add this
        },
        capacitor: {
          iosStatusBarPadding: true,
        },
      },
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'auto',

      components: [],
      directives: ['TouchHold'],

      // Quasar plugins
      plugins: ['Dialog', 'LocalStorage', 'Notify'],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      devtool: 'source-map',
      // devtool: 'cheap-source-map',
      // devtool: 'inline-source-map',

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          },
        });
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['zoomIn', 'zoomOut', 'fadeOut'],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Awesome Todo',
        short_name: 'Awesome Todo',
        description: 'A test project for Quasar',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'day41.apps.todo',
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'builder', // 'packager' or 'builder'

      packager: {
        asar: false,
        appBundleId: 'day41.apps.todo',
        platform: 'darwin',
        version: '0.1',
        buildVersion: '15',
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: 'Productivity',
        // osxSign: 'Developer ID Application: John Evans (29Z664JJLW)',
        osxSign: {
          identity: 'Developer ID Application: John Evans (29Z664JJLW)',
          'hardened-runtime': true,
          entitlements: 'src-electron/entitlements.plist',
          'entitlements-inherit': 'src-electron/entitlements_child.plist',
          signatureFlags: 'library',
          'gatekeeper-assess': false,
        },
        osxNotarize: {
          appleId: envFile.production.APPLEID,
          appleIdPassword: envFile.production.APPLEPASSID,
        },
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        appId: 'day41.apps.todo',
        productName: 'AwesomeTodo',
        copyright: 'Copyright John Evans 2020',
        mac: {
          hardenedRuntime: true,
          gatekeeperAssess: false,
          entitlements: 'src-electron/entitlements.plist',
          entitlementsInherit: 'src-electron/entitlements.plist',
          provisioningProfile:
            'src-electron/provisioning/Mac_Provisioning_Profile.provisionprofile',
        },
        win: {
          target: 'nsis',
        },
        //run the script to notarize the file and staple the ticket to the app
        // afterSign: 'src-electron/scripts/notarize.js',
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  };
};

/*
Notes:
Without signing
- quasar dev -m electron: success
- quasar build -m electron: success
- yarn build -m electron: success

With signing
- quasar dev -m electron:
- quasar build -m electron: white screen
 */
