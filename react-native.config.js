module.exports = {
  cli: {
    version: ">= 0.59.0",
  },
  dependencies: {
    "react-native-vector-icons": {
      platforms: {
        ios: {
          sourceDir: "../node_modules/react-native-vector-icons/Fonts",
          assets: ["*.ttf"],
        },
        android: {
          sourceDir: "../node_modules/react-native-vector-icons/Fonts",
          assets: ["*.ttf"],
        },
      },
    },
  },
};
