const withTM = require("next-transpile-modules")([
    "@abuse-sleuth/ui",
    "@abuse-sleuth/prisma",
]);

module.exports = withTM({
    reactStrictMode: true,
});
