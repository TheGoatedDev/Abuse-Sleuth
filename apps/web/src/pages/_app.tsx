import { TeamsProvider } from "@contexts/TeamsContext";
import { AppProps } from "next/app";
import Head from "next/head";

import { Session } from "@abuse-sleuth/authentication";
import { SessionProvider } from "@abuse-sleuth/authentication/nextjs/client";
import { trpcClient } from "@abuse-sleuth/trpc/nextjs/client";
import { ThemeSwitcher } from "@abuse-sleuth/ui/components/molecules";
import { ModalsProvider } from "@abuse-sleuth/ui/modals";
import { GlobalStyling, MantineProvider } from "@abuse-sleuth/ui/shared";

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

            <SessionProvider session={pageProps.session}>
                <TeamsProvider>
                    <MantineProvider>
                        <ModalsProvider>
                            <GlobalStyling />
                            <Component {...pageProps} />
                            <ThemeSwitcher />
                        </ModalsProvider>
                    </MantineProvider>
                </TeamsProvider>
            </SessionProvider>
        </>
    );
}

export default trpcClient.withTRPC(App);
