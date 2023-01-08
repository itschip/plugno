module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          alias: {
            "@api": "./api",
            "@typings": "./typings",
            "@components": "./components",
            "@screens": "./screens",
            "@utils": "./utils",
          },
        },
      ],
    ],
  };
};
