/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  // blockList: {
    // Excluding a specific file path
    // Make sure it's not excluding the file path causing the issue
    // ios: {
      // sourceExts: [
        // 'path/to/excludedFile.js',
      // ],
    // },
  // },
};
