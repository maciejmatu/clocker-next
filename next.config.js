const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    absoluteUrl:
      process.env.NODE_ENV === "production"
        ? "https://clocker-next.maciejmatu.now.sh"
        : "http://localhost:3000"
  }
});
