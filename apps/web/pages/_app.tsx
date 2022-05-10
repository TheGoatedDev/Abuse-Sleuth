import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AppProps } from "next/app";
import Head from "next/head";

import { CustomMantineProvider, Loader } from "@abuse-sleuth/ui";

import initializeFontAwesome from "@utils/bootstrap/fontawesome";
import { AuthProvider } from "@utils/contexts/AuthContext";

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
                    theme={{
                        colorScheme: "dark",
                        colors: {
                            dark: [
                                "#FFF",
                                "#E8E8ED",
                                "#C6C5D3",
                                "#AFAEC2",
                                "#8D8BA7",
                                "#6C698C",
                                "#3F3D51",
                                "#363546",
                                "#24232F",
                                "#121217",
                            ],
                            primary: [
                                "#CDB0FC",
                                "#B589FB",
                                "#9C62F9",
                                "#833AF8",
                                "#6A13F6",
                            ],
                        },
                    }}>
                    <Component {...pageProps} />
                </CustomMantineProvider>
            </AuthProvider>
        </>
    );
}
