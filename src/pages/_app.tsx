import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { useEffect } from "react";
import { supabaseClient } from "@services/supabase/supabaseClient";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import axios from "axios";

const App = (props: AppProps) => {
    const { Component, pageProps } = props;

    useEffect(() => {
        const { data } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session);
            }
        );

        return () => {
            data?.unsubscribe();
        };
    }, []);

    async function handleAuthChange(
        event: AuthChangeEvent,
        session: Session | null
    ) {
        /* sets and removes the Supabase cookie */
        await axios.post("/api/auth", {
            event,
            session,
        });
    }

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
                <Component {...pageProps} />
            </MantineProvider>
        </>
    );
};

export default App;
