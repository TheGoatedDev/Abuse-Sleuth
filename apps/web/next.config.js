const withTM = require("next-transpile-modules")([
    "@abuse-sleuth/ui",
    "@abuse-sleuth/prisma",
    "@abuse-sleuth/trpc",
]);

module.exports = withTM({
    reactStrictMode: true,
});
