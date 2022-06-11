module.exports = {
    requirePragma: true,
    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "es5",
    semi: true,
    printWidth: 80,
    arrowParens: "always",
    importOrder: [
        "^@(abuse-sleuth)/(.*)$",
        "^@(services|components|layouts|hooks|utils|routes)/(.*)$",
        "^@(mantine)/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    tabWidth: 4,
    useTabs: false,
    plugins: [require("@trivago/prettier-plugin-sort-imports")],

    overrides: [
        {
            files: [ "**/*.yml" ],
            options: {
                tabWidth: 2,
            }
        }
    ]
};
