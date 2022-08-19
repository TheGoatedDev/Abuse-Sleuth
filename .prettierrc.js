module.exports = {
    plugins: [require("@trivago/prettier-plugin-sort-imports")],

    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "es5",
    semi: true,
    printWidth: 80,
    arrowParens: "always",
    tabWidth: 4,

    importOrder: [
        "^@(abuse-sleuth)/(.*)$",
        "^@(services|components|layouts|hooks|utils|routes)/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,

    overrides: [
        {
            files: ["**/*.yml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
