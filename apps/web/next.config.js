const withTM = require("next-transpile-modules")([
    "@abuse-sleuth/ui",
    "@abuse-sleuth/prisma",
    "@abuse-sleuth/trpc"
]);
const path = require("path");
const dotENV = require("dotenv");

const ENVPATH = path.resolve(__dirname, "../../", ".env");
const env = dotENV.config({ path: ENVPATH });

const parsedEnv = Object.fromEntries(
    Object.entries(env.parsed).map(([k, v]) =>
        k.startsWith("NEXT_PUBLIC_") ? [k, v] : [undefined, undefined]
    )
);

module.exports = withTM({
    env: parsedEnv || {},
    reactStrictMode: true,
});
