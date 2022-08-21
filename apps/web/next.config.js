const withTM = require("next-transpile-modules")(["@abuse-sleuth/ui", "@abuse-sleuth/authentication", "@abuse-sleuth/prisma"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = withTM(nextConfig);
