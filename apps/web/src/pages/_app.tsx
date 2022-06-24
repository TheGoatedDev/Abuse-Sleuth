import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import { withTRPC } from "@trpc/next";
import { AppProps } from "next/app";
import Head from "next/head";
import superjson from "superjson";

import { AppRouter } from "@abuse-sleuth/trpc";
import { MantineProvider } from "@abuse-sleuth/ui";

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
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}>
                <NotificationsProvider>
                    <ModalsProvider>
                        <Component {...pageProps} />
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </>
    );
}

function getURL() {
    const url = process.env.API_URL
        ? `https://${process.env.API_URL}/trpc`
        : "http://localhost:3001/trpc";
    return url;
}

function getEndingLink() {
    if (typeof window === "undefined") {
        return httpBatchLink({
            url: getURL(),
        });
    }
    const client = createWSClient({
        url: getURL().replace(RegExp("^(http|https)"), "ws"),
    });
    return wsLink<AppRouter>({
        client,
    });
}

export default withTRPC<AppRouter>({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */

        return {
            links: [
                loggerLink({
                    enabled: (opts) =>
                        process.env.NODE_ENV !== "production" ||
                        (opts.direction === "down" &&
                            opts.result instanceof Error),
                }),
                getEndingLink(),
            ],
            transformer: superjson,
            url: getURL(),
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(App);
