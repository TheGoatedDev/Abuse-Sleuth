import {
    ColorScheme,
    ColorSchemeProvider,
    Global,
    MantineProvider as Provider,
    MantineProviderProps,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const MantineProvider = ({
    children,
    ...props
}: MantineProviderProps) => {
    const [storedColorScheme, setStoredColorScheme] =
        useLocalStorage<ColorScheme>({
            key: "color-scheme",
            defaultValue: "dark",
        });

    const [colorScheme, setColorScheme] =
        useState<ColorScheme>(storedColorScheme);

    const toggleColorScheme = () => {
        const newScheme = colorScheme === "dark" ? "light" : "dark";
        setStoredColorScheme(newScheme);
    };

    useEffect(() => {
        setColorScheme(storedColorScheme);
    }, [storedColorScheme]);

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <Provider
                withNormalizeCSS
                theme={{
                    colorScheme: colorScheme,
                    fontFamily: "Open Sans, sans-serif",
                }}
                {...props}>
                {children}
            </Provider>
        </ColorSchemeProvider>
    );
};

export const GlobalStyling = () => {
    const theme = useMantineTheme();

    return (
        <Global
            styles={[
                {
                    "*": {
                        boxSizing: "border-box",
                        //letterSpacing: ".04rem",
                    },
                },
                {
                    html: {
                        overflowX: "hidden",
                    },
                },
                {
                    body: {
                        fontSize: theme.fontSizes.md,
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[7]
                                : theme.white,
                        color:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[0]
                                : theme.black,
                    },
                },
            ]}
        />
    );
};
