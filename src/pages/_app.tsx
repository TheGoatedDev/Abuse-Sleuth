import { AppProps } from "next/app";
import Head from "next/head";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@services/firebase";

const App = (props: AppProps) => {
    const { Component, pageProps } = props;
    const [user, loading, error] = useAuthState(firebaseAuth);

    return (
        <>
            <Head>
                <title>Sentinel</title>
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
                <LoadingOverlay
                    overlayOpacity={1}
                    transitionDuration={0}
                    visible={(loading && !user && !error) ?? true}
                />
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
};

export default App;
