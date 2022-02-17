import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { BootstrapFontAwesome } from "@bootstrap/FontAwesome";
import { AuthProvider } from "@contexts/AuthProvider";

BootstrapFontAwesome();

const App = (props: AppProps) => {
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

            <AuthProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "dark",
                    }}
                >
                    <Component {...pageProps} />
                </MantineProvider>
            </AuthProvider>
        </>
    );
};

export default App;
