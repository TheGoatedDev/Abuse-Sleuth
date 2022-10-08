import { AppProps } from "next/app";
import Head from "next/head";

import { Session } from "@abuse-sleuth/authentication";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { ThemeSwitcher } from "@abuse-sleuth/ui/components/molecules";

import { ProviderWrapper } from "@components/shared/ProviderWrapper";

function App(props: AppProps<{ session?: Session }>) {
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

            <ProviderWrapper session={pageProps.session}>
                <Component {...pageProps} />
                <ThemeSwitcher />
            </ProviderWrapper>
        </>
    );
}

export default trpcClient.withTRPC(App);
