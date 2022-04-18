import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppProps } from "next/app";
import Head from "next/head";

import { CustomMantineProvider } from "@abuse-sleuth/ui";

import { AuthProvider } from "@contexts/AuthContext";
import initializeFontAwesome from "@libs/bootstrap/fontawesome";

initializeFontAwesome();
dayjs.extend(relativeTime);

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Abuse Sleuth</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <meta
                    name="description"
                    content="Abuse Sleuth is a web-based tool/SAAS for detecting and reporting abuse of the internet."
                />
            </Head>

            <AuthProvider>
                <CustomMantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{ colorScheme: "dark" }}>
                    <Component {...pageProps} />
                </CustomMantineProvider>
            </AuthProvider>
        </>
    );
}
