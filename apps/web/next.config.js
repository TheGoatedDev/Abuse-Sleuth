const { withSentryConfig } = require("@sentry/nextjs");
const withTM = require("next-transpile-modules")(["@abuse-sleuth/ui"]);

const moduleExports = withTM({
    reactStrictMode: true,
    sentry: {
        widenClientFileUpload: true,
        hideSourceMaps: true,
    },
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
            });
        }

        return config;
    },
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
});

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore
    silent: true, // Suppresses all logs
};

module.exports = moduleExports;
