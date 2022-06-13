const withTM = require("next-transpile-modules")(["@abuse-sleuth/ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
