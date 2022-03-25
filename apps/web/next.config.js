const { withSentryConfig } = require("@sentry/nextjs");
const withTM = require("next-transpile-modules")(["@abuse-sleuth/ui"]);

const moduleExports = withTM({
    reactStrictMode: true,
    sentry: {
        widenClientFileUpload: true,
        hideSourceMaps: true,
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

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
