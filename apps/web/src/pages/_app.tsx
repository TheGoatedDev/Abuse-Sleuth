import { AppProps } from "next/app";
import Head from "next/head";

import { SessionProvider } from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { GlobalStyling, MantineProvider } from "@abuse-sleuth/ui/shared";

function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <>
            <Head>
                <title>Abuse Sleuth</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <GlobalStyling />
            </Head>

            <SessionProvider session={pageProps.session}>
                <MantineProvider>
                    <Component {...pageProps} />
                </MantineProvider>
            </SessionProvider>
        </>
    );
}

export default trpcClient.withTRPC(App);
