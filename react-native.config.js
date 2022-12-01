// eslint-disable-next-line @typescript-eslint/no-var-requires
const ios = require('@react-native-community/cli-platform-ios');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const android = require('@react-native-community/cli-platform-android');

module.exports = {
  project: {
    ios: {
      sourceDir: './ios'
    },
    android: {}
  },
  platforms: {
    ios: {
      projectConfig: ios.projectConfig,
      dependencyConfig: ios.dependencyConfig
    },
    android: {
      projectConfig: android.projectConfig,
      dependencyConfig: android.dependencyConfig
    }
  },
  reactNativePath: '.',
  assets: ['./assets/fonts/Lato']
};
