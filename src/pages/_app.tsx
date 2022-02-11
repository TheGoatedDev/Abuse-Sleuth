import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { useFirebaseCookieAuth } from "@hooks/useFirebaseCookieAuth";

const App = (props: AppProps) => {
    const { Component, pageProps } = props;

    useFirebaseCookieAuth();

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
                    colorScheme: "dark",
                }}
            >
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
};

export default App;
