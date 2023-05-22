const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@constants": path.resolve(__dirname, "src/app/Constants"),
      "@services": path.resolve(__dirname, "src/app/Services"),
      "@slices": path.resolve(__dirname, "src/app/Slices"),
      "@selectors": path.resolve(__dirname, "src/app/Selectors"),
      "@interfaces": path.resolve(__dirname, "src/app/Types"),
      "@components": path.resolve(__dirname, "src/features/Common/Components"),
      "@containers": path.resolve(__dirname, "src/features/Common/Containers"),
      "@hooks": path.resolve(__dirname, "src/features/Common/Hooks"),
      "@utils": path.resolve(__dirname, "src/features/Common/Utils"),
      "@common": path.resolve(__dirname, "src/features/Common"),
      "@locales": path.resolve(__dirname, "src/locales"),
      "@admin": path.resolve(__dirname, "src/features/Admin"),
    },
  },
  devServer: {
    port: process.env.RE_DASH_APP_PORT,
    client: {
      webSocketURL: `wss://${process.env.RE_DASH_APP_HOST}/ws`,
    },
    http2: true,
    https: true,
  },
};
