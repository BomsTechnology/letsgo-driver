module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      ["react-native-reanimated/plugin"], 
      [
        "module-resolver", 
        {
          "root": ["./src"],
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx"
          ],
          "alias": {
            "@screens" : ["./src/screens"],
            "@components" : ["./src/components"],
            "@store" : ["./src/store"],
            "@data" : ["./src/data"],
            "@navigators" : ["./src/navigators"],
            "@constants" : ["./src/constants"],
            "@assets" : ["./src/assets"],
            "@hooks" : ["./src/hooks"],
            "@context" : ["./src/context"],
            "@functions" : ["./src/functions"],
            "@config" : ["./src/config"],
            "@services" : ["./src/services"],
            "@mytypes" : ["./src/types"],
            "@locales" : ["./src/locales"],
            "@firebase" : ["./src/firebase"],
          }
        }
      ]
    ]
  };
};