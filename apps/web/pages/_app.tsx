import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

import initializeFontAwesome from "@libs/bootstrap/fontawesome";

import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";

initializeFontAwesome();

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
    const [localTheme, setLocalTheme] = useLocalStorageValue<ColorScheme>({
        key: "theme",
        defaultValue: "dark",
    });
    const [colorScheme, setColorScheme] = useState<ColorScheme>(
        localTheme as ColorScheme
    );
    const toggleColorScheme = () => {
        setColorScheme(colorScheme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        setLocalTheme(colorScheme);
    }, [colorScheme, setLocalTheme]);

    return (
        <>
            <Head>
                <title>Abuse Sleuth</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <SessionProvider>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            /** Put your mantine theme override here */
                            colorScheme: colorScheme,
                        }}>
                        <Component {...pageProps} />
                    </MantineProvider>
                </ColorSchemeProvider>
            </SessionProvider>
        </>
    );
}
