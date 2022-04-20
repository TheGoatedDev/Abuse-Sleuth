import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

import {
    AlertBox,
    Button,
    Center,
    Divider,
    Group,
    Loader,
    Paper,
    Text,
    TextInput,
    Title,
} from "@abuse-sleuth/ui";

import DefaultLayout from "@layouts/DefaultLayout";
import { ROUTES } from "@libs/configs/routes";

import { joiResolver, useForm } from "@mantine/form";

const Authenticate = () => {
    const router = useRouter();
    const { mutate } = useSWRConfig();

    useEffect(() => {
        (async () => {
            if (router.query.token) {
                const token = router.query.token as string;
                const res = await fetch(ROUTES.api.auth.authenticate, {
                    method: "POST",
                    body: JSON.stringify({ token }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                if (data.ok === true) {
                    router.push(ROUTES.home);
                } else {
                    console.error(data.error); // TODO: Make this a UI alert
                }
                mutate(ROUTES.api.user.getCurrentUserInfo);
            }
        })();
    }, [router, mutate]);

    return (
        <DefaultLayout>
            <Center
                sx={(theme) => ({
                    height: "calc(100vh - 64px)",
                })}>
                <Paper
                    withBorder
                    p={"md"}
                    shadow={"md"}
                    sx={(theme) => ({ width: "400px" })}>
                    <Center my="md">
                        <img src={"/logo.svg"} alt={"Logo"} width={"15%"} />
                    </Center>
                    <Title align="center" order={2}>
                        Authentication into your Account
                    </Title>
                    <Text mb="sm" size="sm" align="center">
                        Start locking out those malicous actors now!
                    </Text>
                    <Center>
                        <Loader />
                    </Center>
                </Paper>
            </Center>
        </DefaultLayout>
    );
};

export default Authenticate;
