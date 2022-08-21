import { AppProps } from "next/app";
import Head from "next/head";

import { UserProvider } from "@abuse-sleuth/authentication/nextjs";
import { MantineProvider } from "@abuse-sleuth/ui/mantine";

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

            <UserProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        /** Put your mantine theme override here */
                        colorScheme: "dark",
                    }}>
                    <Component {...pageProps} />
                </MantineProvider>
            </UserProvider>
        </>
    );
}
