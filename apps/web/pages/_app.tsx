import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppProps } from "next/app";
import Head from "next/head";

import { CustomMantineProvider } from "@abuse-sleuth/ui";

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
            </Head>

            <CustomMantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{ colorScheme: "dark" }}>
                <Component {...pageProps} />
            </CustomMantineProvider>
        </>
    );
}
